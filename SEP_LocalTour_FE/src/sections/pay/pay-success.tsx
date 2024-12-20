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
        channel.postMessage({ payment: 'success', timestamp: Date.now() });
        return () => channel.close(); 
    }, []);
    return (
        <SimpleLayout content={{ compact: true }}>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >

                <Typography
                    variant="h1"
                    style={{
                        fontSize: '10rem',
                        lineHeight: 1,
                        color: 'green',
                    }}
                >
                    Payment
                </Typography>
                <Typography
                    variant="h1"
                    style={{
                        fontSize: '15rem',
                        lineHeight: 1,
                        color: 'green', 
                    }}
                >
                    success!
                </Typography>

                <CheckCircleIcon
                    sx={{
                        fontSize: '10rem',
                        color: 'green',
                    }}
                />

                <Button
                    component={RouterLink}
                    href="/"
                    size="large"
                    variant="contained"
                    color="inherit"
                    sx={{
                        mt: 4,
                    }}
                >
                    Back to list
                </Button>
            </Box>
        </SimpleLayout>
    );
}
