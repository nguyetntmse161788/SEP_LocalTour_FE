import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

export function CancelView() {
    return (
        <SimpleLayout content={{ compact: true }}>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start', // Đưa nội dung lên trên
                    alignItems: 'center',
                    textAlign: 'center',
                    paddingTop: '10vh', // Thêm khoảng cách từ trên xuống
                }}
            >
                <Typography
                    variant="h1"
                    style={{
                        fontSize: '10rem',
                        lineHeight: 1,
                    }}
                >
                    Payment
                </Typography>
                <Typography
                    variant="h1"
                    style={{
                        fontSize: '15rem',
                        lineHeight: 1,
                    }}
                >
                    failed!
                </Typography>

                <Button
                    component={RouterLink}
                    href="/"
                    size="large"
                    variant="contained"
                    color="inherit"
                    sx={{
                        mt: 4, // Khoảng cách trên của nút
                    }}
                >
                    Back to list
                </Button>
            </Box>
        </SimpleLayout>
    );
}
