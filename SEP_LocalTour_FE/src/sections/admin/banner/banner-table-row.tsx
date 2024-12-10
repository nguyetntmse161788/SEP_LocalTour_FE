import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

export type BannerProps = {
  id: string;
  bannerName: string;
  bannerUrl: string;
  authorId: string;
  authorName: string;
  createdDate: string;
  updatedDate: string;
  bannerHistories: any[];
};

type BannerTableRowProps = {
  row: BannerProps;
  selected: boolean;
  onSelectRow: () => void;
};
export function BannerTableRow({ row, selected, onSelectRow }: BannerTableRowProps) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/admin/bannerUser/${row.id}`, { state: { banner: row } }); 
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell>{row.bannerName}</TableCell>
      <TableCell>
        <img
          alt={`Banner of ${row.bannerName}`}
          src={row.bannerUrl}
          style={{ width: '300px', height: '50px', objectFit: 'cover' }}
        />
      </TableCell>
      <TableCell>{row.authorName}</TableCell>
      <TableCell>{new Date(row.createdDate).toLocaleString()}</TableCell>
      <TableCell>{new Date(row.updatedDate).toLocaleString()}</TableCell>
      <TableCell>
        {/* Nút View Detail */}
        <Button variant="outlined" color="primary" onClick={handleViewDetail}>
          View Detail
        </Button>
      </TableCell>
    </TableRow>
  );
}
