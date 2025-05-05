import { useState } from 'react';
import axios from 'axios';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (apiCall, successCallback) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      if (successCallback) {
        successCallback(response);
      }
      return response;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};