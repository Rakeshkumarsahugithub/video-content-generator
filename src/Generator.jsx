import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import IdeaForm from './IdeaForm';
import ScriptPreview from './ScriptPreview';

const Generator = () => {
  const { 
    generatedIdeas = [], 
    script, 
    isLoading, 
    error, 
    generateIdeas, 
    generateScriptForIdea, 
    saveContent,
    setError
  } = useContent();
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const handleGenerateScript = async (idea) => {
    try {
      await generateScriptForIdea(idea);
      setSelectedIdea(idea);
      setPreviewOpen(true);
    } catch (err) {
      setError('Failed to generate script');
    }
  };

  const handleSaveContent = () => {
    const savedContent = saveContent({
      ...selectedIdea,
      script
    });
    setPreviewOpen(false);
    return savedContent;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Content Generator
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <IdeaForm generateIdeas={generateIdeas} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Generated Ideas
            </Typography>
            
            {isLoading && generatedIdeas.length === 0 ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                <CircularProgress />
              </Box>
            ) : generatedIdeas.length > 0 ? (
              <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                {generatedIdeas.map((idea, index) => (
                  <Paper 
                    key={index} 
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                    onClick={() => handleGenerateScript(idea)}
                  >
                    <Typography variant="subtitle1">{idea.title}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {idea.description}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {idea.tags?.map((tag, i) => (
                        <Chip key={i} label={tag} size="small" sx={{ mr: 1 }} />
                      ))}
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No ideas generated yet. Enter a prompt to get started.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <ScriptPreview
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        idea={selectedIdea}
        script={script}
        onSave={handleSaveContent}
      />
    </Box>
  );
};

export default Generator;