import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Autocomplete, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, FormControl, MenuItem, Select, InputLabel, SelectChangeEvent, FormHelperText } from '@mui/material';
import { Console } from 'console';
import MapComponent from 'src/components/map/map-component';

import axiosInstance from 'src/utils/axiosInstance';
import { UserProps } from '../place-table-row';

interface NewPlaceFormProps {
  open: boolean;
  onClose: () => void;
  onPlaceCreated: (newPlace: UserProps) => void;
}
interface PlaceMedia {
  type: string,
  url: string,
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
const languageOptions = [
  { label: 'VN', value: 'vi' },
  { label: 'EN', value: 'en' },
];


function NewPlaceForm({ open, onClose, onPlaceCreated }: NewPlaceFormProps) {
  const [formData, setFormData] = useState({
    wardId: '',
    timeOpen: '',
    timeClose: '',
    longitude: '',
    latitude: '',
    contactLink: '',
    brc: null as File | null,
    tags: [] as string[], // Lưu ID của các tags
    placeTranslations: [] as PlaceTranslation[], // Mảng chứa nhiều PlaceTranslation
    photoDisplay: null as File | null, // Lưu file hình ảnh cho PhotoDisplay
    placeMedia: [] as { type: string, url: string }[],
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
  const [errors, setErrors] = useState({
    wardId: '',
    timeOpen: '',
    timeClose: '',
    longitude: '',
    latitude: '',
    contactLink: '',
    placeMedia: '',
    photoDisplay: '',
    tags: '',
    placeTranslations: formData.placeTranslations.map(() => ''),
  });
  
  
  
  useEffect(() => {
    if (!open) {
      // Reset lại form về trạng thái mặc định khi đóng dialog
      setFormData({
        wardId: '',
        timeOpen: '',
        timeClose: '',
        longitude: '',
        latitude: '',
        contactLink: '',
        tags: [],
        placeTranslations: [],
        photoDisplay: null,
        brc: null,
        placeMedia: [],
        isVerified: false,
        status: '0',
      });
      setLongitude('');
      setLatitude('');
      setSelectedProvince('');
      setSelectedDistrict('');
      setWards([]);
      setErrors({
        wardId: '',
    timeOpen: '',
    timeClose: '',
    longitude: '',
    latitude: '',
    contactLink: '',
    placeMedia: '',
    photoDisplay: '',
    tags: '',
    placeTranslations:  [],
    });
    }
  }, [open]);
  

  const handleLocationSelect = (longitudes : string , latitudes : string) => {
    // Cập nhật longitude và latitude vào các ô input
    setLongitude(longitudes);
    setLatitude(latitudes); 
    setFormData((prevData) => ({
      ...prevData,
      longitude: longitudes,
      latitude: latitudes,
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
        const response = await axiosInstance.get('https://api.localtour.space/api/Tag/getAll?Size=1000');
        setTags(response.data.items);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  // Hàm xử lý thay đổi input trong form
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    index?: number
  ) => {
    const { name, value } = event.target;
    
  
    // Handle change for PlaceTranslation when index is provided
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
      // Handle other input changes
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
  const handleBRCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList | null;
    
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        brc: files[0], // Lưu lại file đầu tiên
      }));
    }
  };

  
  const handlePlaceMediaChange = async (
    event: React.ChangeEvent<HTMLInputElement>, 
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const updatedPlaceMedia = [...formData.placeMedia];  // Copy current media list
     console.log('length', files.length)
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const formDataToSend = new FormData();
          formDataToSend.append('files', file);
  
          // Gửi file đến API
          const response = await fetch('https://api.localtour.space/api/File/createlink', {
            method: 'POST',
            body: formDataToSend,
          });
  
          if (!response.ok) {
            throw new Error(`Failed to upload file: ${file.name}`);
          }
  
          const result = await response.json();
          let fileLink = '';
  
          // Trích xuất link từ phản hồi API
          if (file.type.includes('image') && result.imageUrls && result.imageUrls.length > 0) {
            fileLink = result.imageUrls[0];
          } else if (file.type.includes('video') && result.videoUrls && result.videoUrls.length > 0) {
            fileLink = result.videoUrls[0];
          } else {
            throw new Error(`No URL returned for the uploaded file: ${file.name}`);
          }
  
                  if (i==0) {
            updatedPlaceMedia[index] = {
              type: file.type.includes('image') ? 'Image' : 'Video',
              url: fileLink,
            };
          }
          updatedPlaceMedia[index + i] = {
            type: file.type.includes('image') ? 'Image' : 'Video',
            url: fileLink,
          };
  
        }
        
  
        // Cập nhật lại state sau khi tải lên xong
        setFormData({ ...formData, placeMedia: updatedPlaceMedia });
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  
  
  

  // Hàm xử lý thêm một PlaceTranslation mới
  const addPlaceTranslation = () => {
    setFormData((prevData) => ({
      ...prevData,
      placeTranslations: [
        ...prevData.placeTranslations,
        {
          languageCode: 'vi',
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

// Handle removing a media item
const removePlaceMedia = (index: number) => {
  const updatedPlaceMedia = formData.placeMedia.filter((_, i) => i !== index);
  setFormData({ ...formData, placeMedia: updatedPlaceMedia });
};

// Render media based on its type (Image or Video)
const renderPlaceMedia = () => {
  return formData.placeMedia.map((media, index) => (
    <Grid container key={index} spacing={2} alignItems="center">
      <Grid item xs={6}>
        {media.url ? (
          media.type === 'Image' ? (
            <img src={media.url} alt="Media" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
          ) : (
            <video width="100%" height="auto" controls>
              <source src={media.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          // No media preview for a new item
          <div>No media selected</div>
        )}
      </Grid>
      <Grid item xs={6}>
        {!media.url && ( // Only show input and remove button when no media is selected
          <>
            <input type="file" accept="image/*,video/*" multiple onChange={(e) => handlePlaceMediaChange(e, index)} />
          </>
        )}
        <Button variant="contained" color="error" onClick={() => removePlaceMedia(index)}>
          Remove
        </Button>
      </Grid>
    </Grid>
  ));
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
    let hasErrors = false;
  const newErrors = {
    wardId: '',
    timeOpen: '',
    timeClose: '',
    longitude: '',
    latitude: '',
    contactLink: '',
    placeMedia: '',
    photoDisplay: '',
    tags: '',
    placeTranslations: formData.placeTranslations.map(() => ''), // Empty errors for each translation
  };

  // Validate fields
  if (!formData.wardId) {
    newErrors.wardId = 'Please select a ward.';
    hasErrors = true;
  }
  if (!formData.timeOpen) {
    newErrors.timeOpen = 'Time Open is required.';
    hasErrors = true;
  }
  if (!formData.timeClose) {
    newErrors.timeClose = 'Time Close is required.';
    hasErrors = true;
  }
  if (!formData.longitude) {
    newErrors.longitude = 'Longitude is required.';
    hasErrors = true;
  }
  if (!formData.latitude) {
    newErrors.latitude = 'Latitude is required.';
    hasErrors = true;
  }
  if (!formData.photoDisplay) {
    newErrors.photoDisplay = 'PhotoDisplay is required.';
    hasErrors = true;
  }
  if (!formData.contactLink) {
    newErrors.contactLink = 'Contact Link is required.';
    hasErrors = true;
  }
  if (formData.tags.length === 0) {
    newErrors.tags = 'At least one tag is required.';
    hasErrors = true;
  }
  if (formData.placeMedia.length === 0) {
    newErrors.placeMedia = 'At least one media is required.';
    hasErrors = true;
  }
  formData.placeTranslations.forEach((translation, index) => {
    if (!translation.name || !translation.description || !translation.address || !translation.contact) {
      newErrors.placeTranslations[index] = 'All fields are required for each translation.';
      hasErrors = true;
    } else {
      // Nếu không có lỗi, xóa lỗi trước đó nếu có
      newErrors.placeTranslations[index] = '';
    }
  });

  if (hasErrors) {
    setErrors(newErrors);
    return;
  }
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
      console.log('longitude', formData.longitude);
      console.log('latitude', formData.latitude);
  
      // Thêm Tags
      formData.tags.forEach((tagId) => {
        formDataToSend.append('Tags', tagId);
      });
  
      // Thêm PlaceTranslations
      formDataToSend.append(
        'PlaceTranslation', // Tên key API yêu cầu
        JSON.stringify(formData.placeTranslations) // Chuyển mảng thành JSON
      );
  
      // Thêm file PhotoDisplay nếu có
      if (formData.photoDisplay) {
        formDataToSend.append('PhotoDisplay', formData.photoDisplay);
      }
      if (formData.brc !== null && formData.brc !== undefined) {
        formDataToSend.append('BRC', formData.brc);
      }
      // Thêm các file PlaceMedia
      formData.placeMedia.forEach((media) => {
        if (media.url) {
          if (typeof media.url === 'string') {
            formDataToSend.append('PlaceMedia', media.url);
          } else {
            formDataToSend.append('PlaceMedia', media.url);
          }
        }
      });
  
      // Gửi yêu cầu POST với formData
      const response = await axiosInstance.post(
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
      const response = await axiosInstance.get('https://api.localtour.space/api/Address/Province');
      setProvinces(response.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  fetchProvinces();
}, []);

const fetchDistricts = async (provinceId: any) => {
  try {
    const response = await axiosInstance.get(`https://api.localtour.space/api/Address/District?provinceI=${provinceId}`);
    setDistricts(response.data);
  } catch (error) {
    console.error('Error fetching districts:', error);
  }
};

const fetchWards = async (districtId: any) => {
  try {
    const response = await axiosInstance.get(`https://api.localtour.space/api/Address/Ward?cityId=${districtId}`);
    console.log('Wards Response:', response.data);
    setWards(response.data);
  } catch (error) {
    console.error('Error fetching wards:', error);
  }
};

  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 2, paddingBottom: '16px' }}>New Place</DialogTitle>  {/* Thêm padding-bottom và margin-bottom */}
      <DialogContent sx={{ paddingTop: '24px' }}> 
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
  renderInput={(params) => <TextField {...params} label="Province"  InputLabelProps={{
    shrink: true, // Đảm bảo label luôn thu nhỏ
  }} />}
/>

<Autocomplete
  fullWidth
  options={districts}
  getOptionLabel={(option) => option.name}
  onChange={(event, value) => {
    setSelectedDistrict(value?.id || '');
    fetchWards(value?.id);
  }}
  renderInput={(params) => <TextField {...params} label="District"  InputLabelProps={{
    shrink: true, // Đảm bảo label luôn thu nhỏ
  }}/>}
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
  renderInput={(params) => (
    <>
      <TextField {...params} label="Ward" error={!!errors.wardId}  InputLabelProps={{
        shrink: true, // Đảm bảo label luôn thu nhỏ
      }}/>
      {errors.wardId && (
        <FormHelperText error>{errors.wardId}</FormHelperText>
      )}
    </>
  )}
  isOptionEqualToValue={(option, value) => option.id === value?.id}

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
          InputLabelProps={{
            shrink: true, // Đảm bảo label luôn thu nhỏ
          }}
          inputProps={{
            step: 300, // 5 minutes
          }}
          error={Boolean(errors.timeOpen)}
          helperText={errors.timeOpen}
        />
        <TextField
          fullWidth
          label="Time Close"
          name="timeClose"
          type="time"
          value={formData.timeClose}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{
            shrink: true, // Đảm bảo label luôn thu nhỏ
          }}
          inputProps={{
            step: 300, // 5 minutes
          }}
          error={Boolean(errors.timeClose)}
          helperText={errors.timeClose}
        />

<TextField
          fullWidth
          label="Longitude"
          name="longitude"
          value={formData.longitude}
          onChange={(e) => setLongitude(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true, // Đảm bảo label luôn thu nhỏ
          }}
          error={Boolean(errors.longitude)}
          helperText={errors.longitude}
        />
        <TextField
          fullWidth
          label="Latitude"
          name="latitude"
          value={formData.latitude}
          onChange={(e) => setLatitude(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true, // Đảm bảo label luôn thu nhỏ
          }}
          error={Boolean(errors.latitude)}
          helperText={errors.latitude}
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
          InputLabelProps={{
            shrink: true, // Đảm bảo label luôn thu nhỏ
          }}
          error={Boolean(errors.contactLink)}
          helperText={errors.contactLink}
        />

        {/* Tags - Autocomplete */}
        <Autocomplete
          multiple
          id="tags"
          options={tags}
          getOptionLabel={(option) => option.tagName}
          onChange={handleTagsChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              error={Boolean(errors.tags)}
              helperText={errors.tags}
              InputLabelProps={{
                shrink: true, // Đảm bảo label luôn thu nhỏ
              }}
            />
          )}
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
          {errors.photoDisplay && <div style={{ color: 'red' }}>{errors.photoDisplay}</div>}
        </div>
        <div style={{ marginTop: '20px' }}>
          <div style={{ fontWeight: 'bold' }}>BRC</div>
          <input
            type="file"
            accept="image/*"
            id="brc"
            onChange={handleBRCChange}
          />
        </div>
        

        {/* Place Media */}
        <div>
          <h4>Place Media</h4>
          {renderPlaceMedia()}
          {errors.placeMedia && <div style={{ color: 'red' }}>{errors.placeMedia}</div>}
        </div>
        <Button variant="contained" color="primary" onClick={() => setFormData({ ...formData, placeMedia: [...formData.placeMedia, { type: '', url: '' }] })}>
                  Add Media
        </Button>

        {/* Place Translations */}
        <div style={{ marginTop: '20px' }}>
          <Button variant="outlined" onClick={addPlaceTranslation}>
            Add Place Translation
          </Button>
          {formData.placeTranslations.map((translation, index) => (
            <div key={index} style={{ marginTop: '15px' }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Language Code</InputLabel>
                <Select
                  label="Language Code"
                  name="languageCode"
                  value={translation.languageCode}
                  onChange={(e) => handleInputChange(e, index)}
                >
                  {languageOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={`Name ${index + 1}`}
                name="name"
                value={translation.name}
                onChange={(event) => handleInputChange(event, index)}
                margin="normal"
                error={Boolean(errors.placeTranslations[index])}
                helperText={errors.placeTranslations[index]}
              />
              <TextField
                fullWidth
                label={`Description ${index + 1}`}
                name="description"
                value={translation.description}
                onChange={(event) => handleInputChange(event, index)}
                margin="normal"
                error={Boolean(errors.placeTranslations[index])}
                helperText={errors.placeTranslations[index]}
              />
              <TextField
                fullWidth
                label={`Address ${index + 1}`}
                name="address"
                value={translation.address}
                onChange={(event) => handleInputChange(event, index)}
                margin="normal"
                error={Boolean(errors.placeTranslations[index])}
                helperText={errors.placeTranslations[index]}
              />
              <TextField
                fullWidth
                label={`Contact ${index + 1}`}
                name="contact"
                value={translation.contact}
                onChange={(event) => handleInputChange(event, index)}
                margin="normal"
                error={Boolean(errors.placeTranslations[index])}
                helperText={errors.placeTranslations[index]}
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
