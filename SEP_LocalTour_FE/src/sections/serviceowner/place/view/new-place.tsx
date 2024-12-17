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
    placeTranslations: formData.placeTranslations.map(() => ''),
    });
    }
  }, [open,formData.placeTranslations]);
  

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
  
      // Thêm các file PlaceMedia
      formData.placeMedia.forEach((media, index) => {
        if (media) {
          formDataToSend.append('PlaceMedia', media);  // Không cần thêm chỉ mục, vì API có thể nhận được mảng các file
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
            {errors.placeMedia && <div style={{ color: 'red' }}>{errors.placeMedia}</div>}
        </div>

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
