import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import { TableCell } from '@mui/material';

export type UserProps = {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  userName: string;
  dateOfBirth: string;
  address: string;
  gender: 'Male' | 'Female' | 'Other';
  profilePictureUrl: string;
  role: string;
  endDate: Date;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const navigate = useNavigate();

  const handleSetRole = async (userId: string, userName: string, role: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('No token found. Please log in.');
        navigate('/sign-in');
        return;
      }

      // Decode token and check expiration
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        alert('Token has expired. Please log in again.');
        localStorage.removeItem('accessToken');
        navigate('/login');
        return;
      }

      // Proceed with fetching user profile
      const response = await axios.get(`https://api.localtour.space/api/User/getProfile?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userProfile = response.data;
      navigate('/admin/role', {
        state: {
          user: userProfile,
          userId,
          userName,
          role,
        },
      });
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      alert('Error fetching user profile. Please try again.');
    }
  };

  const handleBanUser = async (userId: string, userName: string, endDate: Date) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('No token found. Please log in.');
        navigate('/sign-in');
        return;
      }

      // Decode token và kiểm tra thời hạn
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      const currentTime = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại (seconds)

      if (decodedToken.exp < currentTime) {
        alert('Token has expired. Please log in again.');
        localStorage.removeItem('accessToken'); // Xóa token hết hạn
        navigate('/sign-in');
        return;
      }

      // Gọi API để kiểm tra user trước khi điều hướng
      const response = await axios.get(`https://api.localtour.space/api/User/getProfile?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userProfile = response.data;

        // Điều hướng đến trang ban user
        navigate('/admin/ban', {
          state: {
            user: userProfile,
            userId,
            userName,
            endDate,
          },
        });
      } else {
        alert('User profile not found. Please try again.');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      alert('Error fetching user profile. Please try again.');
    }
  };


  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      {/* <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
      </TableCell> */}

      <TableCell>
        <Avatar alt={row.fullName} src={row.profilePictureUrl} />
      </TableCell>

      {/* <TableCell>{row.id}</TableCell> */}
      <TableCell>{row.userName}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.fullName}</TableCell>
      <TableCell>{row.phoneNumber}</TableCell>
      <TableCell>{row.dateOfBirth}</TableCell>
      <TableCell>{row.address}</TableCell>

      <TableCell>
        {/* <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
        
        {/* <Button
          variant="outlined"
          color="primary"
          sx={{ margin: '0 5px' }}
          onClick={() => navigate('/admin/updateUser', { state: { user: row } })}
        >
          Update Profile
        </Button> */}

        <Button variant="outlined" color="primary" sx={{ margin: '0 5px' }} onClick={() => handleSetRole(row.id, row.userName, row.role)}>
          Set Role
        </Button>
        <Button
          variant="outlined" color="error" sx={{ margin: '0 5px' }} onClick={() => handleBanUser(row.id, row.userName, row.endDate)}
        >
          Ban
        </Button>

      </TableCell>
    </TableRow>
  );
}
