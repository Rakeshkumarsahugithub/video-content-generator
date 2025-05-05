import React from 'react';
import { Box, Typography, Paper, Avatar, Grid } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const combinedPlatform = {
  id: 'combined',
  name: 'YouTube Shorts & Instagram Reels',
  icons: [
    <YouTubeIcon fontSize="large" color="error" key="youtube" />,
    <InstagramIcon fontSize="large" sx={{ color: '#E1306C' }} key="instagram" />
  ],
};

const PlatformSelector = ({ onSelect }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Platform
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
            onClick={() => onSelect(combinedPlatform.id)}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* Icons displayed side by side with padding */}
              <Box display="flex" justifyContent="center" gap={3} mb={2}>
                {/* YouTube Icon */}
                <Avatar
                  sx={{
                    bgcolor: 'transparent',
                    width: 56,
                    height: 56,
                    border: '2px solid #FF0000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {combinedPlatform.icons[0]}
                </Avatar>
                {/* Instagram Icon */}
                <Avatar
                  sx={{
                    bgcolor: 'transparent',
                    width: 56,
                    height: 56,
                    border: '2px solid #E1306C',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {combinedPlatform.icons[1]}
                </Avatar>
              </Box>
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600 }}>
                {combinedPlatform.name}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlatformSelector;
