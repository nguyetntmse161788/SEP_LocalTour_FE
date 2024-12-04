import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

export function UpdateEventForm({ open, onClose, initialData, onEventUpdated, placeId, eventId }: any) {
  const [eventData, setEventData] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    description: '',
    eventPhotoDisplay: '',
    eventPhotoFile:  null as File | null, // Thêm trường này để chứa file hình ảnh
  });
  const [showImageInput, setShowImageInput] = useState(false); // Kiểm soát hiển thị input file

  useEffect(() => {
    if (initialData) {
      setEventData({
        ...initialData,
        startDate: formatDatetimeForInput(initialData.startDate),
        endDate: formatDatetimeForInput(initialData.endDate),
      });
    }
  }, [initialData]);

  const formatDatetimeForInput = (datetime: string) => {
    if (!datetime) return '';
    const date = new Date(datetime);
    
    // Get the date in the correct format
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    // Return the date and time in the correct format
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };
  
  

  const handleImageRemove = () => {
    setEventData({ ...eventData, eventPhotoDisplay: '', eventPhotoFile: null });
    setShowImageInput(true); // Hiển thị input file để chọn ảnh mới
  };
  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Giả định bạn có API upload, sử dụng file để upload
      // Dưới đây là ví dụ giả định lưu ảnh cục bộ
      const imageUrl = URL.createObjectURL(file);
      setEventData({ ...eventData, eventPhotoDisplay: imageUrl, eventPhotoFile: file });
      setShowImageInput(false); // Ẩn input file sau khi chọn ảnh
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    const formData = new FormData();
    formData.append('placeid', placeId);
    formData.append('eventid', eventId); // Giả định initialData có eventId
    formData.append('EventName', eventData.eventName);
    formData.append('Description', eventData.description);
    formData.append('StartDate', eventData.startDate);
    formData.append('EndDate', eventData.endDate);

    if (eventData.eventPhotoFile) {
      formData.append('EventPhoto', eventData.eventPhotoFile);
    }

    try {
      const response = await axios.put(
        'https://api.localtour.space/api/Event/update',
        formData,
        {
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      onEventUpdated(response.data.data);
      onClose();
    } catch (error) {
      console.error('Error submitting event data:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        {/* Tên sự kiện */}
        <TextField
          label="Event Name"
          value={eventData.eventName}
          onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
          fullWidth
          margin="normal"
        />

        {/* Ngày và giờ bắt đầu */}
        <TextField
          label="Start Date & Time"
          type="datetime-local"
          value={eventData.startDate}
          onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        {/* Ngày và giờ kết thúc */}
        <TextField
          label="End Date & Time"
          type="datetime-local"
          value={eventData.endDate}
          onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        {/* Mô tả sự kiện */}
        <TextField
          label="Description"
          value={eventData.description}
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
          fullWidth
          margin="normal"
          multiline
          rows={4} // Đặt số dòng của TextField cho mô tả
        />

        {/* Hình ảnh */}
        {eventData.eventPhotoDisplay && !showImageInput ? (
          <div style={{ position: 'relative', margin: '10px 0' }}>
            <img
              src={eventData.eventPhotoDisplay}
              alt="Event"
              style={{
                width: '150px', // Đặt chiều rộng hình ảnh là 150px (hoặc giá trị bạn muốn)
                height: 'auto', // Giữ tỷ lệ của ảnh
                borderRadius: '8px',
              }}
            />
            <IconButton
              style={{
                position: 'absolute',
                top: '-5px', // Đặt dấu "x" ngay sát cạnh trên của ảnh
                right: '-5px', // Đặt dấu "x" ngay sát cạnh phải của ảnh
                backgroundColor: 'white', // Nền trắng cho icon
                padding: '3px', // Giảm padding để làm dấu "x" nhỏ gọn
                zIndex: 1, // Đảm bảo rằng dấu "x" nằm trên ảnh
              }}
              onClick={handleImageRemove}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ margin: '10px 0' }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
