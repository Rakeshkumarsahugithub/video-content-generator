// import axios from 'axios';

// // Note: In a real app, these would be handled through proper OAuth flows import.meta.env.VITE_OPENAI_KEY;
// const YOUTUBE_API_KEY = import.meta.env.REACT_APP_YOUTUBE_KEY;
// const INSTAGRAM_ACCESS_TOKEN = import.meta.env.REACT_APP_INSTAGRAM_TOKEN;

// export const publishToYouTube = async (videoData) => {
//   try {
//     // This is a simplified version - actual YouTube API requires proper OAuth
//     const response = await axios.post(
//       'https://www.googleapis.com/upload/youtube/v3/videos',
//       {
//         snippet: {
//           title: videoData.title,
//           description: videoData.description,
//           tags: videoData.tags,
//           categoryId: '22' // Entertainment
//         },
//         status: {
//           privacyStatus: videoData.privacy || 'public'
//         }
//       },
//       {
//         params: {
//           part: 'snippet,status',
//           key: YOUTUBE_API_KEY
//         },
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${YOUTUBE_API_KEY}`
//         }
//       }
//     );
    
//     return response.data;
//   } catch (error) {
//     console.error('YouTube publishing error:', error);
//     throw error;
//   }
// };

// export const publishToInstagram = async (videoData) => {
//   try {
//     // Simplified Instagram API call
//     const response = await axios.post(
//       `https://graph.instagram.com/me/media`,
//       {
//         caption: videoData.caption,
//         video_url: videoData.videoUrl,
//         media_type: 'REELS',
//         access_token: INSTAGRAM_ACCESS_TOKEN
//       }
//     );
    
//     return response.data;
//   } catch (error) {
//     console.error('Instagram publishing error:', error);
//     throw error;
//   }
// };

import axios from 'axios';

// Mock data for development environment
const MOCK_DATA = {
  youtube: {
    id: 'TuVQT0psJfw',
    url: 'https://www.youtube.com/shorts/TuVQT0psJfw',
    status: 'uploaded'
  },
  instagram: {
    id: 'ig_mock_456',
    url: 'https://instagram.com/reel/mock456',
    status: 'published'
  }
};

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

// Simulate API delays
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 1500));

export const publishToYouTube = async (videoData) => {
  if (isDev) {
    await simulateDelay();
    return { data: MOCK_DATA.youtube };
  }

  try {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('snippet', JSON.stringify({
      title: videoData.title.substring(0, 100),
      description: videoData.description.substring(0, 5000),
      tags: videoData.tags.slice(0, 30),
      categoryId: '22'
    }));
    formData.append('status', JSON.stringify({
      privacyStatus: videoData.privacy || 'public',
      selfDeclaredMadeForKids: false
    }));
    formData.append('video', videoData.videoFile);

    const response = await axios.post(
      'https://www.googleapis.com/upload/youtube/v3/videos',
      formData,
      {
        params: {
          part: 'snippet,status',
          uploadType: 'multipart'
        },
        headers: {
          'Authorization': `Bearer ${videoData.accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (videoData.onProgress) {
            videoData.onProgress(percentCompleted);
          }
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw new Error(
      error.response?.data?.error?.message || 
      'Failed to upload to YouTube. Please check your authentication and try again.'
    );
  }
};

export const publishToInstagram = async (videoData) => {
  if (isDev) {
    await simulateDelay();
    return { data: MOCK_DATA.instagram };
  }

  try {
    // Step 1: Create media container
    const containerResponse = await axios.post(
      `https://graph.facebook.com/v12.0/${videoData.userId}/media`,
      {
        caption: videoData.description.substring(0, 2200),
        video_url: videoData.videoUrl,
        media_type: 'REELS',
        access_token: videoData.accessToken
      }
    );

    const containerId = containerResponse.data.id;

    // Step 2: Publish the container
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v12.0/${videoData.userId}/media_publish`,
      {
        creation_id: containerId,
        access_token: videoData.accessToken
      }
    );

    return publishResponse.data;
  } catch (error) {
    console.error('Instagram API Error:', error);
    throw new Error(
      error.response?.data?.error?.message || 
      'Failed to upload to Instagram. Please check your authentication and try again.'
    );
  }
};

// Test account functions
export const authenticateTestYouTubeAccount = async () => {
  if (isDev) {
    await simulateDelay();
    return {
      accessToken: 'test_yt_token_123',
      userId: 'test_yt_user_123'
    };
  }
  throw new Error('YouTube authentication not implemented in production');
};

export const authenticateTestInstagramAccount = async () => {
  if (isDev) {
    await simulateDelay();
    return {
      accessToken: 'test_ig_token_456',
      userId: 'test_ig_user_456'
    };
  }
  throw new Error('Instagram authentication not implemented in production');
};