import {
    Box,
    Flex,
    Icon,
    Text,
    VStack,
    BoxProps,
    useColorModeValue,
} from '@chakra-ui/react';
import { BsMessenger, BsBellFill } from 'react-icons/bs';
import { FiHelpCircle } from 'react-icons/fi';
import { Logo } from './Icons';
import { NavItem } from './NavItem';
import { FaHamburger } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

export const Sidebar = ({ ...props }: BoxProps) => {
    const navigate = useNavigate();
    return (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            overflowX="hidden"
            overflowY="auto"
            bg={useColorModeValue('whatsapp.700', 'gray.800')}
            borderColor={useColorModeValue('inherit', 'gray.700')}
            borderRightWidth="1px"
            w="60"
            {...props}
        >
            <VStack
                h="full"
                w="full"
                alignItems="flex-start"
                justify="space-between"
            >
                <Box w="full">
                    <Flex
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                        px="4"
                        py="5"
                        align="center"
                    >
                        <Icon as={Logo} h={8} w={8} />
                        <Text
                            fontSize="2xl"
                            ml="2"
                            color={useColorModeValue('white', 'white')}
                            fontWeight="semibold"
                            css={{ letterSpacing: '1rem' }}
                        >
                            CEFS
                        </Text>
                    </Flex>
                    <Flex
                        direction="column"
                        fontSize="md"
                        color="white"
                        aria-label="Main Navigation"
                    >
                        <Link to={'/'}>
                            <NavItem
                                onClick={() => navigate('/')}
                                icon={FaHamburger}
                            >
                                Dashboard
                            </NavItem>
                        </Link>
                        <Link to={'/complaints'}>
                            <NavItem
                                onClick={() => navigate('/complaints')}
                                icon={BsMessenger}
                            >
                                Complaints
                            </NavItem>
                        </Link>
                        <Link to={'/lecturer'}>
                            <NavItem
                                onClick={() => navigate('/lecturer')}
                                icon={BsMessenger}
                            >
                                Lecturer
                            </NavItem>
                        </Link>
                        <Link to={'/hod'}>
                            <NavItem
                                onClick={() => navigate('/hod')}
                                icon={BsMessenger}
                            >
                                HOD
                            </NavItem>
                        </Link>
                        <Link to={'/status'}>
                            <NavItem
                                onClick={() => navigate('/status')}
                                icon={BsMessenger}
                            >
                                Status
                            </NavItem>
                        </Link>
                        <Link to={'/reviews'}>
                            <NavItem
                                onClick={() => navigate('/reviews')}
                                icon={BsBellFill}
                            >
                                Reviews
                            </NavItem>
                        </Link>
                        <Link to={'/faqs'}>
                            <NavItem
                                onClick={() => navigate('/faqs')}
                                icon={FiHelpCircle}
                            >
                                FAQs
                            </NavItem>
                        </Link>
                    </Flex>
                </Box>
            </VStack>
        </Box>
    );
};
