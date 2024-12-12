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
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  gender: 'Male' | 'Female' | 'Other';
  profilePictureUrl: string;
  role: string;
  roles: string[]; // Thêm role vào đối tượng UserProps
  endDate: Date;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  
  const navigate = useNavigate();

  const handleSetRole = async (userId: string, username: string, roles: string[]) => {
    console.log(row);
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
          username,
          roles,
          // role,
        },
      });
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      alert('Error fetching user profile. Please try again.');
    }
    console.log('Updated Roles:', roles);
    console.log("Roles from localStorage:", roles);

  };

  const handleUnbanUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('No token found. Please log in.');
        navigate('/sign-in');
        return;
      }
  
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
  
      if (decodedToken.exp < currentTime) {
        alert('Token has expired. Please log in again.');
        localStorage.removeItem('accessToken');
        navigate('/login');
        return;
      }
  
      // Construct the unban URL dynamically using the userId
      const url = `https://api.localtour.space/api/User/UnBan/${userId}`;
  
      // Log to verify the URL and token
      console.log('Unban URL:', url);
  
      // Send the unban request
      const response = await axios.post(url, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        alert('User has been unbanned successfully.');
        window.location.reload();
      } else {
        alert('Failed to unban user. Please try again.');
      }
    } catch (error) {
      console.error('Error unbanning user:', error);
      alert('Error unbanning user. Please try again.');
    }
  };
  
  const handleBanUser = async (userId: string, username: string, endDate: Date) => {
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
            username,
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
      <TableCell>{row.username}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.fullName}</TableCell>
      <TableCell>{row.phoneNumber}</TableCell>
      {/* <TableCell>{row.dateOfBirth}</TableCell>
      <TableCell>{row.address}</TableCell> */}
      <TableCell>{row.roles.join(', ')}</TableCell>
      <TableCell>
        <Button variant="outlined" color="primary" sx={{ margin: '0 5px' }} onClick={() => handleSetRole(row.id, row.username, row.roles)}>
          Set Role
        </Button>
        <Button
          variant="outlined" color="error" sx={{ margin: '0 5px' }} onClick={() => handleBanUser(row.id, row.username, row.endDate)}
        >
          Ban
        </Button>

        <Button
          variant="outlined"
          color="success"
          sx={{ margin: '0 5px' }}
          onClick={() => handleUnbanUser(row.id)} // Trigger unban on click
        >
          Unban
        </Button>
      </TableCell>
    </TableRow>
  );
}
