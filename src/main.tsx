import App, { withAuth } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { FloatingButton } from '@/components/FloatingButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { axios } from './config/axios-config';
import { MantineProvider } from '@mantine/core';

const client = new QueryClient();
setInterval(async () => {
    const res = await axios.get('/ping');
    console.log(res.data);
}, 1000 * 30);

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <MantineProvider
            theme={{
                colors: {
                    brand: ['#2F855A'],
                },
                primaryColor: 'teal',
            }}
        >
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
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </ConfigProvider>
        </MantineProvider>
    </StrictMode>
);
