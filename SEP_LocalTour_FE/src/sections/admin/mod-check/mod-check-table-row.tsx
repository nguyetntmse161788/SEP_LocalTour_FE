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

export type ModCheckProps = {
  modId: string;
  modName: string;
  placeId: string;
  placeTranslations: {
    id: number;
    placeId: number;
    languageCode: string;
    name: string;
    description: string;
    address: string;
    contact: string;
  }[];
  placeMediums: {
    id: number;
    placeId: number;
    type: string;
    url: string;
    createDate: string;
  }[];
  modeCheckImages: string[];
};

type ModCheckTableRowProps = {
  row: ModCheckProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function ModCheckTableRow({ row, selected, onSelectRow }: ModCheckTableRowProps) {
  
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Điều hướng đến trang chi tiết với `modId`
    console.log("Navigating with data:", row);
    navigate(`/admin/modcheck/${row.placeId}`, { state: { detail: row } });
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected} onClick={onSelectRow} sx={{ borderBottom: '2px solid rgb(207, 205, 205)' }}>
      {/* <TableCell>{row.Id}</TableCell> */}
      <TableCell>{row.modId}</TableCell>
      <TableCell>{row.modName}</TableCell>
      <TableCell>{row.placeId}</TableCell>
      <TableCell>
        {row.placeTranslations[0]?.name || 'No translation available'}
      </TableCell>
      <TableCell>
        {row.placeMediums.length > 0 && (
          <img
            src={row.placeMediums[0].url}
            alt="Place Medium"
            style={{ width: '150px', height: '85px', margin: '5px' ,  borderRadius: '7px' }}
          />
        )}
      </TableCell>
      <TableCell>
        {row.modeCheckImages.length > 0 && (
          <img
            src={row.modeCheckImages[0]}
            alt="Mode Check Image"
            style={{ width: '150px', height: '75px', margin: '5px', borderRadius: '7px' }}
          />
        )}
      </TableCell>
      <TableCell>
        <IconButton onClick={handleViewDetails}>
          <Iconify icon="mdi:book-open-page-variant" width={24} height={24} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}