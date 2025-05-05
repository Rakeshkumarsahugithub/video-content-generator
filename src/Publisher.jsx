// import React, { useState } from 'react';
// import { useContent } from '../hooks/useContent';
// import { publishToYouTube, publishToInstagram } from '../api/socialMediaService';
// import { Box, Typography, Paper, Snackbar, Alert, Button } from '@mui/material'; // Import Button here
// import PlatformSelector from './PlatformSelector';
// import PublishForm from './PublishForm';
// import Loader from './Loader';

// const Publisher = () => {
//   const { contentHistory, updateContentStatus } = useContent();
//   const [selectedPlatform, setSelectedPlatform] = useState(null);
//   const [selectedContent, setSelectedContent] = useState(null);
//   const [isPublishing, setIsPublishing] = useState(false);
//   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

//   const handlePublish = async (formData) => {
//     setIsPublishing(true);
//     try {
//       let response;
//       if (selectedPlatform === 'youtube') {
//         response = await publishToYouTube(formData);
//       } else if (selectedPlatform === 'instagram') {
//         response = await publishToInstagram(formData);
//       }
      
//       updateContentStatus(selectedContent.id, 'published');
//       setNotification({
//         open: true,
//         message: `Successfully published to ${selectedPlatform === 'youtube' ? 'YouTube' : 'Instagram'}`,
//         severity: 'success'
//       });
//       resetSelection();
//     } catch (error) {
//       updateContentStatus(selectedContent.id, 'failed');
//       setNotification({
//         open: true,
//         message: `Failed to publish: ${error.message}`,
//         severity: 'error'
//       });
//     } finally {
//       setIsPublishing(false);
//     }
//   };

//   const resetSelection = () => {
//     setSelectedPlatform(null);
//     setSelectedContent(null);
//   };

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Social Media Publisher
//       </Typography>
      
//       {isPublishing && <Loader />}
      
//       {!selectedPlatform ? (
//         <PlatformSelector onSelect={setSelectedPlatform} />
//       ) : !selectedContent ? (
//         <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Select Content to Publish
//           </Typography>
//           <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
//             {contentHistory.filter(c => c.status === 'draft').length > 0 ? (
//               contentHistory
//                 .filter(c => c.status === 'draft')
//                 .map(content => (
//                   <Paper 
//                     key={content.id}
//                     sx={{ 
//                       p: 2, 
//                       mb: 2, 
//                       cursor: 'pointer',
//                       '&:hover': {
//                         backgroundColor: 'action.hover'
//                       }
//                     }}
//                     onClick={() => setSelectedContent(content)}
//                   >
//                     <Typography variant="subtitle1">{content.title}</Typography>
//                     <Typography variant="body2" sx={{ mt: 1 }}>
//                       {content.description}
//                     </Typography>
//                   </Paper>
//                 ))
//             ) : (
//               <Typography variant="body1" color="text.secondary">
//                 No draft content available. Generate some content first.
//               </Typography>
//             )}
//           </Box>
//           <Box mt={2} display="flex" justifyContent="flex-end">
//             <Button variant="outlined" onClick={resetSelection}> {/* Button component here */}
//               Back
//             </Button>
//           </Box>
//         </Paper>
//       ) : (
//         <PublishForm
//           content={selectedContent}
//           platform={selectedPlatform}
//           onPublish={handlePublish}
//           onCancel={resetSelection}
//         />
//       )}
      
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//       >
//         <Alert 
//           onClose={handleCloseNotification} 
//           severity={notification.severity}
//           sx={{ width: '100%' }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Publisher;

import React, { useState, lazy, Suspense } from 'react';
import { useContent } from '../hooks/useContent';
import { 
  Box, 
  Typography, 
  Paper, 
  Snackbar, 
  Alert, 
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
const PlatformSelector = lazy(() => import('./PlatformSelector'));
const PublishForm = lazy(() => import('./PublishForm'));
const ContentSelector = lazy(() => import('./ContentSelector'));

const Publisher = () => {
  const { 
    contentHistory, 
    updateContentStatus 
  } = useContent();
  
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success',
    actionUrl: null
  });
  const [activeTab, setActiveTab] = useState('drafts');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [publishData, setPublishData] = useState(null);

  const handlePublish = async (data) => {
    if (!data?.content?.id) {
      setNotification({
        open: true,
        message: 'Invalid content data',
        severity: 'error'
      });
      return;
    }
    setPublishData(data);
    setConfirmOpen(true);
  };

  const confirmPublish = async () => {
    setConfirmOpen(false);
    setIsPublishing(true);
    
    try {
      if (!publishData?.content?.id) {
        throw new Error('Invalid content data');
      }

      // Mock response for demo
      const mockResponse = {
        data: {
          url: `https://${publishData.platform}.com/${Math.random().toString(36).substring(7)}`,
          id: `mock_${Date.now()}`
        }
      };
      
      updateContentStatus(
        publishData.content.id, 
        'published',
        publishData.platform,
        null,
        mockResponse.data.url
      );
      
      setNotification({
        open: true,
        message: `Successfully published to ${publishData.platform === 'youtube' ? 'YouTube' : 'Instagram'}`,
        severity: 'success',
        actionUrl: mockResponse.data.url
      });
      
      resetSelection();
    } catch (error) {
      updateContentStatus(
        publishData?.content?.id || '', 
        'failed',
        null,
        error
      );
      
      setNotification({
        open: true,
        message: error.message || `Failed to publish to ${publishData?.platform}`,
        severity: 'error'
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const resetSelection = () => {
    setSelectedPlatform(null);
    setSelectedContent(null);
  };

  const filteredContent = contentHistory.filter(content => {
    if (activeTab === 'drafts') return content.status === 'draft';
    if (activeTab === 'published') return content.status === 'published';
    if (activeTab === 'failed') return content.status === 'failed';
    return true;
  });

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Content Publisher
      </Typography>
      
      {isPublishing && (
        <Box sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6">
              Publishing to {publishData?.platform === 'youtube' ? 'YouTube' : 'Instagram'}...
            </Typography>
          </Paper>
        </Box>
      )}
      
      <Suspense fallback={<CircularProgress />}>
        {!selectedPlatform ? (
          <PlatformSelector onSelect={setSelectedPlatform} />
        ) : !selectedContent ? (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Tabs 
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ mb: 2 }}
            >
              <Tab label="Drafts" value="drafts" />
              <Tab label="Published" value="published" />
              <Tab label="Failed" value="failed" />
            </Tabs>
            
            <ContentSelector
              content={filteredContent}
              onSelect={(content, platform) => {
                setSelectedContent(content);
                if (platform) setSelectedPlatform(platform);
              }}
              onCancel={resetSelection}
              emptyMessage={
                activeTab === 'drafts' 
                  ? 'No draft content available'
                  : `No ${activeTab} content available`
              }
            />
          </Paper>
        ) : (
          <PublishForm
            content={selectedContent}
            platform={selectedPlatform}
            onPublish={handlePublish}
            onCancel={resetSelection}
          />
        )}
      </Suspense>
      
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmPublish}
        platform={publishData?.platform}
      />
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification(prev => ({ ...prev, open: false }))} 
          severity={notification.severity}
          sx={{ width: '100%' }}
          action={
            notification.actionUrl && (
              <Button 
                color="inherit" 
                size="small"
                href={notification.actionUrl}
                target="_blank"
              >
                View
              </Button>
            )
          }
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const ConfirmationDialog = React.memo(({ open, onClose, onConfirm, platform }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Publication</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to publish this content to {platform}?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="primary" variant="contained">
        Publish
      </Button>
    </DialogActions>
  </Dialog>
));

export default React.memo(Publisher);