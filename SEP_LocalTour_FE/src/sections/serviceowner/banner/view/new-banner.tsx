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
  CircularProgress,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

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

// Component: Banner Form
export const NewBannerForm = ({
  open,
  onClose,
  onBannerCreated,
}: {
  open: boolean;
  onClose: () => void;
  onBannerCreated: () => void;
}) => {
  const [bannerName, setBannerName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      // Reset form khi form đóng
      setBannerName('');
      setSelectedFile(null);
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!bannerName || !selectedFile) {
      alert('Please provide all required fields!');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('BannerName', bannerName);
      formData.append('BannerUrl', selectedFile);

      const response = await fetch('https://api.localtour.space/api/Banner/createBanner', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create banner');
      }

      alert('Banner created successfully!');
      onBannerCreated(); // Notify parent to refresh the list
      onClose(); // Close the form
    } catch (error) {
      console.error('Error creating banner:', error);
      alert('Failed to create banner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Banner</DialogTitle>
      <DialogContent>
        <TextField
          label="Banner Name"
          fullWidth
          value={bannerName}
          onChange={(e) => setBannerName(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          {selectedFile ? selectedFile.name : 'Choose File'}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {selectedFile && (
          <Typography
            variant="body2"
            style={{ marginTop: '8px', color: '#555' }}
          >
            Selected File: {selectedFile.name}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};