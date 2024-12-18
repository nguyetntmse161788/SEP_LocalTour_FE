/* eslint-disable arrow-body-style */
/* eslint-disable prefer-promise-reject-errors */
import { useState, useEffect,useRef } from 'react';  
import { useParams, useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import axiosInstance from 'src/utils/axiosInstance';
import Webcam from 'react-webcam';
import { Dialog } from '@mui/material';
import {  DialogActions, DialogContent, DialogTitle, IconButton,TextField  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImageData {
    dataUrl: string;
    latitude: number;
    longitude: number;
    timestamp: string;
}
export function PlaceDetailView() {
  const { id } = useParams(); // Lấy ID từ URL
  const [place, setPlace] = useState<any>(null); // Chứa dữ liệu place
  const [loading, setLoading] = useState<boolean>(true); // Kiểm tra trạng thái loading
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate(); // Hook điều hướng
  const [openDialog, setOpenDialog] = useState(false);
  const [placeStatus, setplaceStatus] = useState('');
  const [images, setImages] = useState<string[]>([]); 
  const webcamRef = useRef<Webcam>(null);
  const [openReject, setOpenReject] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  // Fetch dữ liệu Place từ API
  useEffect(() => {
    const fetchPlaceDetail = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await axiosInstance.get(`https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlace(response.data); // Lưu dữ liệu place
        setLoading(false); // Đặt loading thành false khi đã lấy dữ liệu
      } catch (error) {
        console.error("Error fetching place details", error);
        setLoading(false);
      }
    };

    fetchPlaceDetail();
  }, [id]); // Khi ID thay đổi, sẽ gọi lại API


  const handleChangeStatus = async (status: string) => {
    setOpenDialog(true);
    setplaceStatus(status);
  };

  if (loading) {
    return (
      <DashboardContent>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  if (!place) {
    return (
      <DashboardContent>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h5">Place not found</Typography>
        </Box>
      </DashboardContent>
    );
  }

  const isPending = place.status === '0';  // Pending
  const isApproved = place.status === '1';  // Approved
  const isRejected = place.status === '2';  // Rejected


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setImages([]); 
  };
  const handleClose = () => {
    setOpenReject(false);
};

  const capture = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      
      return;
    }
    console.log(imageSrc);
    const { latitude, longitude } = await getCurrentLocation();
    const timestamp = new Date().toLocaleString();
    const annotatedImage = await annotateImage(imageSrc || "", latitude, longitude, timestamp);
    setImages([...images, annotatedImage]);
  };

  // eslint-disable-next-line arrow-body-style
  const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            // eslint-disable-next-line prefer-promise-reject-errors
                            reject("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            // eslint-disable-next-line prefer-promise-reject-errors
                            reject("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            reject("The request to get user location timed out.");
                            break;
                        case 0: // Use 0 for UNKNOWN_ERROR
                            reject("An unknown error occurred.");
                            break;
                        default:
                            reject(`An error with code ${error.code} occurred.`); // Handle other error codes
                    }
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
};
  

  const annotateImage = (imageSrc: string, latitude: number, longitude: number, timestamp: string) => {
    return new Promise<string>((resolve) => { 
      
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) { // Check if ctx is not null
              ctx.drawImage(img, 0, 0);
                ctx.fillStyle = 'red';
                ctx.font = '19px Arial';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';

                ctx.fillText(`Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`, 16, canvas.height - 30);
                ctx.fillText(`Time: ${timestamp}`, 16, canvas.height - 10);

                resolve(canvas.toDataURL('image/png'));
            } else {
                console.error("Could not get canvas context.");
                resolve(imageSrc); 
            }
        };
        img.onerror = () => {
            console.error("Error loading image for annotation.");
            resolve(imageSrc); // Resolve with original image if there's an error
        }
    });
};

  const handleUploadAll = async () => {
    if (uploading) return;
    setUploading(true);
    if (images.length === 0) {
        alert('Please take at least one photo before uploading.');
        return;
    }
   
    try {

      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        return;
      }

      const formData = new FormData();
      if (id) {
        formData.append('placeId', id.toString());
      } else {
        console.error('Place ID is not available');
        return;
      }
      images.forEach((base64Image, index) => {
        const blob = dataURLtoBlob(base64Image);
        console.log(id);

        formData.append(`files`, blob, `image_${index}.png`);
    });

    const responseModcheck = await axiosInstance.post(
     'https://api.localtour.space/api/ModCheckPlace/CreateModCheck',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': `multipart/form-data;`, 
                },
            }
        );


            alert('Các ảnh đã được tải lên thành công!');
            setImages([]); 
            setOpenDialog(false)
  

      console.log(`Changing status to: ${placeStatus}`); 

      if(placeStatus === "Rejected"){
        setOpenReject(true); 
      }else{
      const response = await axiosInstance.put(
        `https://api.localtour.space/api/Place/changeStatusPlace?placeid=${id}&status=${placeStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(`Status updated to: ${placeStatus}`); 
        setPlace((prevPlace: any) => ({ ...prevPlace, status: placeStatus }));
        const event = new CustomEvent('updateModeratorPoints');
        window.dispatchEvent(event);
      }
      await onSubmit(null)
      }
    } catch (error) {
        console.error('Error:', error);
        setUploading(false);
        alert('An error occurred.');
    }
  };

  const dataURLtoBlob = (dataURL: string) => {
    // Implementation from previous answer
    const base64 = dataURL.split(',')[1];
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: 'image/png'});
  };

  const handleSubmit = async  () => {
    if (rejectReason.trim() === "") {
        alert("Please enter reason for rejection.");
        return;
    }
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    const response = await axiosInstance.put(
      `https://api.localtour.space/api/Place/changeStatusPlace?placeid=${id}&status=${placeStatus}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(`Status updated to: ${placeStatus}`); 
      setPlace((prevPlace: any) => ({ ...prevPlace, status: placeStatus }));
    }

    onSubmit(rejectReason); 
    handleClose(); 
    setRejectReason(''); 
};

// eslint-disable-next-line @typescript-eslint/no-shadow, consistent-return
const onSubmit = async (rejectReason : string | null) => {

  const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        return false;
      }
      try {
        const requestBody = {
          placeId: id, 
          rejectReason: rejectReason === null || rejectReason === undefined ? null : rejectReason.toString(),
          isApproved: placeStatus === "Approved", 
        };
    
        const response = await axiosInstance.post(
          'https://api.localtour.space/api/Place/sendMail',
          requestBody, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', 
            }
          }
        );
    
        if (response.status === 200) {
         return true;
        } 
          return false;
        
      } catch (error) {
        console.error('Error during API call:', error);
      }

}

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRejectReason(event.target.value); 
};


  return (
    <DashboardContent>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Iconify icon="eva:arrow-back-fill" />}  // Mũi tên quay lại
          onClick={() => navigate('/place')}  // Điều hướng về danh sách Places
        >
          Back to List
        </Button>
        <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}>
    Place Detail
  </Typography>
        {/* <Button
          variant="contained"
          color="secondary"
          startIcon={<Iconify icon="mingcute:edit-line" />}
        >
          Edit
        </Button> */}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {/* Card for Image */}
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <Box mb={2} display="flex" justifyContent="center">
              <img 
                src={place.photoDisplay} 
                alt={place.placeTranslations[0]?.name} 
                style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }} 
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          {/* Card for Place Information */}
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h5" mb={2}>{place.placeTranslations[0]?.name}</Typography>
            <Typography variant="body1" mb={2}>Address: {place.placeTranslations[0]?.address}</Typography>
            <Typography variant="body1" mb={2}>Description: {place.placeTranslations[0]?.description}</Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Opening Time: {place.timeOpen}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Closing Time: {place.timeClose}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Longitude: {place.longitude}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Latitude: {place.latitude}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Status: {place.status === 'Approved' ? 'Approved' : place.status === 'Rejected' ? 'Rejected' : 'Pending'}</Typography>
              </Grid>
            </Grid>

            {/* Show Approve/Reject buttons with disabled state */}
            <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleChangeStatus('Approved')}  // Approve
              disabled={place.status === 'Approved'} // Disable if already Approved
            >
              Approved
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleChangeStatus('Rejected')}  // Reject
              disabled={place.status === 'Rejected'} // Disable if already Rejected
            >
              Rejected
            </Button>
          </Box>

          </Card>

          <Dialog open={openDialog} 
          onClose={handleCloseDialog} 
          maxWidth="md" 
          fullWidth 
          >
                <DialogTitle>
                    Chụp Ảnh
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>


                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" onClick={capture}/>
                    <Button onClick={capture} variant="contained" sx={{mt:2}}>Capture</Button>
                    </Box>
                    <div className="image-list" style={{display:"flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {images.map((image, index) => (
                            <div key={index} className="image-item" style={{margin: "10px", position: "relative"}}>
                                <img src={image} alt={`Images ${index + 1}`} style={{maxWidth:"200px", maxHeight:"200px"}}/>
                                <IconButton aria-label="delete" onClick={()=>{
                                    setImages(images.filter((_, i) => i !== index))
                                }} style={{position: "absolute", top:"0", right:"0"}}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    {images.length > 0 && <Button onClick={handleUploadAll}>Upload</Button>}
                </DialogActions>
            </Dialog>
            <Dialog 
            open={openReject} 
            onClose={(event, reason) => {
              if (reason === 'backdropClick') return; 
              setOpenReject(false); 
            }}
            maxWidth="md" fullWidth
            >
                <DialogTitle>Reject</DialogTitle>
                <DialogContent>
                    <TextField
                         autoFocus
                         margin="dense"
                         id="rejectReason"
                         label="Reject Reason" 
                         type="text"
                         fullWidth
                         variant="standard"
                         value={rejectReason} 
                         onChange={handleInputChange} 
                         multiline 
                         rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Send</Button>
                </DialogActions>
            </Dialog>

          {/* Additional Translations */}
          {place.placeTranslations.length > 1 && (
            <Card sx={{ mt: 3, p: 3, boxShadow: 3 }}>
              <Typography variant="h6" mb={2}>Other Translations:</Typography>
              {place.placeTranslations.map((translation: any, index: number) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1">Name: {translation.name}</Typography>
                  <Typography variant="body1">Description: {translation.description}</Typography>
                  <Typography variant="body1">Address: {translation.address}</Typography>
                  <Typography variant="body1">Contact: {translation.contact}</Typography>
                </Box>
              ))}
            </Card>
          )}
        </Grid>
      </Grid>
      {place.placeActivities?.length > 0 && (
  <Box mt={4}>
    {/* Tiêu đề Place Activity */}
    <Typography variant="h5" mb={3}>
      Place Activity
    </Typography>

    {/* Danh sách các Activity */}
    <Grid container spacing={3}>
      {place.placeActivities.map((activity: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={activity.id}>
          {/* Card hiển thị thông tin Activity */}
          <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
            <Box position="relative" mb={2}>
              {/* Hình ảnh Activity */}
              <img
                src={activity.photoDisplay}
                alt={activity.placeActivityTranslations[0]?.activityName || "Activity"}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              {/* Badge SALE */}
              {activity.placeActivityTranslations[0]?.discount > 0 && (
                <Box
                  position="absolute"
                  top={8}
                  right={8}
                  bgcolor="error.main"
                  color="white"
                  px={1}
                  py={0.5}
                  borderRadius={1}
                  fontSize="12px"
                  fontWeight="bold"
                >
                  SALE
                </Box>
              )}
            </Box>

            {/* Tên Activity */}
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="center"
              mb={1}
            >
              {activity.placeActivityTranslations[0]?.activityName}
            </Typography>

            {/* Giá và thông tin bổ sung */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                {/* Giá Activity */}
                <Typography variant="subtitle1" color="text.secondary">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: activity.placeActivityTranslations[0]?.priceType || 'VND',
                  }).format(activity.placeActivityTranslations[0]?.price)}
                </Typography>
              </Box>

              {/* Trạng thái hoặc nút thêm */}
              <Button
                variant="outlined"
                size="small"
                color="primary"
              >
                View
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)}
    </DashboardContent>
  );
}
