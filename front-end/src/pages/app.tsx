import React, { useEffect } from 'react';

import { AuthProvider } from '@context/AuthContext';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppRoute from '@routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const langLocal = localStorage.getItem('lang');
    if (langLocal) i18n.changeLanguage(langLocal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <MantineProvider theme={theme}>
            <Notifications position="top-right" containerWidth={340} />
            <AppRoute />
          </MantineProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default React.memo(App);
