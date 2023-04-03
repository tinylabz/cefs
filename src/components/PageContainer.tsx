import {
    Avatar,
    Box,
    Flex,
    Icon,
    Text,
    Stack,
    Image,
    Button,
    Heading,
    BoxProps,
    Drawer,
    DrawerContent,
    IconButton,
    useDisclosure,
    DrawerOverlay,
    useColorModeValue
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaBell } from 'react-icons/fa';
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

type Props = {
    children: React.ReactNode
}

export const PageContainer: React.FC<Props> = ({ children }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
            <Sidebar display={{ base: 'none', md: 'unset' }} />
            <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                <DrawerOverlay />
                <DrawerContent>
                    <Sidebar w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
                {/* <Flex
                    as="header"
                    align="center"
                    justify={{ base: 'space-between', md: 'flex-end' }}
                    w="full"
                    px="4"
                    borderBottomWidth="1px"
                    borderColor={useColorModeValue('inherit', 'gray.700')}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow="sm"
                    h="14"
                >
                    <IconButton
                        aria-label="Menu"
                        display={{ base: 'inline-flex', md: 'none' }}
                        onClick={onOpen}
                        icon={<FiMenu />}
                        size="md"
                    />

                    <Flex align="center">
                        <Icon color="gray.500" as={FaBell} cursor="pointer" />
                        <Avatar
                            ml="4"
                            size="sm"
                            name="joan"
                            src="https://media.licdn.com/dms/image/C4E03AQFr7J4gtuP8PQ/profile-displayphoto-shrink_400_400/0/1634562929283?e=1686182400&v=beta&t=zcfSeYkQ9UFy31ozjyMFvCzKOWzPkfntJw0883X_o_M"
                            cursor="pointer"
                        />
                    </Flex>
                </Flex> */}

                <Navbar onOpen={onOpen} />

                <Box as="main" minH="25rem" bg={useColorModeValue('auto', 'gray.800')}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
