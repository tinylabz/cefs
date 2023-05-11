import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import { FloatingButton } from '@/components/FloatingButton';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0C6C33',
                },
            }}
        >
            <ChakraProvider>
                <BrowserRouter>
                    <App />
                    <FloatingButton />
                </BrowserRouter>
            </ChakraProvider>
        </ConfigProvider>
    </StrictMode>
);
