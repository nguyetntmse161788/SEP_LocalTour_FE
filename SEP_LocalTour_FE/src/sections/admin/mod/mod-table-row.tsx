import { TableRow, TableCell, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Chip, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

export type District = {
  id: number;  // ID của district
  name: string; // Tên district
};

export type ModProps = {
  fullName: string;
  id: string; // `id` là `userId` ở đây
  username: string;
  profilePictureUrl: string;
  districts: District[];
};

type ModTableRowProps = {
  row: ModProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function ModTableRow({ row, selected, onSelectRow }: ModTableRowProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [provinces, setProvinces] = useState<any[]>([]); // Store provinces
  const [districtList, setDistrictList] = useState<any[]>([]); // Store districts
  const [selectedProvince, setSelectedProvince] = useState<string>(''); // Selected province
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | string>(''); // Currently selected district ID
  const [selectedDistricts, setSelectedDistricts] = useState<District[]>([]); // To store selected districts
  const [managerPlaces, setManagerPlaces] = useState<District[]>([]);

  // Fetch provinces and districts
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://api.localtour.space/api/Address/Province');
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedProvince) return;
      try {
        const response = await axios.get(`https://api.localtour.space/api/Address/District?provinceI=${selectedProvince}`);
        setDistrictList(response.data);
      } catch (error) {
        console.error('Error fetching districts', error);
      }
    };

    fetchDistricts();
  }, [selectedProvince]);
  useEffect(() => {
    const fetchManagerDistricts = async () => {
      try {
        const response = await axios.get(`https://api.localtour.space/api/ModTag/UserTags/${row.id}`); // Assuming this endpoint returns districts the manager handles
        const cityTags = response.data.tags; // Assuming the response structure
        setManagerPlaces(cityTags.map((tag: { cityId: number; cityName: string }) => ({
          id: tag.cityId,
          name: tag.cityName
        })));
      } catch (error) {
        console.error('Error fetching manager\'s districts', error);
      }
    };

    if (row.id) {
      fetchManagerDistricts();
    }
  }, [row.id]);

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProvince('');
    setSelectedDistrictId('');
    setSelectedDistricts([]);
  };

  // Function to handle adding selected district to the list of selected districts
  const handleAddDistrict = () => {
    if (!selectedDistrictId) return;

    const districtToAdd = districtList.find(district => district.id === selectedDistrictId);
    if (districtToAdd) {
      setSelectedDistricts((prevSelectedDistricts) => [
        ...prevSelectedDistricts,
        { id: districtToAdd.id, name: districtToAdd.name }
      ]);
      setSelectedDistrictId(''); // Reset selected district after adding
    }
  };

  // Function to handle removing a district from the selected list
  const handleRemoveDistrict = (districtId: number) => {
    setSelectedDistricts(selectedDistricts.filter(district => district.id !== districtId));
  };

  const handleSubmitDistricts = async () => {
    try {
      const formData = new FormData();

      // Add each selected district's districtId to the FormData
      selectedDistricts.forEach(district => {
        formData.append('TagIds[]', district.id.toString()); // Only append the districtId
      });

      // Send the form data via POST request
      const response = await axios.put(
        `https://api.localtour.space/api/ModTag/${row.id}`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        }
      );

      console.log('Districts assigned successfully', response.data);
      setOpenDialog(false); // Close dialog after submission
      const fetchManagerDistricts = async () => {
        try {
          const response = await axios.get(`https://api.localtour.space/api/ModTag/UserTags/${row.id}`);
          const cityTags = response.data.tags;
          setManagerPlaces(cityTags.map((tag: { cityId: number; cityName: string }) => ({
            id: tag.cityId,
            name: tag.cityName
          })));
        } catch (error) {
          console.error('Error fetching manager\'s districts', error);
        }
      };
  
      fetchManagerDistricts();
    } catch (error) {
      console.error('Error assigning districts', error);
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
          {/* Display Manager's Places (districts) */}
          {managerPlaces.length > 0 ? (
            managerPlaces.map((district) => (
              <Chip key={district.id} label={district.name} color="primary" sx={{ marginRight: 1 }} />
            ))
          ) : (
            'N/A'
          )}
        </TableCell>
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

      {/* Dialog for specifying districts */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Enter Districts</DialogTitle>
        <DialogContent>
          {/* Render selected districts as chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedDistricts.map(district => (
              <Chip
                key={district.id}
                label={district.name}
                onDelete={() => handleRemoveDistrict(district.id)}
                color="primary"
              />
            ))}
          </Box>

          {/* Province Selection */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Province</InputLabel>
            <Select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              label="Province"
            >
              {provinces.map((province) => (
                <MenuItem key={province.id} value={province.id}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* District Selection */}
          {selectedProvince && (
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel>District</InputLabel>
              <Select
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                label="District"
              >
                {districtList.length > 0 ? (
                  districtList.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No options</MenuItem>
                )}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddDistrict} color="primary" disabled={!selectedDistrictId}>
            Add District
          </Button>
          <Button onClick={handleSubmitDistricts} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
