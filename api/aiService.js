// import axios from 'axios';

// const API_KEY = import.meta.env.VITE_OPENAI_KEY;;
// const BASE_URL = 'https://api.openai.com/v1';

// export const generateVideoIdeas = async (prompt, options = {}) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/chat/completions`,
//       {
//         model: "gpt-4",
//         messages: [
//           {
//             role: "user",
//             content: `Generate 5 video content ideas based on: ${prompt}. 
//             Each idea should include a title, description (1-2 sentences), and 5 relevant tags.
//             Format as JSON array with title, description, and tags fields.
//             ${options.style ? `Style: ${options.style}` : ''}
//             ${options.tone ? `Tone: ${options.tone}` : ''}
//             ${options.duration ? `Duration: ${options.duration} seconds` : ''}`
//           }
//         ],
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
    
//     const content = response.data.choices[0].message.content;
//     return JSON.parse(content);
//   } catch (error) {
//     console.error('Error generating ideas:', error);
//     throw error;
//   }
// };

// export const generateVideoScript = async (idea) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/chat/completions`,
//       {
//         model: "gpt-4",
//         messages: [
//           {
//             role: "user",
//             content: `Generate a detailed video script for: ${idea.title}. 
//             Description: ${idea.description}
//             Include scene descriptions, narration, and timing information.
//             Format as markdown with sections.`
//           }
//         ],
//         temperature: 0.5,
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
    
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error('Error generating script:', error);
//     throw error;
//   }
// };

// import axios from 'axios';

// const API_KEY = import.meta.env.VITE_OPENAI_KEY;
// const BASE_URL = 'https://api.deepseek.com/v1';

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// /**
//  * Generate video content ideas from a prompt.
//  */
// export const generateVideoIdeas = async (prompt, options = {}, retries = 1) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}`,
//       {
//         model: "gpt-4",
//         messages: [
//           {
//             role: "user",
//             content: `Generate 5 video content ideas based on: ${prompt}. 
//             Each idea should include a title, description (1-2 sentences), and 5 relevant tags.
//             Format as JSON array with title, description, and tags fields.
//             ${options.style ? `Style: ${options.style}` : ''}
//             ${options.tone ? `Tone: ${options.tone}` : ''}
//             ${options.duration ? `Duration: ${options.duration} seconds` : ''}`
//           }
//         ],
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const content = response.data.choices[0].message.content;
//     return JSON.parse(content);
//   } catch (error) {
//     if (error.response?.status === 429 && retries > 0) {
//       console.warn("Rate limit exceeded. Retrying in 5 seconds...");
//       await delay(5000);
//       return generateVideoIdeas(prompt, options, retries - 1);
//     }

//     console.error('Error generating ideas:', error);
//     throw error;
//   }
// };

// /**
//  * Generate a full video script for a selected idea.
//  */
// export const generateVideoScript = async (idea, retries = 1) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}`,
//       {
//         model: "gpt-4",
//         messages: [
//           {
//             role: "user",
//             content: `Generate a detailed video script for: ${idea.title}. 
//             Description: ${idea.description}
//             Include scene descriptions, narration, and timing information.
//             Format as markdown with sections.`
//           }
//         ],
//         temperature: 0.5,
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     return response.data.choices[0].message.content;
//   } catch (error) {
//     if (error.response?.status === 429 && retries > 0) {
//       console.warn("Rate limit exceeded. Retrying in 5 seconds...");
//       await delay(5000);
//       return generateVideoScript(idea, retries - 1);
//     }

//     console.error('Error generating script:', error);
//     throw error;
//   }
// };


import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_KEY;
const BASE_URL = 'https://api.deepseek.com/v1';

const delay = (ms, jitter = 500) => 
  new Promise(resolve => setTimeout(resolve, ms + Math.random() * jitter));

const responseCache = new Map();

const getCacheKey = (prompt, options) => {
  return `${prompt}-${JSON.stringify(options)}`;
};

const makeApiRequest = async (endpoint, data, retries = 3) => {
  const cacheKey = getCacheKey(data.messages[1].content, data);
  
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }

  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000
    });

    responseCache.set(cacheKey, response.data);
    return response.data;
    
  } catch (error) {
    if (retries > 0) {
      const isRateLimit = error.response?.status === 429;
      const isServerError = error.response?.status >= 500;
      
      if (isRateLimit || isServerError) {
        await delay(isRateLimit ? 5000 : 2000);
        return makeApiRequest(endpoint, data, retries - 1);
      }
    }

    throw new Error(
      error.response?.data?.error?.message || 
      error.message || 
      'AI service request failed'
    );
  }
};

export const generateVideoIdeas = async (prompt, options = {}) => {
  if (!prompt.trim()) throw new Error('Prompt cannot be empty');
  
  const temperatureMap = {
    low: 0.3,
    medium: 0.7,
    high: 1.0
  };

  const data = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a creative video content assistant. Generate engaging video ideas based on the user's prompt.
        Respond ONLY with a valid JSON array containing objects with title, description, and tags fields.`
      },
      {
        role: "user",
        content: `Generate 5 unique video ideas about: "${prompt}".
        Requirements:
        - Titles under 60 chars
        - Descriptions 1-2 sentences
        - 5 relevant tags per idea
        ${options.style ? `Style: ${options.style}` : ''}
        ${options.tone ? `Tone: ${options.tone}` : ''}
        ${options.duration ? `Duration: ${options.duration}s` : ''}
        
        Format: [{title, description, tags}]`
      }
    ],
    temperature: temperatureMap[options.creativity] || 0.7,
    max_tokens: 1500,
    response_format: { type: "json_object" }
  };

  const response = await makeApiRequest(BASE_URL, data);
  const content = response.choices[0].message.content;
  
  try {
    return JSON.parse(content).ideas || JSON.parse(content);
  } catch (err) {
    console.error('Failed to parse AI response:', content);
    throw new Error('Invalid response format from AI');
  }
};

export const generateVideoScript = async (idea, options = {}) => {
  const data = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional script writer. Create detailed video scripts in markdown format with:
        - Hook/intro
        - Timed sections
        - Visual descriptions
        - Narration text
        - Conclusion/Call-to-action`
      },
      {
        role: "user",
        content: `Write a script for: "${idea.title}"
        Description: ${idea.description}
        Duration: ${options.duration || 180}s
        Tone: ${options.tone || 'professional'}
        
        Format:
        # [Title]
        ## Hook
        ## Main Content
        ### [Section] (0:00-0:30)
        - Visuals: [description]
        - Narration: "[text]"
        ## Conclusion`
      }
    ],
    temperature: 0.5,
    max_tokens: 2000
  };

  const response = await makeApiRequest(BASE_URL, data);
  return response.choices[0].message.content;
};