import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

interface NewActivityFormProps {
  open: boolean;
  onClose: () => void;
  onActivityCreated: (activity: any) => void;
  placeId: string;
}

interface PlaceActivityTranslation {
  languageCode: string;
  activityName: string;
  price: number;
  description: string;
  priceType: string;
  discount: number;
}

export function NewActivityForm({ open, onClose, onActivityCreated, placeId }: NewActivityFormProps) {
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);  // Explicit type for price
  const [priceType, setPriceType] = useState('');
  const [discount, setDiscount] = useState<number>(0); // Explicit type for discount
  const [languageCode, setLanguageCode] = useState('vi');
  const [photoDisplay, setPhotoDisplay] = useState<File | null>(null);
  const [displayNumber, setDisplayNumber] = useState<number>(1);  // New state for DisplayNumber

  const [placeActivityTranslations, setPlaceActivityTranslations] = useState<PlaceActivityTranslation[]>([
    { languageCode, activityName, price, description, priceType, discount }
  ]);

  const [placeActivityMedium, setPlaceActivityMedium] = useState<(File | null)[]>([]);

  const handleCreateActivity = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    const formData = new FormData();
    formData.append('placeid', placeId);
    formData.append('DisplayNumber', displayNumber.toString());  // Add DisplayNumber

    // Add PlaceActivityTranslations to form data
    placeActivityTranslations.forEach(translation => {
      formData.append('PlaceActivityTranslations', JSON.stringify(translation));
    });

    // Add PhotoDisplay
    if (photoDisplay) {
      formData.append('PhotoDisplay', photoDisplay);
    }

    // Add PlaceActivityMedia
    placeActivityMedium.forEach((media) => {
      if (media) {
        formData.append('PlaceActivityMedium', media); // Only add media if it's not null
      }
    });

    try {
      const response = await axios.post(
        `https://api.localtour.space/api/PlaceActivity/create?placeid=${placeId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      console.log('Activity created response:', response.data);
      onActivityCreated(response.data); // Add activity to list
      onClose(); // Close form
      resetForm();
    } catch (error) {
      console.error("Error creating activity", error);
    }
  };

  const resetForm = () => {
    setActivityName('');
    setDescription('');
    setPrice(0);
    setPriceType('');
    setDiscount(0);
    setLanguageCode('vi');
    setPhotoDisplay(null);
    setDisplayNumber(1);  // Reset DisplayNumber
    setPlaceActivityTranslations([{ languageCode, activityName, price, description, priceType, discount }]);
    setPlaceActivityMedium([]);
  };

  const handleAddTranslation = () => {
    setPlaceActivityTranslations([
      ...placeActivityTranslations,
      { languageCode, activityName, price, description, priceType, discount }
    ]);
  };

  const handleRemoveTranslation = (index: number) => {
    const updatedTranslations = placeActivityTranslations.filter((_, i) => i !== index);
    setPlaceActivityTranslations(updatedTranslations);
  };

  const handleAddMedia = () => {
    setPlaceActivityMedium([...placeActivityMedium, null]);
  };

  const handleRemoveMedia = (index: number) => {
    const updatedMedia = placeActivityMedium.filter((_, i) => i !== index);
    setPlaceActivityMedium(updatedMedia);
  };

  const handleTranslationChange = (index: number, field: string, value: string | number) => {
    const updatedTranslations = [...placeActivityTranslations];
    updatedTranslations[index] = { ...updatedTranslations[index], [field]: value };
    setPlaceActivityTranslations(updatedTranslations);
  };

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = event.target.files;
    if (files && files[0]) {
      const updatedMedia = [...placeActivityMedium];
      updatedMedia[index] = files[0];
      setPlaceActivityMedium(updatedMedia);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Activity</DialogTitle>
      <DialogContent>
        <TextField
          label="Display Number"  // New field for Display Number
          type="number"
          fullWidth
          value={displayNumber}
          onChange={(e) => setDisplayNumber(Number(e.target.value))}
          margin="normal"
        />

        <div>
          <Button variant="outlined" onClick={handleAddTranslation}>Add Translation</Button>
          {placeActivityTranslations.map((translation, index) => (
            <div key={index}>
              <TextField
                label="Activity Name"
                fullWidth
                value={translation.activityName}
                onChange={(e) => handleTranslationChange(index, 'activityName', e.target.value)}
                margin="normal"
              />
              <TextField
                label="Language Code"
                fullWidth
                value={translation.languageCode}
                onChange={(e) => handleTranslationChange(index, 'languageCode', e.target.value)}
                margin="normal"
              />
              <TextField
                label="Description"
                fullWidth
                value={translation.description}
                onChange={(e) => handleTranslationChange(index, 'description', e.target.value)}
                margin="normal"
              />
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={translation.price}
                onChange={(e) => handleTranslationChange(index, 'price', Number(e.target.value))}
                margin="normal"
              />
              <TextField
                label="Price Type"
                fullWidth
                value={translation.priceType}
                onChange={(e) => handleTranslationChange(index, 'priceType', e.target.value)}
                margin="normal"
              />
              <TextField
                label="Discount"
                type="number"
                fullWidth
                value={translation.discount}
                onChange={(e) => handleTranslationChange(index, 'discount', Number(e.target.value))}
                margin="normal"
              />
              <Button onClick={() => handleRemoveTranslation(index)}>Remove Translation</Button>
            </div>
          ))}
        </div>

        <div>
          <Button variant="outlined" onClick={handleAddMedia}>Add Media</Button>
          {placeActivityMedium.map((media, index) => (
            <Grid container key={index}>
              <Grid item>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMediaChange(e, index)}
                />
              </Grid>
              <Grid item>
                <Button onClick={() => handleRemoveMedia(index)}>Remove</Button>
              </Grid>
            </Grid>
          ))}
        </div>

        <div>
          <label>Photo Display: </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoDisplay(e.target.files ? e.target.files[0] : null)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleCreateActivity} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
