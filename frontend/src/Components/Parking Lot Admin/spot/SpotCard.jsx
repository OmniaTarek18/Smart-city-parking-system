import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  LocalParking, 
  AccessibleForward, 
  EvStation,
  MoreVert,
  Edit,
  Delete
} from '@mui/icons-material';
import { green, orange, red, grey } from '@mui/material/colors';
import SpotEditDialog from './SpotEditDialog';

const SpotCard = ({ spot, onStatusChange, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE': return green[500];
      case 'RESERVED': return orange[500];
      case 'OCCUPIED': return red[500];
      default: return green[500];
    }
  };

  const getSpotIcon = (type) => {
    switch (type) {
      case 'REGULAR': return <LocalParking />;
      case 'HANDICAP': return <AccessibleForward />;
      case 'EV': return <EvStation />;
      default: return <LocalParking />;
    }
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleMenuClose();
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    onDelete(spot.id);
  };

  return (
    <>
      <Card 
        sx={{ 
          width: 120,
          height: 120,
          m: 1,
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)'
          },
          border: 2,
          borderColor: getStatusColor(spot.status)
        }}
      >
        <IconButton
          size="small"
          sx={{ position: 'absolute', top: 4, right: 4 }}
          onClick={handleMenuClick}
        >
          <MoreVert />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick}>
            <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
        </Menu>

        <CardContent sx={{ p: 2, textAlign: 'center' }}>
          <Tooltip title={`Status: ${spot.status}`}>
            <Box>
              <IconButton 
                sx={{ 
                  backgroundColor: getStatusColor(spot.status),
                  color: 'white',
                  '&:hover': {
                    backgroundColor: getStatusColor(spot.status)
                  }
                }}
              >
                {getSpotIcon(spot.type)}
              </IconButton>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {spot.id}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {spot.status}
              </Typography>
            </Box>
          </Tooltip>
        </CardContent>
      </Card>

      <SpotEditDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        spot={spot}
        onUpdate={onEdit}
      />
    </>
  );
};

export default SpotCard;