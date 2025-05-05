
import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  LightbulbOutlined,
  ExpandMore,
  ExpandLess,
  HelpOutline,
  AutoAwesome
} from '@mui/icons-material';

const IdeaForm = () => {
  const { generateIdeas, isLoading, error, setError } = useContent();
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState({
    style: '',
    tone: '',
    duration: '',
    creativity: 'medium'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      await generateIdeas(prompt, options);
    } catch (err) {
      console.error('Generation error:', err);
    }
  };

  const handleOptionChange = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.value
    });
  };

  const handlePromptChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    setCharacterCount(value.length);
  };

  const presetPrompts = [
    "How to start a YouTube channel",
    "Tech product reviews",
    "Cooking tutorials for beginners",
    "Fitness routines at home",
    "Travel vlogging tips"
  ];

  return (
    <Paper elevation={3} sx={{ 
      p: 3,
      borderRadius: 3,
      background: 'linear-gradient(to bottom right, #f5f7fa, #ffffff)'
    }}>
      <Box display="flex" alignItems="center" mb={2}>
        <LightbulbOutlined color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Video Idea Generator
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" mb={3}>
        Generate creative video content ideas tailored to your needs. 
        Fill in your topic and customize the options below.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error.message || 'Failed to generate ideas. Please try again.'}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Describe your video topic"
          variant="outlined"
          value={prompt}
          onChange={handlePromptChange}
          margin="normal"
          required
          multiline
          rows={3}
          placeholder="e.g., 'Easy vegan recipes for busy professionals'"
          InputProps={{
            endAdornment: (
              <Typography 
                variant="caption" 
                color={characterCount > 300 ? 'error' : 'text.secondary'}
                sx={{ position: 'absolute', right: 10, bottom: 10 }}
              >
                {characterCount}/300
              </Typography>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: '#f9fafc'
            }
          }}
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Quick ideas: {presetPrompts.map((text, i) => (
              <Chip
                key={i}
                label={text}
                size="small"
                onClick={() => setPrompt(text)}
                sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
              />
            ))}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Button
            size="small"
            startIcon={showAdvanced ? <ExpandLess /> : <ExpandMore />}
            onClick={() => setShowAdvanced(!showAdvanced)}
            sx={{ textTransform: 'none' }}
          >
            {showAdvanced ? 'Hide advanced options' : 'Show advanced options'}
          </Button>
        </Box>

        <Collapse in={showAdvanced}>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth sx={{ minWidth: 100 }}>
                <InputLabel>Content Style</InputLabel>
                <Select
                  name="style"
                  value={options.style}
                  onChange={handleOptionChange}
                  label="Content Style"
                >
                  <MenuItem value="">Any style</MenuItem>
                  <MenuItem value="Educational">Educational</MenuItem>
                  <MenuItem value="Entertaining">Entertaining</MenuItem>
                  <MenuItem value="Documentary">Documentary</MenuItem>
                  <MenuItem value="Animation">Animation</MenuItem>
                  <MenuItem value="Tutorial">Step-by-step Tutorial</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth sx={{ minWidth: 100 }}>
                <InputLabel>Tone</InputLabel>
                <Select
                  name="tone"
                  value={options.tone}
                  onChange={handleOptionChange}
                  label="Tone"
                >
                  <MenuItem value="">Any tone</MenuItem>
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Casual">Casual/Friendly</MenuItem>
                  <MenuItem value="Humorous">Humorous</MenuItem>
                  <MenuItem value="Inspirational">Inspirational</MenuItem>
                  <MenuItem value="Authoritative">Authoritative</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth sx={{ minWidth: 100 }}>
                <InputLabel>Duration</InputLabel>
                <Select
                  name="duration"
                  value={options.duration}
                  onChange={handleOptionChange}
                  label="Duration"
                >
                  <MenuItem value="">Any length</MenuItem>
                  <MenuItem value="30">Short (30 sec)</MenuItem>
                  <MenuItem value="60">Medium (1 min)</MenuItem>
                  <MenuItem value="180">Long (3 min)</MenuItem>
                  <MenuItem value="300">Extended (5 min)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>
                  <Box display="flex" alignItems="center">
                    Creativity
                    <Tooltip title="Controls how creative/unpredictable the ideas will be">
                      <HelpOutline fontSize="small" sx={{ ml: 0.5 }} />
                    </Tooltip>
                  </Box>
                </InputLabel>
                <Select
                  name="creativity"
                  value={options.creativity}
                  onChange={handleOptionChange}
                  label="Creativity"
                >
                  <MenuItem value="low">Low (More Predictable)</MenuItem>
                  <MenuItem value="medium">Medium (Balanced)</MenuItem>
                  <MenuItem value="high">High (More Creative)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Collapse>
        
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isLoading || !prompt.trim() || characterCount > 300}
            startIcon={isLoading ? <CircularProgress size={20} /> : <AutoAwesome />}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            {isLoading ? 'Generating Ideas...' : 'Generate Ideas'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default IdeaForm;