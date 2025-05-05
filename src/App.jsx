import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ContentProvider } from '../ContentContext';
import theme from '../theme';
import Layout from './Layout';
import LoadingSpinner from './LoadingSpinner'; 

// Lazy load route components
const Dashboard = lazy(() => import('./Dashboard'));
const Generator = lazy(() => import('./Generator'));
const Publisher = lazy(() => import('./Publisher'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ContentProvider>
          <Router>
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/generate" element={<Generator />} />
                  <Route path="/publish" element={<Publisher />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </ContentProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;