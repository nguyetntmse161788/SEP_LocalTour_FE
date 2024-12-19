import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';

import { RouterLink } from 'src/routes/components';
import { SimpleLayout } from 'src/layouts/simple';

export function CancelView() {
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
                        color: 'red',
                    }}
                >
                    Payment
                </Typography>
                <Typography
                    variant="h1"
                    style={{
                        fontSize: '15rem',
                        lineHeight: 1,
                        color: 'red',
                    }}
                >
                    failed!
                </Typography>
                <CancelIcon
                    sx={{
                        fontSize: '10rem',
                        color: 'red',
                        mt: 2,
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
