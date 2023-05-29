import '../Pages/fb.css';
import { FloatButton } from 'antd';
import { MessageFilled, CloseCircleFilled } from '@ant-design/icons';
import { Stack, Text, VStack, Box } from '@chakra-ui/react';
import { useStore } from '@/state';
import { useState } from 'react';
import { chatCompletion } from '@/services/chat';
import { Loader } from '@mantine/core';
import { Button, Input } from '@mantine/core';
import { FiMessageSquare } from 'react-icons/fi';
import { BsSend } from 'react-icons/bs';

type Conversation = {
    sender: 'user' | 'chatgpt';
    text: string | undefined;
};

const ChatBox = ({ handleClose }: any) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [intent, setIntent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        setConversations((prevConversations) => [
            ...prevConversations,
            {
                sender: 'user',
                text: intent,
            },
        ]);
        try {
            setLoading(true);
            const response = await chatCompletion(intent);

            setConversations((prevConversations) => [
                ...prevConversations,
                {
                    sender: 'chatgpt',
                    text: response.data.choices[0].message?.content,
                },
            ]);
            setLoading(false);
        } catch (error: any) {
            console.log(error?.response?.data);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-box">
            <div className="chat-header">
                <Text>Your AI Assistant</Text>
                <Button color="teal" onClick={handleClose}>
                    <CloseCircleFilled />
                </Button>
            </div>
            <Box
                display="flex"
                flexDirection="column"
                padding="5px"
                height="320px"
                overflowY="auto"
            >
                {loading && (
                    <Loader sx={{ alignSelf: 'center' }} variant="dots" />
                )}
                {conversations.map((message, index) => (
                    <Box
                        display="flex"
                        justifyContent={
                            message.sender === 'chatgpt'
                                ? 'flex-end'
                                : 'flex-start'
                        }
                        alignItems="center"
                        key={index}
                    >
                        <Text
                            mb="10px"
                            width="fit-content"
                            p="5px 10px"
                            rounded="lg"
                            wordBreak="break-word"
                            className={`${message.sender}`}
                        >
                            {message.text}
                        </Text>
                    </Box>
                ))}
            </Box>
            <Box
                mt="-2rem"
                p={1}
                gap={1}
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
            >
                <Input
                    icon={<FiMessageSquare />}
                    w="100%"
                    onChange={({ target }) => setIntent(target.value)}
                    placeholder="Type your Message..."
                    value={intent}
                />
                <Button rightIcon={<BsSend />} onClick={handleSendMessage}>
                    Send
                </Button>
            </Box>
        </div>
    );
};

export const FloatingButton = () => {
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);

    const handleClick = () => {
        setIsChatBoxOpen(!isChatBoxOpen);
    };
    const { user, token } = useStore();

    const isAuthenticated = user && token ? true : false; // Return true if authenticated, otherwise false

    return isAuthenticated ? (
        <div>
            {isChatBoxOpen ? (
                <ChatBox handleClose={handleClick} />
            ) : (
                // @ts-ignore
                <FloatButton
                    type="primary"
                    onClick={() => handleClick()}
                    icon={<MessageFilled />}
                />
            )}
        </div>
    ) : null;
};
