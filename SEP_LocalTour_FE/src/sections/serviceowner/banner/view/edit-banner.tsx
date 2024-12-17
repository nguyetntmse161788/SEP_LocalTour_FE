import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import axios from 'axios';

interface Banner {
  id: string;
  bannerName: string;
  bannerUrl: string;
  createdDate: string;
  updatedDate: string;
  bannerHistories: Array<{
    id: string;
    bannerId: string;
    timeStart: string;
    timeEnd: string;
    status: string;
  }>;
}

// Component: Edit Banner Form
export const EditBannerForm = ({
  open,
  onClose,
  banner,
  onBannerUpdated,
}: {
  open: boolean;
  onClose: () => void;
  banner: Banner | null;
  onBannerUpdated: () => void;
}) => {
  const [bannerName, setBannerName] = useState(banner?.bannerName || '');
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (banner) {
      setBannerName(banner.bannerName);
    }
  }, [banner]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!banner || !bannerName) {
      alert('Please provide all required fields!');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    // formData.append('bannerId', banner.id);
    formData.append('BannerName', bannerName);
    
    let BannerUrl = banner.bannerUrl;
    if (bannerFile && bannerFile instanceof File) {
      const photoFormData = new FormData();
      photoFormData.append('file', bannerFile);
      
      const response = await axios.post('https://api.localtour.space/api/File/link', photoFormData);
      BannerUrl = response.data?.data; // Lấy URL trả về từ API
    }

    formData.append('BannerUrl', BannerUrl as unknown as string);
    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(banner.id);
    if (!isGuid) {
      throw new Error('Invalid banner ID format');
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`https://api.localtour.space/api/Banner/Update?bannerId=${banner.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update banner');
      }

      alert('Banner updated successfully!');
      onBannerUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Failed to update banner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Banner</DialogTitle>
      <DialogContent>
        <TextField
          label="Banner Name"
          fullWidth
          value={bannerName}
          onChange={(e) => setBannerName(e.target.value)}
          margin="normal"
        />
        <Button variant="outlined" component="label">
          Upload New Banner
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {bannerFile && <p>Selected file: {bannerFile.name}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};