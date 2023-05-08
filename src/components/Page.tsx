import {
    Avatar,
    Box,
    Flex,
    Link,
    Button,
    Drawer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    DrawerContent,
    IconButton,
    useDisclosure,
    DrawerOverlay,
    useColorModeValue,
    Text,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';

type PageProps = {
    children: React.ReactNode;
};

export const Page: React.FC<PageProps> = ({ children }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const navigate = useNavigate();

    return (
        <Box
            as="section"
            bg={useColorModeValue('gray.50', 'gray.700')}
            minH="100vh"
        >
            <Sidebar display={{ base: 'none', md: 'unset' }} />
            <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                <DrawerOverlay />
                <DrawerContent>
                    <Sidebar w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
                <Flex
                    as="header"
                    align="center"
                    w="full"
                    px="4"
                    //@ts-ignore
                    d={{ base: 'flex', md: 'none' }}
                    borderBottomWidth="1px"
                    borderColor={useColorModeValue('inherit', 'gray.700')}
                    bg={useColorModeValue('white', 'gray.800')}
                    justify={{ base: 'space-between', md: 'flex-end' }}
                    boxShadow="lg"
                    h="14"
                >
                    <IconButton
                        aria-label="Menu"
                        display={{ base: 'inline-flex', md: 'none' }}
                        onClick={onOpen}
                        icon={<FiMenu />}
                        size="md"
                    />

                    <Flex
                        px="4"
                        py="5"
                        mt={0}
                        justify="center"
                        alignItems="center"
                        gap={'1em'}
                    >
                        <Text color="whatsapp.700" fontWeight={'500'}>
                            Student
                        </Text>
                        <Menu>
                            <MenuButton
                                as={Button}
                                size={'sm'}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                _hover={{ textDecoration: 'none' }}
                            >
                                <Avatar
                                    size={'sm'}
                                    name="user"
                                    src="https://media.licdn.com/dms/image/C4E03AQFr7J4gtuP8PQ/profile-displayphoto-shrink_400_400/0/1634562929283?e=1686182400&v=beta&t=zcfSeYkQ9UFy31ozjyMFvCzKOWzPkfntJw0883X_o_M"
                                />
                            </MenuButton>
                            <MenuList fontSize={17} zIndex={5555}>
                                <MenuItem onClick={() => navigate('/profile')}>
                                    My profile
                                </MenuItem>
                                <MenuItem
                                    onClick={() => navigate('/change-password')}
                                >
                                    Change password
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/login')}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                <Box
                    as="main"
                    p="15"
                    minH="30rem"
                    bg={useColorModeValue('auto', 'gray.800')}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
