// import { createContext, useState, useCallback } from 'react';
// import { generateVideoIdeas, generateVideoScript } from './api/aiService';

// export const ContentContext = createContext();

// export const ContentProvider = ({ children }) => {
//   const [generatedIdeas, setGeneratedIdeas] = useState([]);
//   const [selectedIdea, setSelectedIdea] = useState(null);
//   const [script, setScript] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [contentHistory, setContentHistory] = useState([]);

//   const generateIdeas = useCallback(async (prompt, options) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const ideas = await generateVideoIdeas(prompt, options);
//       setGeneratedIdeas(ideas);
//       setIsLoading(false);
//       return ideas;
//     } catch (err) {
//       setError('Failed to generate ideas. Please try again.');
//       setIsLoading(false);
//       throw err;
//     }
//   }, []);

//   const generateScriptForIdea = useCallback(async (idea) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const scriptContent = await generateVideoScript(idea);
//       setSelectedIdea(idea);
//       setScript(scriptContent);
//       setIsLoading(false);
//       return scriptContent;
//     } catch (err) {
//       setError('Failed to generate script. Please try again.');
//       setIsLoading(false);
//       throw err;
//     }
//   }, []);

//   const saveContent = useCallback((contentData) => {
//     setContentHistory(prev => [
//       ...prev,
//       {
//         ...contentData,
//         id: Date.now(),
//         createdAt: new Date().toISOString(),
//         status: 'draft'
//       }
//     ]);
//   }, []);

//   const updateContentStatus = useCallback((id, status) => {
//     setContentHistory(prev => 
//       prev.map(item => 
//         item.id === id ? { ...item, status } : item
//       )
//     );
//   }, []);

//   return (
//     <ContentContext.Provider
//       value={{
//         generatedIdeas,
//         selectedIdea,
//         script,
//         isLoading,
//         error,
//         contentHistory,
//         generateIdeas,
//         generateScriptForIdea,
//         saveContent,
//         updateContentStatus,
//         setError
//       }}
//     >
//       {children}
//     </ContentContext.Provider>
//   );
// };

// ✅ ContentContext.js

// import { createContext, useState, useCallback } from 'react';
// import { generateVideoIdeas, generateVideoScript } from './api/aiService';

// const ContentContext = createContext();

// const ContentProvider = ({ children }) => {
//   const [generatedIdeas, setGeneratedIdeas] = useState([]);
//   const [selectedIdea, setSelectedIdea] = useState(null);
//   const [script, setScript] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [contentHistory, setContentHistory] = useState([]);

//   const generateIdeas = useCallback(async (prompt, options) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const ideas = await generateVideoIdeas(prompt, options);
//       setGeneratedIdeas(ideas);
//       return ideas;
//     } catch (err) {
//       setError('Failed to generate ideas. Please try again.');
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const generateScriptForIdea = useCallback(async (idea) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const scriptContent = await generateVideoScript(idea);
//       setSelectedIdea(idea);
//       setScript(scriptContent);
//       return scriptContent;
//     } catch (err) {
//       setError('Failed to generate script. Please try again.');
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const saveContent = useCallback((contentData) => {
//     setContentHistory(prev => [
//       ...prev,
//       {
//         ...contentData,
//         id: Date.now(),
//         createdAt: new Date().toISOString(),
//         status: 'draft'
//       }
//     ]);
//   }, []);

//   const updateContentStatus = useCallback((id, status) => {
//     setContentHistory(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, status } : item
//       )
//     );
//   }, []);

//   return (
//     <ContentContext.Provider
//       value={{
//         generatedIdeas,
//         selectedIdea,
//         script,
//         isLoading,
//         error,
//         contentHistory,
//         generateIdeas,
//         generateScriptForIdea,
//         saveContent,
//         updateContentStatus,
//         setError
//       }}
//     >
//       {children}
//     </ContentContext.Provider>
//   );
// };

// // ✅ Export defaults in a consistent format
// export { ContentContext, ContentProvider };

// import { createContext, useState, useCallback } from 'react';

// export const ContentContext = createContext();

// export const ContentProvider = ({ children }) => {
//   // Content history for saved/drafted/published content
//   const [contentHistory, setContentHistory] = useState(() => {
//     const saved = localStorage.getItem('contentHistory');
//     return saved ? JSON.parse(saved) : [];
//   });

//   // State for generated video ideas
//   const [generatedIdeas, setGeneratedIdeas] = useState([]);
  
//   // State for the currently selected idea
//   const [selectedIdea, setSelectedIdea] = useState(null);
  
//   // State for generated script
//   const [script, setScript] = useState('');
  
//   // Loading and error states
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Add new content to history
//   const addContent = useCallback((content) => {
//     setContentHistory(prev => {
//       const newContent = [
//         ...prev,
//         {
//           ...content,
//           id: Date.now().toString(),
//           createdAt: new Date().toISOString(),
//           status: 'draft'
//         }
//       ];
//       localStorage.setItem('contentHistory', JSON.stringify(newContent));
//       return newContent;
//     });
//   }, []);

//   // Update content status (draft/published/failed)
//   const updateContentStatus = useCallback((id, status, platform = null, error = null) => {
//     setContentHistory(prev => {
//       const updated = prev.map(item => 
//         item.id === id ? { 
//           ...item, 
//           status,
//           ...(platform && { publishedPlatform: platform }),
//           ...(error && { errorMessage: error.message })
//         } : item
//       );
//       localStorage.setItem('contentHistory', JSON.stringify(updated));
//       return updated;
//     });
//   }, []);

//   // Generate video ideas
//   const generateIdeas = useCallback(async (prompt, options) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // In a real implementation, this would call your AI service
//       const mockIdeas = [
//         {
//           title: "How to Build a React App",
//           description: "Learn the basics of building a React application from scratch",
//           tags: ["react", "javascript", "webdev"]
//         },
//         {
//           title: "Advanced React Patterns",
//           description: "Explore advanced React patterns for professional applications",
//           tags: ["react", "patterns", "advanced"]
//         }
//       ];
//       setGeneratedIdeas(mockIdeas);
//     } catch (err) {
//       setError('Failed to generate ideas');
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Generate script for a specific idea
//   const generateScriptForIdea = useCallback(async (idea) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // In a real implementation, this would call your AI service
//       const mockScript = `# ${idea.title}\n\n## Introduction\nThis video will cover ${idea.title.toLowerCase()}.\n\n## Main Content\n${idea.description}\n\n## Conclusion\nThanks for watching!`;
//       setSelectedIdea(idea);
//       setScript(mockScript);
//     } catch (err) {
//       setError('Failed to generate script');
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   return (
//     <ContentContext.Provider
//       value={{
//         contentHistory,
//         generatedIdeas,
//         selectedIdea,
//         script,
//         isLoading,
//         error,
//         addContent,
//         updateContentStatus,
//         generateIdeas,
//         generateScriptForIdea,
//         setError
//       }}
//     >
//       {children}
//     </ContentContext.Provider>
//   );
// };


import { createContext, useState, useCallback, useEffect } from 'react';
import { generateVideoIdeas, generateVideoScript } from './api/aiService';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [contentHistory, setContentHistory] = useState([]);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load saved content from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('contentHistory');
    if (saved) {
      try {
        setContentHistory(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved content', err);
      }
    }
  }, []);

  // Save to localStorage when content changes
  useEffect(() => {
    if (contentHistory.length > 0) {
      localStorage.setItem('contentHistory', JSON.stringify(contentHistory));
    }
  }, [contentHistory]);

  const generateIdeas = useCallback(async (prompt, options) => {
    setIsLoading(true);
    setError(null);
    try {
      const ideas = await generateVideoIdeas(prompt, options);
      setGeneratedIdeas(ideas);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateScriptForIdea = useCallback(async (idea) => {
    setIsLoading(true);
    setError(null);
    try {
      const scriptContent = await generateVideoScript(idea);
      setScript(scriptContent);
    } catch (err) {
      setError('Failed to generate script: ' + err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveContent = useCallback((content) => {
    const newContent = {
      ...content,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'draft',
      script: script
    };
    
    setContentHistory(prev => [...prev, newContent]);
    return newContent;
  }, [script]);

  const updateContentStatus = useCallback((id, status, platform = null, error = null, url = null) => {
    setContentHistory(prev => 
      prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              status,
              publishedPlatform: platform,
              publishedUrl: url,
              errorMessage: error?.message,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  }, []);

  const value = {
    contentHistory,
    generatedIdeas,
    script,
    isLoading,
    error,
    generateIdeas,
    generateScriptForIdea,
    saveContent,
    updateContentStatus,
    setError
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};