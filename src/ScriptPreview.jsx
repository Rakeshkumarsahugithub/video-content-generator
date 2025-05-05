import { React, useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box,
  Chip,
  IconButton,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';

const ScriptPreview = ({ open, onClose, idea, script, onSave }) => {
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const contentToSave = {
      ...idea,
      notes,
      script
    };
    onSave(contentToSave);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Script Preview
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          {idea?.title}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {idea?.description}
        </Typography>
        
        <Box mb={2}>
          {idea?.tags?.map((tag, i) => (
            <Chip key={i} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Script Content
        </Typography>
        
        <Box 
          sx={{ 
            p: 2, 
            border: '1px solid #eee', 
            borderRadius: 1,
            maxHeight: '400px',
            overflowY: 'auto',
            mb: 3
          }}
        >
          <ReactMarkdown>{script}</ReactMarkdown>
        </Box>
        
        <TextField
          fullWidth
          label="Add notes (optional)"
          multiline
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Save to Drafts
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScriptPreview;