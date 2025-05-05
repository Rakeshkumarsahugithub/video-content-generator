import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Button, CardActions } from '@mui/material';
import { format } from 'date-fns';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const statusColors = {
  draft: 'default',
  published: 'success',
  failed: 'error'
};

const ContentCard = ({ content, onPublish }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{content.title}</Typography>
          <Chip 
            label={content.status} 
            size="small" 
            color={statusColors[content.status] || 'default'}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {format(new Date(content.createdAt), 'MMM d, yyyy - h:mm a')}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1.5 }}>
          {content.description}
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          {content.tags?.map((tag, index) => (
            <Chip key={index} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {content.status === 'draft' && (
          <>
            <Button 
              size="small" 
              startIcon={<YouTubeIcon />}
              onClick={() => onPublish(content, 'youtube')}
            >
              YouTube
            </Button>
            <Button 
              size="small" 
              startIcon={<InstagramIcon />}
              onClick={() => onPublish(content, 'instagram')}
            >
              Instagram
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ContentCard;