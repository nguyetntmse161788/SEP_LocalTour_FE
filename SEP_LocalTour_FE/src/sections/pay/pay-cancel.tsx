import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';
import { RouterLink } from 'src/routes/components';
import { SimpleLayout } from 'src/layouts/simple';
import { toast } from 'react-toastify';
export function CancelView() {
    React.useEffect(() => {
        const channel = new BroadcastChannel('payment-status');
        const paymentData = JSON.parse(localStorage.getItem('paymentData') || '{}');
        const placeId = paymentData.placeIdToPay;
        const placeName = paymentData.placeNameToPay;
        // Gửi thông điệp hủy qua BroadcastChannel
        channel.postMessage({ status: 'cancel', 
            placeId: placeId,
            placeName: placeName,
            timestamp: Date.now(), });
        
        // Hiển thị thông báo hủy
        toast.error('Payment has been canceled!', {
            position: 'top-right',
            autoClose: 5000,
        });
        window.close();
        localStorage.removeItem('paymentData');
        return () => channel.close(); // Đóng channel khi component unmount

    }, []);

    return null; // Không hiển thị giao diện
}