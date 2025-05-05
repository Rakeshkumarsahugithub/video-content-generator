import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { Box, Typography, Paper, Tabs, Tab, TextField } from '@mui/material';
import ContentCard from './ContentCard';

const Dashboard = () => {
  const { contentHistory } = useContent();
  const [tabValue, setTabValue] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = contentHistory.filter(content => {
    const matchesTab = tabValue === 'all' || content.status === tabValue;
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Content Dashboard
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tabs 
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ mb: -1 }}
          >
            <Tab label="All" value="all" />
            <Tab label="Drafts" value="draft" />
            <Tab label="Published" value="published" />
            <Tab label="Failed" value="failed" />
          </Tabs>
          
          <TextField
            label="Search content"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Paper>
      
      {filteredContent.length > 0 ? (
        filteredContent.map(content => (
          <ContentCard 
            key={content.id} 
            content={content} 
            onPublish={(content, platform) => {
              // This would navigate to publisher with preselected content
              alert(`Would publish ${content.title} to ${platform}`);
            }}
          />
        ))
      ) : (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No content found matching your criteria
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Dashboard;