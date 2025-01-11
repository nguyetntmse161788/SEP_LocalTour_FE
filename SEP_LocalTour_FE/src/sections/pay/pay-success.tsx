import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import React from 'react';
import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

export function SuccessView() {
    React.useEffect(() => {
        const channel = new BroadcastChannel('payment-status');
        const paymentData = JSON.parse(localStorage.getItem('paymentData') || '{}');
        const placeId = paymentData.placeIdToPay;
        const placeName = paymentData.placeNameToPay;
        channel.postMessage({ status: 'success', 
            placeId: placeId,
            placeName: placeName,
            timestamp: Date.now(), });
            localStorage.removeItem('paymentData');
        return () => channel.close(); 
    }, []);
    return null;
}
