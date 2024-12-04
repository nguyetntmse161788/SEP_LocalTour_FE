import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Autocomplete, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import MapComponent from 'src/components/map/map-component';
// import { UserProps } from '../place-table-row';


export type UserProps = {
    id: string;
    name: string;
    address: string;
    description: string;
    status: string;
    photoDisplay: string;
    
    placeTranslation: [
      { name: string, address: string, description: string },
    ],
    isVerified: boolean;
  };
interface UpdatePlaceFormProps {
  open: boolean;
  onClose: () => void;
  placeId: string; // ID của địa điểm cần update
  onPlaceUpdated: (updatedPlace: UserProps) => void;
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

function UpdatePlaceForm({ open, onClose, placeId, onPlaceUpdated }: UpdatePlaceFormProps) {
  const [formData, setFormData] = useState({
    wardId: '',
    timeOpen: '',
    timeClose: '',
    longitude: '',
    latitude: '',
    contactLink: '',
    tags: [] as string[],
    placeTranslations: [] as PlaceTranslation[],
    photoDisplay: null as File | null,
    placeMedia: [] as (File | null)[],
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

  // Lấy dữ liệu hiện tại của địa điểm từ API
  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(`https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${placeId}`);
        const placeData = response.data;

        setFormData({
          wardId: placeData.wardId || '',
          timeOpen: placeData.timeOpen || '',
          timeClose: placeData.timeClose || '',
          longitude: placeData.longitude?.toString() || '',
          latitude: placeData.latitude?.toString() || '',
          contactLink: placeData.contactLink || '',
          tags: placeData.tags || [],
          placeTranslations: placeData.placeTranslations || [],
          photoDisplay: placeData.photoDisplay,
          placeMedia: [],
          isVerified: placeData.isVerified || false,
          status: placeData.status || '0',
        });
        setSelectedProvince(placeData.provinceId);
        setSelectedDistrict(placeData.districtId);
        fetchDistricts(placeData.provinceId); // Fetch districts for selected province
        fetchWards(placeData.districtId);
        fetchTagsForPlace(placeId);
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    };

    fetchPlaceData();
  }, [placeId]);
  const fetchTagsForPlace = async (placeid: string) => {
    try {
      const response = await axios.get(`https://api.localtour.space/api/Place/getTagsInPlace?placeId=${placeid}`);
      const tagsForPlace = response.data; // Assuming response.data.items is the list of tags
      setTags(tagsForPlace); // Store the tags in the `tags` state
      setFormData((prevData) => ({
        ...prevData,
        tags: tagsForPlace.map((tag: { id: string }) => tag.id), // Store the tag IDs
      }));
    } catch (error) {
      console.error('Error fetching tags for place:', error);
    }
  };
  const handleProvinceChange = (event: any, value: Location | null) => {
    setSelectedProvince(value?.id || '');
    setSelectedDistrict(''); // Reset district when province changes
    setWards([]); // Reset wards when province changes
    fetchDistricts(value?.id);
  };
  
  // When District is selected, fetch wards
  const handleDistrictChange = (event: any, value: Location | null) => {
    setSelectedDistrict(value?.id || '');
    fetchWards(value?.id);
  };
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

  // Lấy danh sách tags từ API
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


  // Cập nhật dữ liệu form
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    const updatedTranslations = [...formData.placeTranslations];
    updatedTranslations[index] = {
      ...updatedTranslations[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      placeTranslations: updatedTranslations,
    });
  };
  const handleInputChanges = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Cập nhật trường tương ứng trong formData
    }));
  };
  

  const handleTagsChange = (event: React.ChangeEvent<{}>, newValue: { id: string; tagName: string }[]) => {
    // Map through the new selected tags and update the form data
    setFormData((prevData) => ({
      ...prevData,
      tags: newValue.map((tag) => tag.id),  // Save only the tag IDs
    }));
  };
  

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const formDataToSend = new FormData();

      formDataToSend.append('WardId', formData.wardId);
      formDataToSend.append('TimeOpen', formData.timeOpen);
      formDataToSend.append('TimeClose', formData.timeClose);
      formDataToSend.append('Longitude', formData.longitude);
      formDataToSend.append('Latitude', formData.latitude);
      formDataToSend.append('ContactLink', formData.contactLink);
      formData.tags.forEach((tagId) => formDataToSend.append('Tags', tagId));
      formDataToSend.append('PlaceTranslation', JSON.stringify(formData.placeTranslations));

      if (formData.photoDisplay) {
        formDataToSend.append('PhotoDisplay', formData.photoDisplay);
      }

      formData.placeMedia.forEach((media) => {
        if (media) {
          formDataToSend.append('PlaceMedia', media);
        }
      });

      const response = await axios.put(
        `https://api.localtour.space/api/Place/update?placeid=${placeId}`,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedPlace = response.data;
      alert('Place updated successfully!');
      onPlaceUpdated(updatedPlace);
      onClose();
    } catch (error) {
      console.error('Error updating place:', error);
      alert('Failed to update place.');
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
  value={provinces.find((province) => province.id === selectedProvince) || null}
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
  value={districts.find((district) => district.id === selectedDistrict) || null}
  renderInput={(params) => <TextField {...params} label="District" />}
/>

<Autocomplete
  fullWidth
  options={wards}
  getOptionLabel={(option) => option.wardName || ''}
  value={wards.find((ward) => ward.id === formData.wardId) || null}
  onChange={(event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      wardId: value?.id || '',
    }));
  }}
  renderInput={(params) => <TextField {...params} label="Ward" />}
/>




        {/* TimeOpen */}
        <TextField
          fullWidth
          label="Time Open"
          name="timeOpen"
          type="time"
          value={formData.timeOpen}
          onChange={handleInputChanges}
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
          onChange={handleInputChanges}
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
          onChange={handleInputChanges}
          margin="normal"
        />

        {/* Tags - Autocomplete */}
        <Autocomplete
  multiple
  id="tags"
  options={tags}
  getOptionLabel={(option) => option.tagName}
  onChange={handleTagsChange}
  value={tags.filter((tag) => formData.tags.includes(tag.id))} 
  renderInput={(params) => <TextField {...params} label="Tags" />}
  disableCloseOnSelect
/>


        {/* Photo Display */}
        <div style={{ marginTop: '20px' }}>
  <div style={{ fontWeight: 'bold' }}>Photo Display</div>
  
  {/* Kiểm tra nếu photoDisplay là URL */}
  {formData.photoDisplay && typeof formData.photoDisplay === 'string' ? (
    // Nếu là URL, hiển thị ảnh
    <div style={{ position: 'relative', width: '100%', maxWidth: '200px', marginBottom: '10px' }}>
      <img 
        src={formData.photoDisplay} 
        alt="Display of the place"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '200px',
          objectFit: 'cover',
          borderRadius: '10px',  // Tạo bo góc cho ảnh
        }} 
      />
      
      {/* Dấu "X" trên góc phải của ảnh */}
      <Button
        variant="contained"
        color="error"
        onClick={() => setFormData({ ...formData, photoDisplay: null })}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          padding: '5px',
          minWidth: 'unset',
          borderRadius: '50%',
          fontSize: '16px',  // Kích thước chữ của dấu X
          backgroundColor: 'rgba(255, 0, 0, 0.7)', // Màu nền đỏ trong suốt
          color: '#fff', // Màu chữ trắng
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',  // Thêm bóng cho nút
        }}
      >
        X
      </Button>
    </div>
  ) : (
    // Nếu không phải URL (null hoặc file), hiển thị input để chọn ảnh
    <input
      type="file"
      accept="image/*"
      id="photoDisplay"
      onChange={handlePhotoDisplayChange}
    />
  )}
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

export default UpdatePlaceForm;
