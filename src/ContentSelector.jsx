// import React from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   Chip,
//   Button,
//   Divider,
//   LinearProgress,
//   IconButton,
//   Tooltip
// } from '@mui/material';
// import {
//   VideoLibrary,
//   YouTube,
//   Instagram,
//   Publish,
//   ErrorOutline,
//   CheckCircle,
//   AccessTime,
//   Info
// } from '@mui/icons-material';
// import { format } from 'date-fns';

// const statusConfig = {
//   draft: {
//     icon: <AccessTime color="info" />,
//     color: 'info',
//     label: 'Draft'
//   },
//   published: {
//     icon: <CheckCircle color="success" />,
//     color: 'success',
//     label: 'Published'
//   },
//   failed: {
//     icon: <ErrorOutline color="error" />,
//     color: 'error',
//     label: 'Failed'
//   }
// };

// const platformIcons = {
//   youtube: <YouTube color="error" />,
//   instagram: <Instagram color="secondary" />
// };

// const ContentSelector = ({
//   content,
//   onSelect,
//   onCancel,
//   emptyMessage = 'No content available',
//   selectedId = null,
//   loading = false
// }) => {
//   const handleItemClick = (item) => {
//     if (item.status === 'draft') {
//       onSelect(item);
//     }
//   };

//   const getPlatformChips = (item) => {
//     if (item.status !== 'draft') {
//       const platform = item.publishedPlatform;
//       return (
//         <Chip
//           icon={platformIcons[platform]}
//           label={platform === 'youtube' ? 'YouTube' : 'Instagram'}
//           size="small"
//           variant="outlined"
//           sx={{ ml: 1 }}
//         />
//       );
//     }
//     return null;
//   };

//   return (
//     <Box>
//       {loading && <LinearProgress />}

//       {content.length === 0 ? (
//         <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
//           <VideoLibrary sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
//           <Typography variant="h6" color="text.secondary">
//             {emptyMessage}
//           </Typography>
//         </Paper>
//       ) : (
//         <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
//           {content.map((item) => (
//             <React.Fragment key={item.id}>
//               <ListItem
//                 button
//                 onClick={() => handleItemClick(item)}
//                 selected={selectedId === item.id}
//                 sx={{
//                   opacity: item.status === 'draft' ? 1 : 0.7,
//                   '&:hover': {
//                     backgroundColor: item.status === 'draft' ? 'action.hover' : 'inherit'
//                   }
//                 }}
//               >
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'background.default' }}>
//                     {statusConfig[item.status].icon}
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={
//                     <Box display="flex" alignItems="center">
//                       <Typography
//                         variant="subtitle1"
//                         sx={{
//                           textOverflow: 'ellipsis',
//                           overflow: 'hidden',
//                           whiteSpace: 'nowrap',
//                           maxWidth: '300px'
//                         }}
//                       >
//                         {item.title}
//                       </Typography>
//                       <Chip
//                         label={statusConfig[item.status].label}
//                         size="small"
//                         color={statusConfig[item.status].color}
//                         variant="outlined"
//                         sx={{ ml: 1 }}
//                       />
//                       {getPlatformChips(item)}
//                     </Box>
//                   }
//                   secondary={
//                     <>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           textOverflow: 'ellipsis',
//                           overflow: 'hidden',
//                           whiteSpace: 'nowrap'
//                         }}
//                       >
//                         {item.description}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Created: {format(new Date(item.createdAt), 'MMM d, yyyy - h:mm a')}
//                       </Typography>
//                     </>
//                   }
//                 />
//                 {item.status === 'draft' && (
//                   <Box sx={{ display: 'flex', gap: 1 }}>
//                     <Tooltip title="Publish to YouTube">
//                       <IconButton
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onSelect(item, 'youtube');
//                         }}
//                         color="error"
//                       >
//                         <YouTube />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Publish to Instagram">
//                       <IconButton
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onSelect(item, 'instagram');
//                         }}
//                         color="secondary"
//                       >
//                         <Instagram />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 )}
//                 {item.status === 'failed' && (
//                   <Tooltip title={item.errorMessage || 'Publishing failed'}>
//                     <IconButton>
//                       <Info color="error" />
//                     </IconButton>
//                   </Tooltip>
//                 )}
//               </ListItem>
//               <Divider variant="inset" component="li" />
//             </React.Fragment>
//           ))}
//         </List>
//       )}

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//         <Button
//           variant="outlined"
//           onClick={onCancel}
//           startIcon={<Publish />}
//           sx={{ minWidth: '120px' }}
//         >
//           Back
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ContentSelector;


import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  VideoLibrary,
  YouTube,
  Instagram,
  Publish,
  ErrorOutline,
  CheckCircle,
  AccessTime,
  Info
} from '@mui/icons-material';
import { format } from 'date-fns';

const statusConfig = {
  draft: {
    icon: <AccessTime color="info" />,
    color: 'info',
    label: 'Draft'
  },
  published: {
    icon: <CheckCircle color="success" />,
    color: 'success',
    label: 'Published'
  },
  failed: {
    icon: <ErrorOutline color="error" />,
    color: 'error',
    label: 'Failed'
  }
};

const platformIcons = {
  youtube: <YouTube color="error" />,
  instagram: <Instagram color="secondary" />
};

const ContentSelector = ({
  content,
  onSelect,
  onCancel,
  emptyMessage = 'No content available',
  selectedId = null,
  loading = false
}) => {
  const handleItemClick = (item) => {
    if (item.status === 'draft') {
      onSelect(item);
    }
  };

  const getPlatformChips = (item) => {
    if (item.status !== 'draft') {
      const platform = item.publishedPlatform;
      return platform ? (
        <Chip
          icon={platformIcons[platform]}
          label={platform === 'youtube' ? 'YouTube' : 'Instagram'}
          size="small"
          variant="outlined"
          sx={{ ml: 1 }}
        />
      ) : null;
    }
    return null;
  };

  return (
    <Box>
      {loading && <LinearProgress />}

      {content.length === 0 ? (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
          <VideoLibrary sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            {emptyMessage}
          </Typography>
        </Paper>
      ) : (
        <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
          {content.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                button={item.status === 'draft'}
                onClick={item.status === 'draft' ? () => handleItemClick(item) : undefined}
                selected={selectedId === item.id}
                sx={{
                  opacity: item.status === 'draft' ? 1 : 0.7,
                  '&:hover': {
                    backgroundColor: item.status === 'draft' ? 'action.hover' : 'inherit'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'background.default' }}>
                    {statusConfig[item.status].icon}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          maxWidth: '300px'
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Chip
                        label={statusConfig[item.status].label}
                        size="small"
                        color={statusConfig[item.status].color}
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                      {getPlatformChips(item)}
                    </Box>
                  }
                  secondary={
                    <Box component="span">
                      <Typography
                        variant="body2"
                        component="span"
                        color="text.secondary"
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        component="div"
                      >
                        Created: {format(new Date(item.createdAt), 'MMM d, yyyy - h:mm a')}
                        {item.publishedUrl && (
                          <>
                            
                            <Button
                              size="small"
                              href={item.publishedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              component="span"
                            >
                              View Published
                            </Button>
                          </>
                        )}
                      </Typography>
                    </Box>
                  }
                />

                {item.status === 'draft' && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Publish to YouTube">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(item, 'youtube');
                        }}
                        color="error"
                      >
                        <YouTube />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Publish to Instagram">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(item, 'instagram');
                        }}
                        color="secondary"
                      >
                        <Instagram />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}

                {item.status === 'failed' && (
                  <Tooltip title={item.errorMessage || 'Publishing failed'}>
                    <IconButton>
                      <Info color="error" />
                    </IconButton>
                  </Tooltip>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          startIcon={<Publish />}
          sx={{ minWidth: '120px' }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ContentSelector;

