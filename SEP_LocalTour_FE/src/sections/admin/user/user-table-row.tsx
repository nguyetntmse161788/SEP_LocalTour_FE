import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { TableCell } from '@mui/material';
import { useEffect, useState } from 'react';

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
  roles: string[];
  endDate: Date;
};

type UserTableRowProps = {
  key: string; // Make sure to include the key property if it's required
  row: UserProps;
  isBanned: boolean; // Add isBanned to the props type
  setBannedUsers: React.Dispatch<React.SetStateAction<string[]>>;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({
  row,
  setBannedUsers,
  selected,
  onSelectRow,
}: UserTableRowProps) {
  const navigate = useNavigate();
  const [isBanned, setIsBanned] = useState<boolean>(false);

  // Validate token
  const validateToken = (): string | null => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('No token found. Please log in.');
      navigate('/sign-in');
      return null;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      alert('Token has expired. Please log in again.');
      localStorage.removeItem('accessToken');
      navigate('/login');
      return null;
    }

    return token;
  };

  // Fetch the list of banned users and check if the current user is banned
  useEffect(() => {
    const fetchBannedUsers = async () => {
      const token = validateToken();
      if (!token) return;

      try {
        const response = await axios.get('https://api.localtour.space/api/User/getUserBan', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bannedUsers = response.data; // Assuming response is an array of banned user IDs
        console.log('Banned Users:', bannedUsers); // Debugging line

        if (bannedUsers.includes(row.id)) {
          setIsBanned(true);
        } else {
          setIsBanned(false);
        }
      } catch (error) {
        console.error('Error fetching banned users:', error);
        alert('Error fetching banned users. Please try again.');
      }
    };

    fetchBannedUsers();
  }, [row.id]); // Re-run when the row.id changes

  // Handle unban user
  const handleUnbanUser = async (userId: string) => {
    const token = validateToken();
    if (!token) return;

    try {
      const response = await axios.post(
        `https://api.localtour.space/api/User/UnBan/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert('User has been unbanned successfully.');
        setIsBanned(false);
        setBannedUsers((prev: string[]) => prev.filter((userId) => userId !== userId));
      } else {
        alert('Failed to unban user. Please try again.');
      }
    } catch (error) {
      console.error('Error unbanning user:', error);
      alert('Error unbanning user. Please try again.');
    }
  };
  const handleBanUser = async (userId: string, username: string, endDate: Date) => {
    const token = validateToken();
    if (!token) return;

    console.log('Banning user with ID:', userId); // Debugging line

    try {
      const response = await axios.get(`https://api.localtour.space/api/User/getProfile?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const userProfile = response.data;
        navigate('/admin/ban', { state: { user: userProfile, userId, username, endDate } });
        console.log('Navigating to ban user:', userProfile); // Debugging line
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
      <TableCell>
        <Avatar alt={row.fullName} src={row.profilePictureUrl} />
      </TableCell>
      <TableCell>{row.username}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.fullName}</TableCell>
      <TableCell>{row.phoneNumber}</TableCell>
      <TableCell>{row.roles.join(', ')}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="primary"
          sx={{ margin: '0 5px' }}
          onClick={() => navigate('/admin/role', { state: { user: row, userId: row.id, roles: row.roles } })}
        >
          Set Role
        </Button>

        {isBanned ? (
          <Button
            variant="outlined"
            color="success"
            sx={{ margin: '0 5px' }}
            onClick={() => handleUnbanUser(row.id)}
          >
            Unban
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="error"
            sx={{ margin: '0 5px' }}
            onClick={() => handleBanUser(row.id, row.username, row.endDate)}
          >
            Ban
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
