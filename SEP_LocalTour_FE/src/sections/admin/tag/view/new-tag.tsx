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

// Component: Banner Form
export const NewTagForm = ({
  open,
  onClose,
  onTagCreated,
}: {
  open: boolean;
  onClose: () => void;
  onTagCreated: () => void;
}) => {
  const [tagName, setTagName] = useState('');
  const [tagVi, setTagVi] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      // Reset form khi form đóng
      setTagName('');
      setTagVi('');
      setSelectedFile(null);
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!tagName || !selectedFile ||!tagVi) {
      alert('Please provide all required fields!');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('TagName', tagName);
      formData.append('TagVi', tagVi);
      formData.append('TagPhotoUrl', selectedFile);

      const response = await fetch('https://api.localtour.space/api/Tag/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create tag');
      }

      alert('Tag created successfully!');
      onTagCreated(); // Notify parent to refresh the list
      onClose(); // Close the form
    } catch (error) {
      console.error('Error creating tag:', error);
      alert('Failed to create tag');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Banner</DialogTitle>
      <DialogContent>
        <TextField
          label="Tag English Name"
          fullWidth
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Tag Vietnamese Name"
          fullWidth
          value={tagVi}
          onChange={(e) => setTagVi(e.target.value)}
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