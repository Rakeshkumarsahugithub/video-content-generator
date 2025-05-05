import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const PreviewModal = ({ open, onClose, idea, script, onSave }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '800px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <Typography variant="h5" gutterBottom>
          {idea?.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {idea?.description}
        </Typography>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Tags: {idea?.tags?.join(', ')}
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Script Preview
        </Typography>
        <Box sx={{ 
          p: 2, 
          border: '1px solid #eee', 
          borderRadius: 1,
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <ReactMarkdown>{script}</ReactMarkdown>
        </Box>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" onClick={onSave}>
            Save Content
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PreviewModal;