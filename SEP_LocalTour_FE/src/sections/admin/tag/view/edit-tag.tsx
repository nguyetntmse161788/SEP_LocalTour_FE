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

interface Tag {
  id: string;
  tagName: string;
  tagVi: string;
  tagPhotoUrl: string;
}
export type TagProps = {
  id: string;
  tagName: string;
  tagVi: string;
  tagPhotoUrl: string;
};
// Component: Edit Banner Form
export const EditTagForm = ({
  open,
  onClose,
  tag,
  onTagUpdated,
}: {
  open: boolean;
  onClose: () => void;
  tag: Tag | null;
  onTagUpdated: (updatedtag: TagProps) => void;
}) => {
  const [tagName, setTagName] = useState(tag?.tagName || '');
  const [tagVi, setTagVi] = useState(tag?.tagVi || '');
  const [tagPhotoUrl, setTagPhotoUrl] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tag) {
      setTagName(tag.tagName);
      setTagVi(tag.tagVi);
      setTagPhotoUrl(null)
    }
  }, [tag]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTagPhotoUrl(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!tag || !tagName || !tagVi) {
      alert('Please provide all required fields!');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    // formData.append('bannerId', banner.id);
    formData.append('TagName', tagName);
    formData.append('TagVi', tagVi);
    
    let tagUrl = tag.tagPhotoUrl;
    if (tagPhotoUrl && tagPhotoUrl instanceof File) {
      const photoFormData = new FormData();
      photoFormData.append('file', tagPhotoUrl);
      
      const response = await axios.post('https://api.localtour.space/api/File/link', photoFormData);
      tagUrl = response.data?.data; // Lấy URL trả về từ API
    }

    formData.append('TagPhotoUrl', tagUrl as unknown as string);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`https://api.localtour.space/api/Tag/update?tagid=${tag.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update tag');
      }
      const data = await response.json();
      alert('Tag updated successfully!');
      onTagUpdated(data);
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
          label="Tag English Name"
          fullWidth
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Tag VietNamese Name"
          fullWidth
          value={tagVi}
          onChange={(e) => setTagVi(e.target.value)}
          margin="normal"
        />
        <Button variant="outlined" component="label">
          Upload New Banner
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {tagPhotoUrl && <p>Selected file: {tagPhotoUrl.name}</p>}
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