import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Autocomplete, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import { Console } from 'console';
import { UserProps } from '../place-table-row';

interface NewPlaceFormProps {
  open: boolean;
  onClose: () => void;
  onPlaceCreated: (newPlace: UserProps) => void;
}

interface PlaceTranslation {
  languageCode: string;
  name: string;
  description: string;
  address: string;
  contact: string;
}

function NewPlaceForm({ open, onClose, onPlaceCreated }: NewPlaceFormProps) {
  const [formData, setFormData] = useState({
    wardId: '',
    timeOpen: '',
    timeClose: '',
    longitude: '',
    latitude: '',
    contactLink: '',
    tags: [] as string[], // Lưu ID của các tags
    placeTranslations: [] as PlaceTranslation[], // Mảng chứa nhiều PlaceTranslation
    photoDisplay: null as File | null, // Lưu file hình ảnh cho PhotoDisplay
    placeMedia: [] as (File | null)[], // Mảng chứa nhiều file hình ảnh cho PlaceMedia (cho phép null)
    isVerified: false,
    status: '0',
  });

  const [tags, setTags] = useState<{ id: string; tagName: string; tagPhotoUrl: string }[]>([]);

  // Lấy danh sách tags từ API khi component được render
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('https://api.localtour.space/api/Tag/getAll');
        setTags(response.data.items);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  // Hàm xử lý thay đổi input trong form
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = event.target;

    // Nếu có index (đang sửa một PlaceTranslation cụ thể)
    if (index !== undefined) {
      setFormData((prevData) => {
        const updatedTranslations = [...prevData.placeTranslations];
        updatedTranslations[index] = {
          ...updatedTranslations[index],
          [name]: value,
        };
        return { ...prevData, placeTranslations: updatedTranslations };
      });
    } else {
      // Cập nhật các field khác ngoài PlaceTranslation
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Hàm xử lý thay đổi file cho PhotoDisplay
  const handlePhotoDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList | null;
    
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        photoDisplay: files[0], // Lưu lại file đầu tiên
      }));
    }
  };

  const handlePlaceMediaChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      // Lưu file vào đúng vị trí trong mảng
      setFormData((prevData) => {
        const updatedPlaceMedia = [...prevData.placeMedia];
        updatedPlaceMedia[index] = files[0]; // Cập nhật file
        return { ...prevData, placeMedia: updatedPlaceMedia };
      });
    } else {
      // Nếu không có file, gán null cho vị trí đó (nếu bạn muốn xóa file)
      setFormData((prevData) => {
        const updatedPlaceMedia = [...prevData.placeMedia];
        updatedPlaceMedia[index] = null; // Xóa file
        return { ...prevData, placeMedia: updatedPlaceMedia };
      });
    }
  };

  
  
  

  // Hàm xử lý thêm một PlaceTranslation mới
  const addPlaceTranslation = () => {
    setFormData((prevData) => ({
      ...prevData,
      placeTranslations: [
        ...prevData.placeTranslations,
        {
          languageCode: '',
          name: '',
          description: '',
          address: '',
          contact: '',
        },
      ],
    }));
  };

  // Hàm xử lý xóa một PlaceTranslation
  const removePlaceTranslation = (index: number) => {
    setFormData((prevData) => {
      const updatedTranslations = prevData.placeTranslations.filter((_, i) => i !== index);
      return { ...prevData, placeTranslations: updatedTranslations };
    });
  };

  // Hàm xử lý thêm một ảnh mới vào PlaceMedia
  const addPlaceMedia = () => {
    setFormData((prevData) => ({
      ...prevData,
      placeMedia: [...prevData.placeMedia, null], // Thêm một phần tử null vào mảng placeMedia
    }));
  };

  // Hàm xử lý xóa một ảnh trong PlaceMedia
  const removePlaceMedia = (index: number) => {
    setFormData((prevData) => {
      const updatedPlaceMedia = prevData.placeMedia.filter((_, i) => i !== index);
      return { ...prevData, placeMedia: updatedPlaceMedia };
    });
  };

  // Hàm xử lý tags (khi người dùng chọn tag)
  const handleTagsChange = (event: React.ChangeEvent<{}>, newValue: { id: string; tagName: string }[]) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: newValue.map((tag) => tag.id),
    }));
  };

  // Hàm xử lý submit form
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const formDataToSend = new FormData();
  
      // Thêm các tham số vào formData
      formDataToSend.append('WardId', formData.wardId);
      formDataToSend.append('TimeOpen', formData.timeOpen);
      formDataToSend.append('TimeClose', formData.timeClose);
      formDataToSend.append('Longitude', formData.longitude);
      formDataToSend.append('Latitude', formData.latitude);
      formDataToSend.append('ContactLink', formData.contactLink);
  
      // Thêm Tags
      formData.tags.forEach((tagId) => {
        formDataToSend.append('Tags', tagId);
      });
  
      // Thêm PlaceTranslations
      formData.placeTranslations.forEach((translation) => {
        formDataToSend.append(
          'PlaceTranslation',
          JSON.stringify(translation) // Đảm bảo PlaceTranslation được gửi dưới dạng JSON string
        );
      });
  
      // Thêm file PhotoDisplay nếu có
      if (formData.photoDisplay) {
        formDataToSend.append('PhotoDisplay', formData.photoDisplay);
      }
  
      // Thêm các file PlaceMedia
      formData.placeMedia.forEach((media, index) => {
        if (media) {
          formDataToSend.append('PlaceMedia', media);  // Không cần thêm chỉ mục, vì API có thể nhận được mảng các file
        }
      });
  
      // Gửi yêu cầu POST với formData
      const response = await axios.post(
        'https://api.localtour.space/api/Place/create',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const newPlace = response.data; // Dữ liệu place mới từ API
    console.log('newPlace', newPlace);
      alert('Place created successfully!');
      onPlaceCreated(newPlace); // Gọi callback với dữ liệu place mới
      onClose();
    } catch (error) {
      console.error('Error creating place:', error);
      alert('Failed to create place.');
    }
  };
  
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Place</DialogTitle>
      <DialogContent>
        {/* WardId */}
        <TextField
          fullWidth
          label="Ward ID"
          name="wardId"
          value={formData.wardId}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* TimeOpen */}
        <TextField
          fullWidth
          label="Time Open"
          name="timeOpen"
          type="time"
          value={formData.timeOpen}
          onChange={handleInputChange}
          margin="normal"
          inputProps={{
            step: 300, // 5 minutes
          }}
        />
        <TextField
          fullWidth
          label="Time Close"
          name="timeClose"
          type="time"
          value={formData.timeClose}
          onChange={handleInputChange}
          margin="normal"
          inputProps={{
            step: 300, // 5 minutes
          }}
        />

        {/* Longitude */}
        <TextField
          fullWidth
          label="Longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Latitude */}
        <TextField
          fullWidth
          label="Latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Contact Link */}
        <TextField
          fullWidth
          label="Contact Link"
          name="contactLink"
          value={formData.contactLink}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Tags - Autocomplete */}
        <Autocomplete
          multiple
          id="tags"
          options={tags}
          getOptionLabel={(option) => option.tagName}
          onChange={handleTagsChange}
          renderInput={(params) => <TextField {...params} label="Tags" />}
        />

        {/* Photo Display */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ fontWeight: 'bold' }}>Photo Display</div>
          <input
            type="file"
            accept="image/*"
            id="photoDisplay"
            onChange={handlePhotoDisplayChange}
          />
        </div>

        {/* Place Media */}
        <div style={{ marginTop: '20px' }}>
          <Button variant="outlined" onClick={addPlaceMedia}>
            Add Place Media
          </Button>
          {formData.placeMedia.map((media, index) => (
            <Grid container key={index} spacing={2} alignItems="center" style={{ marginTop: '10px' }}>
              <Grid item>
                <label htmlFor={`placeMedia-${index}`}>Media {index + 1}</label>
                <input
                  type="file"
                  accept="image/*"
                  id={`placeMedia-${index}`}
                  onChange={(event) => handlePlaceMediaChange(event, index)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removePlaceMedia(index)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </div>

        {/* Place Translations */}
        <div style={{ marginTop: '20px' }}>
          <Button variant="outlined" onClick={addPlaceTranslation}>
            Add Place Translation
          </Button>
          {formData.placeTranslations.map((translation, index) => (
            <div key={index} style={{ marginTop: '15px' }}>
              <TextField
                fullWidth
                label={`Language Code ${index + 1}`}
                name="languageCode"
                value={translation.languageCode}
                onChange={(event) => handleInputChange(event, index)}
                margin="normal"
              />
              <TextField
                fullWidth
                label={`Name ${index + 1}`}
                name="name"
                value={translation.name}
                onChange={(event) => handleInputChange(event, index)}
                margin="normal"
              />
              <TextField
                fullWidth
                label={`Description ${index + 1}`}
                name="description"
                value={translation.description}
                onChange={(event) => handleInputChange(event, index)}
                margin="normal"
              />
              <TextField
                fullWidth
                label={`Address ${index + 1}`}
                name="address"
                value={translation.address}
                onChange={(event) => handleInputChange(event, index)}
                margin="normal"
              />
              <TextField
                fullWidth
                label={`Contact ${index + 1}`}
                name="contact"
                value={translation.contact}
                onChange={(event) => handleInputChange(event, index)}
                margin="normal"
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => removePlaceTranslation(index)}
                style={{ marginTop: '10px' }}
              >
                Remove Translation
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewPlaceForm;
