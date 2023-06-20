import '../Pages/fb.css';
import { FloatButton } from 'antd';
import { MessageFilled, CloseCircleFilled } from '@ant-design/icons';
import { Text, Box } from '@chakra-ui/react';
import { useStore } from '@/state';
import { useState } from 'react';
import { completion } from '@/services/chat';
import { Flex, Image, Loader } from '@mantine/core';
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
            const response = await completion(intent);

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
            setIntent('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-box">
            <div className="chat-header">
                <Flex justify={'center'} align="center">
                    <Text>Your AI Assistant</Text>
                </Flex>
                <Button color="teal" onClick={handleClose}>
                    <CloseCircleFilled />
                </Button>
            </div>
            <Box
                display="flex"
                flexDirection="column"
                padding="5px"
                height="320px"
                overflowY="scroll"
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
                    onKeyDown={handleKeyDown}
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

    const isAuthenticated =
        user && token && user.isEmailVerified ? true : false;

    return isAuthenticated ? (
        <div>
            {isChatBoxOpen ? (
                <ChatBox handleClose={handleClick} />
            ) : (
                <FloatButton
                    style={{
                        right: '3em',
                        width: '3em',
                    }}
                    type="default"
                    shape="square"
                    className="fb"
                    onClick={() => handleClick()}
                    icon={<MessageFilled />}
                />
            )}
        </div>
    ) : null;
};

export const FImage = ({ handleClick }: { handleClick: () => void }) => {
    return (
        <div onClick={handleClick} className="img">
            <Image src={'/joan2.png'} width={100} />
        </div>
    );
};
