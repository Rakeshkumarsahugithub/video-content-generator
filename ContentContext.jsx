
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