import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import {NewBannerForm} from './new-banner';
import {EditBannerForm} from './edit-banner';

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

export const BannerList = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [openNewBannerForm, setOpenNewBannerForm] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [originalBanner, setOriginalBanner] = useState<Banner | null>(null); // Lưu trạng thái ban đầu
  const [openEditForm, setOpenEditForm] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('accessToken');
      const response = await fetch(
        `https://api.localtour.space/api/Banner/GetByAuthor?UserId=${userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }

      const data: Banner[] = await response.json();
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleBannerCreated = () => {
    fetchBanners();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`https://api.localtour.space/api/Banner?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete banner');
      }

      alert('Banner deleted successfully!');
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner');
    }
  };

  const handleEdit = (banner: Banner) => {
    setSelectedBanner({ ...banner }); // Tạo bản sao để chỉnh sửa
    setOriginalBanner({ ...banner }); // Lưu trạng thái ban đầu
    setOpenEditForm(true);
  };

  const handleBannerUpdated = () => {
    fetchBanners();
    setOpenEditForm(false);
  };

  const handleCancelEdit = () => {
    setSelectedBanner(originalBanner); // Khôi phục giá trị ban đầu
    setOpenEditForm(false);
  };

  if (loading) return <p>Loading banners...</p>;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Banner
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenNewBannerForm(true)}
        >
          New Banner
        </Button>
      </Box>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {banners.map((banner) => (
          <div
            key={banner.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              width: '250px',
            }}
          >
            <img
              src={banner.bannerUrl}
              alt={banner.bannerName}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3 style={{ fontSize: '1.2rem', margin: '8px 0' }}>
              {banner.bannerName}
            </h3>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <IconButton onClick={() => handleEdit(banner)} color="primary">
                <Iconify icon="eva:edit-2-outline" />
              </IconButton>
              <IconButton onClick={() => handleDelete(banner.id)} color="error">
                <Iconify icon="eva:trash-2-outline" />
              </IconButton>
            </Box>
          </div>
        ))}
      </div>

      <NewBannerForm
        open={openNewBannerForm}
        onClose={() => setOpenNewBannerForm(false)}
        onBannerCreated={handleBannerCreated}
      />

      <EditBannerForm
        open={openEditForm}
        onClose={handleCancelEdit} // Đóng form bằng handleCancelEdit
        banner={selectedBanner}
        onBannerUpdated={handleBannerUpdated}
      />
    </DashboardContent>
  );
};
