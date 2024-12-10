import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';
import axiosInstance from 'src/utils/axiosInstance';

interface NewEventFormProps {
  open: boolean;
  onClose: () => void;
  onEventCreated: (event: any) => void; // Có thể thay thế `any` bằng kiểu sự kiện cụ thể nếu có
  placeId: string;
}

export function NewEventForm({ open, onClose, onEventCreated, placeId }: NewEventFormProps) {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventPhoto, setPhoto] = useState<File | null>(null); // Thêm state cho ảnh

  useEffect(() => {
    if (!open) {
      // Reset form khi form đóng
      setEventName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setPhoto(null);
    }
  }, [open]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };
  const handleCreateEvent = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }
  
    // Định dạng lại ngày tháng theo ISO 8601
    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();
  
    // Tạo FormData thay vì gửi JSON
    const formData = new FormData();
    formData.append('placeid', placeId);
    formData.append('eventName', eventName);
    formData.append('description', description);
    formData.append('startDate', formattedStartDate);
    formData.append('endDate', formattedEndDate);
    if (eventPhoto) {
      formData.append('eventPhoto', eventPhoto); // Thêm ảnh vào FormData
    }
  
    console.log("Data being sent to API:", formData);  // Kiểm tra dữ liệu
  
    try {
      const response = await axiosInstance.post(
        `https://api.localtour.space/api/Event/create`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Đảm bảo Content-Type là multipart/form-data
          }
        }
      );
      console.log('Event created response:', response.data);
      onEventCreated(response.data);  // Thêm sự kiện vào danh sách
      onClose();  // Đóng form
      resetForm(); 
    } catch (error) {
      console.error("Error creating event", error);
    }
  };
  const resetForm = () => {
    setEventName('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setPhoto(null); 
  };
  
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Name"
          fullWidth
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Start Date"
          type="datetime-local"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="normal"
        />
        <TextField
          label="End Date"
          type="datetime-local"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          margin="normal"
        />
        <input
          id="event-photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ marginTop: '1rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateEvent} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
