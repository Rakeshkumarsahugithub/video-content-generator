import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import {
  YouTube,
  Instagram,
  HelpOutline,
  CloudUpload,
  Cancel,
  CheckCircle,
  ErrorOutline
} from '@mui/icons-material';
import { publishToYouTube, publishToInstagram } from '../api/socialMediaService';
import { useContent } from '../hooks/useContent';

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_TAGS = 30;
const MAX_FILE_SIZE_MB = 256;

const authenticateWithYouTube = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve({ accessToken: 'fake-youtube-token', userId: 'me' }), 1000)
  );
};

const authenticateWithInstagram = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve({ accessToken: 'fake-instagram-token', userId: 'insta_user' }), 1000)
  );
};

const PublishForm = ({ content, platform, onPublish, onCancel }) => {
  const { updateContentStatus } = useContent();

  const [formData, setFormData] = useState({
    title: content?.title?.slice(0, MAX_TITLE_LENGTH) || '',
    description: content?.description?.slice(0, MAX_DESCRIPTION_LENGTH) || '',
    tags: content?.tags?.slice(0, MAX_TAGS).join(', ') || '',
    privacy: 'public',
    videoFile: null,
    videoUrl: '',
    accessToken: '',
    userId: ''
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [publishStatus, setPublishStatus] = useState(null);

  const handleAuthenticate = async () => {
    try {
      const token = platform === 'youtube'
        ? await authenticateWithYouTube()
        : await authenticateWithInstagram();

      setFormData(prev => ({
        ...prev,
        accessToken: token.accessToken,
        userId: token.userId
      }));
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);
      return;
    }

    const validExtensions = ['.mp4', '.mov', '.avi', '.webm'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      setError(`Invalid file type. Supported: ${validExtensions.join(', ')}`);
      return;
    }

    setFormData(prev => ({
      ...prev,
      videoFile: file,
      videoUrl: URL.createObjectURL(file)
    }));

    setVideoPreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.accessToken) {
      setError('Authentication required');
      return;
    }

    if (platform === 'youtube' && !formData.videoFile) {
      setError('Upload a video file');
      return;
    }

    if (platform === 'instagram' && !formData.videoUrl) {
      setError('Provide a video URL');
      return;
    }

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setConfirmOpen(true);
  };

  const confirmPublish = async () => {
    setConfirmOpen(false);
    setIsSubmitting(true);
    setUploadProgress(0);
    setPublishStatus(null);

    try {
      const publishData = {
        ...formData,
        platform,
        content,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        onProgress: (progress) => {
          setUploadProgress(progress);
          updateContentStatus(content.id, 'uploading', null, null, null, progress);
        }
      };

      const response = platform === 'youtube'
        ? await publishToYouTube(publishData)
        : await publishToInstagram(publishData);

      updateContentStatus(content.id, 'published', platform, null, response.data?.url);

      setPublishStatus('success');
      onPublish({ ...response.data, platform });

    } catch (error) {
      console.error(error);
      setError(error.message);
      setPublishStatus('error');
      updateContentStatus(content.id, 'failed', null, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            {platform === 'youtube'
              ? <YouTube color="error" sx={{ fontSize: 32, mr: 1.5 }} />
              : <Instagram color="secondary" sx={{ fontSize: 32, mr: 1.5 }} />
            }
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Publish to {platform === 'youtube' ? 'YouTube Shorts' : 'Instagram Reels'}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={handleAuthenticate}
            disabled={isSubmitting}
          >
            Authenticate
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {platform === 'youtube' ? (
            <Box mb={3}>
              <Button component="label" variant="outlined" startIcon={<CloudUpload />}>
                Upload Video
                <input type="file" hidden accept="video/*" onChange={handleFileChange} />
              </Button>
              {formData.videoFile && (
                <Chip
                  label={formData.videoFile.name}
                  onDelete={() => {
                    setFormData(prev => ({ ...prev, videoFile: null, videoUrl: '' }));
                    setVideoPreview(null);
                  }}
                  deleteIcon={<Cancel />}
                  sx={{ ml: 2 }}
                />
              )}
            </Box>
          ) : (
            <TextField
              fullWidth
              label="Video URL"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}

          {videoPreview && (
            <Box mb={2}>
              <Typography variant="subtitle2">Preview:</Typography>
              <video src={videoPreview} controls style={{ maxWidth: '100%' }} />
            </Box>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <Box mb={3}>
              <Typography variant="body2" mb={1}>Uploading: {uploadProgress}%</Typography>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Tags (comma-separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            margin="normal"
          />

          {platform === 'youtube' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Privacy</InputLabel>
              <Select
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="unlisted">Unlisted</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>
          )}

          <Divider sx={{ my: 3 }} />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Publish Now'}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Publish</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to publish this content to {platform === 'youtube' ? 'YouTube' : 'Instagram'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmPublish} variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={publishStatus !== null} onClose={() => setPublishStatus(null)}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {publishStatus === 'success'
            ? <CheckCircle color="success" sx={{ fontSize: 60 }} />
            : <ErrorOutline color="error" sx={{ fontSize: 60 }} />
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center' }}>
            {publishStatus === 'success'
              ? 'Content published successfully!'
              : error || 'An error occurred during publishing.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={() => setPublishStatus(null)} variant="contained">
            {publishStatus === 'success' ? 'Done' : 'Try Again'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PublishForm;

