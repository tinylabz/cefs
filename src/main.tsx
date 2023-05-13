import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { FloatingButton } from '@/components/FloatingButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const client = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0C6C33',
                },
            }}
        >
            <QueryClientProvider client={client}>
                <ChakraProvider>
                    <BrowserRouter>
                        <App />
                        <FloatingButton />
                    </BrowserRouter>
                </ChakraProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ConfigProvider>
    </StrictMode>
);
