import { TableRow, TableCell, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Chip, Box } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export type Tag = {
  cityId: number;  // ID của thành phố
  cityName: string; // Tên thành phố
};

export type ModProps = {
  fullName: string;
  id: string; // `id` là `userId` ở đây
  username: string;
  profilePictureUrl: string;
  tags: Tag[];
};

type ModTableRowProps = {
  row: ModProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function ModTableRow({ row, selected, onSelectRow }: ModTableRowProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [tagInput, setTagInput] = useState(''); // To store the input from user
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]); // To store selected tags

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle adding a tag to the list of selected tags
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setSelectedTags([...selectedTags, { cityId: Date.now(), cityName: tagInput }]); // Use Date.now() as a placeholder for cityId
      setTagInput(''); // Reset input field
    }
  };

  // Function to handle removing a tag from the selected tags
  const handleRemoveTag = (cityId: number) => {
    setSelectedTags(selectedTags.filter(tag => tag.cityId !== cityId));
  };

  const handleSubmitTags = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', row.id);
      selectedTags.forEach(tag => {
        formData.append('tags[]', JSON.stringify(tag)); 
      });

      // Send the form data via POST request
      const response = await axios.post(
        `https://api.localtour.space/api/ModTag`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        }
      );

      console.log('Tags assigned successfully', response.data);
      setOpenDialog(false); // Close dialog after submission
    } catch (error) {
      console.error('Error assigning tags', error);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} onClick={onSelectRow}>
        <TableCell>
          <Avatar alt={row.username} src={row.profilePictureUrl || ''} />
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.fullName}</TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="success"
            sx={{ margin: '0 5px' }}
            onClick={handleOpenDialog} // Open the dialog when clicked
          >
            Specify Place
          </Button>
        </TableCell>
      </TableRow>

      {/* Dialog for specifying tags */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Enter Tags</DialogTitle>
        <DialogContent>
          {/* Render selected tags as chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedTags.map(tag => (
              <Chip
                key={tag.cityId}
                label={tag.cityName}
                onDelete={() => handleRemoveTag(tag.cityId)}
                color="primary"
              />
            ))}
          </Box>

          {/* Input field for entering tags */}
          <TextField
            label="Enter Tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            fullWidth
            sx={{ marginTop: 2 }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTag(); // Add tag when pressing Enter
              }
            }}
          />

          {/* Button to add tag */}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleAddTag} // Add the tag when clicked
          >
            Add Tag
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitTags} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
