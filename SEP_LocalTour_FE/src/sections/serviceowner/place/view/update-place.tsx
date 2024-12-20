import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Autocomplete, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, FormHelperText, Select, MenuItem } from '@mui/material';
import MapComponent from 'src/components/map/map-component';
import axiosInstance from 'src/utils/axiosInstance';
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
interface PlaceMedia {
  type: string,
  url: string,
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
    brc: null as File | null,
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
  const [initialFormData, setInitialFormData] = useState(formData);
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
  

  // Lấy dữ liệu hiện tại của địa điểm từ API
  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await axiosInstance.get(`https://api.localtour.space/api/Place/getPlaceById?placeid=${placeId}`);
        const placeData = response.data;
        const fetchedData = {
          wardId: placeData.wardId || '',
          timeOpen: placeData.timeOpen || '',
          timeClose: placeData.timeClose || '',
          longitude: placeData.longitude?.toString() || '',
          latitude: placeData.latitude?.toString() || '',
          contactLink: placeData.contactLink || '',
          tags: placeData.tags || [],
          placeTranslations: placeData.placeTranslations || [],
          photoDisplay: placeData.photoDisplay,
          brc: placeData.brc,
          placeMedia: placeData.placeMedia.map((media: { type: string, url: string }) => ({
            type: media.type,
            url: media.url
          })),
          isVerified: placeData.isVerified || false,
          status: placeData.status || '0',
        };
        setFormData(fetchedData); 
        setInitialFormData(fetchedData); 
        const district = await axiosInstance.get(`https://api.localtour.space/api/Address/getDistrictByWardId?wardId=${placeData.wardId}`);
        const datadistrict = district.data;
        setSelectedDistrict(datadistrict.id);
        const province = await axiosInstance.get(`https://api.localtour.space/api/Address/getProvinceByDistrictId?districtId=${datadistrict.id}`);
        const dataprovince = province.data;
        setSelectedProvince(dataprovince.id);
        fetchDistricts(dataprovince.id);
        fetchWards(datadistrict.id);
        fetchTagsForPlace(placeId);
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
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    };

    fetchPlaceData();
  }, [open,placeId]);
  const handleClose = () => {
    setFormData(initialFormData); 
    onClose();
  };
  
  const fetchTagsForPlace = async (placeid: string) => {
    try {
      const response = await axiosInstance.get(`https://api.localtour.space/api/Place/getTagsInPlace?placeId=${placeid}`);
      const tagsForPlace = response.data; // Assuming response.data.items is the list of tags
      // setTags(tagsForPlace); // Store the tags in the `tags` state
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
        const response = await axiosInstance.get('https://api.localtour.space/api/Tag/getAll?Size=1000');
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
      // Only update formData if a file is selected
      setFormData((prevData) => ({
        ...prevData,
        brc: files[0], // Save the first file
      }));
    } else {
      // If no file is selected, ensure brc is not set
      setFormData((prevData) => ({
        ...prevData,
        brc: null, // Clear the brc field when no file is selected
      }));
    }
  };

// Handle file input for media 
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
    // Update the formData tags with the selected tags' ids
    setFormData((prevData) => ({
      ...prevData,
      tags: newValue.map((tag) => tag.id),  // Save only the tag IDs
    }));
  };
  
  

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

      formDataToSend.append('WardId', formData.wardId);
      formDataToSend.append('TimeOpen', formData.timeOpen);
      formDataToSend.append('TimeClose', formData.timeClose);
      formDataToSend.append('Longitude', formData.longitude);
      formDataToSend.append('Latitude', formData.latitude);
      formDataToSend.append('ContactLink', formData.contactLink);
      formData.tags.forEach((tagId) => formDataToSend.append('Tags', tagId));
      formDataToSend.append('PlaceTranslation', JSON.stringify(formData.placeTranslations));

      let photoDisplayUrl = formData.photoDisplay;
      if (formData.photoDisplay && formData.photoDisplay instanceof File) {
        const photoFormData = new FormData();
        photoFormData.append('file', formData.photoDisplay);
        
        const response = await axios.post('https://api.localtour.space/api/File/link', photoFormData);
        photoDisplayUrl = response.data?.data; // Lấy URL trả về từ API
      }
  
      formDataToSend.append('PhotoDisplay', photoDisplayUrl as unknown as string);
        
      formData.placeMedia.forEach((media) => {
        if (media.url) {
          if (typeof media.url === 'string') {
            formDataToSend.append('PlaceMedia', media.url);
          } else {
            formDataToSend.append('PlaceMedia', media.url);
          }
        }
      });
      let brcUrl = formData.brc;
      if (formData.brc && formData.brc instanceof File) {
        const photoFormData = new FormData();
        photoFormData.append('file', formData.brc);
        
        const response = await axios.post('https://api.localtour.space/api/File/link', photoFormData);
        brcUrl = response.data?.data; // Lấy URL trả về từ API
        formDataToSend.append('brc', brcUrl as unknown as string);
      }
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
  renderInput={(params) => (
    <>
      <TextField {...params} label="Ward" error={!!errors.wardId} />
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
          onChange={handleInputChanges}
          margin="normal"
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
          onChange={handleInputChanges}
          margin="normal"
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
          onChange={handleInputChanges}
          margin="normal"
          error={Boolean(errors.contactLink)}
          helperText={errors.contactLink}
        />

        {/* Tags - Autocomplete */}
        <Autocomplete
  multiple
  id="tags"
  options={tags}  // Tất cả các tag từ API
  getOptionLabel={(option) => option.tagName}  // Hiển thị tên của mỗi tag
  onChange={handleTagsChange}  // Cập nhật khi người dùng thay đổi lựa chọn
  value={tags.filter(tag => formData.tags.includes(tag.id))}  // Chỉ hiển thị những tag đã chọn trong input
  renderInput={(params) => (
    <TextField
      {...params}
      label="Tags"
      error={Boolean(errors.tags)}
      helperText={errors.tags}
    />
  )}
  disableCloseOnSelect  // Giữ các lựa chọn trong input khi nhấn vào tag
/>






        {/* Photo Display */}
        <div style={{ marginTop: '20px' }}>
  <div style={{ fontWeight: 'bold' }}>Photo Display</div>
  
  {formData.photoDisplay ? (
    <div style={{ position: 'relative', width: '100%', maxWidth: '200px', marginBottom: '10px' }}>
      <img 
        src={typeof formData.photoDisplay === 'string' 
          ? formData.photoDisplay 
          : URL.createObjectURL(formData.photoDisplay)} 
        alt="Display of the place"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '200px',
          objectFit: 'cover',
          borderRadius: '10px',
        }} 
      />
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
          fontSize: '16px',
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          color: '#fff',
        }}
      >
        X
      </Button>
    </div>
  ) : (
    <input
      type="file"
      accept="image/*"
      id="photoDisplay"
      onChange={handlePhotoDisplayChange}
    />
  )}
   {errors.photoDisplay && <div style={{ color: 'red' }}>{errors.photoDisplay}</div>}
</div>
          {/* BRC*/}
<div style={{ marginTop: '20px' }}>
  <div style={{ fontWeight: 'bold' }}>BRC</div>
  
  {formData.brc ? (
    <div style={{ position: 'relative', width: '100%', maxWidth: '200px', marginBottom: '10px' }}>
      <img 
        src={typeof formData.brc === 'string' 
          ? formData.brc 
          : URL.createObjectURL(formData.brc)} 
        alt="Display of the place"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '200px',
          objectFit: 'cover',
          borderRadius: '10px',
        }} 
      />
      <Button
        variant="contained"
        color="error"
        onClick={() => setFormData({ ...formData, brc: null })}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          padding: '5px',
          minWidth: 'unset',
          borderRadius: '50%',
          fontSize: '16px',
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          color: '#fff',
        }}
      >
        X
      </Button>
    </div>
  ) : (
    <input
      type="file"
      accept="image/*"
      id="bRC"
      onChange={handleBRCChange}
    />
  )}
</div>






        {/* Place Media */}
        <div>
          <h4>Place Media</h4>
          {renderPlaceMedia()}
          {errors.placeMedia && <div style={{ color: 'red' }}>{errors.placeMedia}</div>}
        </div>

        {/* Add New Media */}
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
              <Select
      fullWidth
      value={translation.languageCode || ''}
      onChange={(event) => {
        const updatedTranslations = [...formData.placeTranslations];
        updatedTranslations[index] = {
          ...updatedTranslations[index],
          languageCode: event.target.value,
        };
        setFormData({ ...formData, placeTranslations: updatedTranslations });
      }}
    >
      <MenuItem value="vi">VN</MenuItem>
      <MenuItem value="en">EN</MenuItem>
    </Select>
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
        <Button onClick={handleClose} color="secondary">
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
