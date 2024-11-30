import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Autocomplete, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import { Console } from 'console';
import MapComponent from 'src/components/map/map-component';
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
interface Location {
  id: string;
  name: string;
}
interface Ward {
  id: string;
  wardName: string;
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
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [longitude, setLongitude] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');

  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');


  const handleLocationSelect = (longitudes : string , latitudes : string) => {
    // Cập nhật longitude và latitude vào các ô input
    setLongitude(parseFloat(longitudes).toFixed(6));  // Giữ tối đa 6 chữ số thập phân
    setLatitude(parseFloat(latitudes).toFixed(6)); 
    setFormData((prevData) => ({
      ...prevData,
      longitude: parseFloat(longitudes).toFixed(6),
      latitude: parseFloat(latitudes).toFixed(6),
    }));
  };
  const handleOpenMap = () => {
    setMapDialogOpen(true); // Mở bản đồ khi nhấn chọn địa chỉ
  };

  const handleCloseMap = () => {
    setMapDialogOpen(false); // Đóng bản đồ khi chọn vị trí
  };
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
      if (!formData.wardId) {
        alert('Please select a ward.');
        return;
      }
      // Thêm các tham số vào formData
      formDataToSend.append('WardId', formData.wardId);
      formDataToSend.append('TimeOpen', formData.timeOpen);
      formDataToSend.append('TimeClose', formData.timeClose);
      formDataToSend.append('Longitude', parseFloat(formData.longitude).toFixed(6));
      formDataToSend.append('Latitude', parseFloat(formData.latitude).toFixed(6));
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
  
  useEffect(() => {
  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://api.localtour.space/api/Address/Province');
      setProvinces(response.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  fetchProvinces();
}, []);

const fetchDistricts = async (provinceId: any) => {
  try {
    const response = await axios.get(`https://api.localtour.space/api/Address/District?provinceI=${provinceId}`);
    setDistricts(response.data);
  } catch (error) {
    console.error('Error fetching districts:', error);
  }
};

const fetchWards = async (districtId: any) => {
  try {
    const response = await axios.get(`https://api.localtour.space/api/Address/Ward?cityId=${districtId}`);
    console.log('Wards Response:', response.data);
    setWards(response.data);
  } catch (error) {
    console.error('Error fetching wards:', error);
  }
};

  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Place</DialogTitle>
      <DialogContent>
        {/* WardId */}
        <Autocomplete
  fullWidth
  options={provinces}
  getOptionLabel={(option) => option.name}
  onChange={(event, value) => {
    setSelectedProvince(value?.id || '');
    setSelectedDistrict('');
    setWards([]);
    fetchDistricts(value?.id);
  }}
  renderInput={(params) => <TextField {...params} label="Province" />}
/>

<Autocomplete
  fullWidth
  options={districts}
  getOptionLabel={(option) => option.name}
  onChange={(event, value) => {
    setSelectedDistrict(value?.id || '');
    fetchWards(value?.id);
  }}
  renderInput={(params) => <TextField {...params} label="District" />}
/>

<Autocomplete
  fullWidth
  options={wards}
  getOptionLabel={(option) => option.wardName || ''}
  value={wards.find((ward) => ward.id === formData.wardId) || null} // Xác định ward được chọn từ formData
  onChange={(event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      wardId: value?.id || '', // Gán wardId hoặc để trống nếu không có giá trị
    }));
  }}
  renderInput={(params) => <TextField {...params} label="Ward" />}
  isOptionEqualToValue={(option, value) => option.id === value?.id} // So sánh chính xác giữa option và value
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

<TextField
          fullWidth
          label="Longitude"
          name="longitude"
          value={formData.longitude}
          onChange={(e) => setLongitude(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Latitude"
          name="latitude"
          value={formData.latitude}
          onChange={(e) => setLatitude(e.target.value)}
          margin="normal"
        />
        <Button onClick={handleOpenMap} variant="outlined">
          Choose on Map
        </Button>

        <Dialog open={mapDialogOpen} onClose={() => setMapDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Select Location on Map</DialogTitle>
          <DialogContent>
            <MapComponent
              latitude={parseFloat(latitude) || 10.762622}
              longitude={parseFloat(longitude) || 106.827153}
              onLocationSelect={handleLocationSelect}
              onCloseMap={handleCloseMap}
            />
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={() => setMapDialogOpen(false)} color="secondary">
              Close
            </Button>
            <Button onClick={() => setMapDialogOpen(false)} color="primary">
              Select Location
            </Button>
          </DialogActions> */}
        </Dialog>

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
