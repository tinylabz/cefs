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
import { useStore } from '@/state';
import { DESIGNATIONS } from '@/types';

export const Sidebar = ({ ...props }: BoxProps) => {
    const { user } = useStore();
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
            bg={useColorModeValue('green.600', 'gray.800')}
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
                            <NavItem icon={FaHamburger}>Dashboard</NavItem>
                        </Link>
                        {user?.designation === DESIGNATIONS.STUDENT && (
                            <Link to={'/complaints'}>
                                <NavItem icon={BsMessenger}>Complaints</NavItem>
                            </Link>
                        )}
                        {(user?.designation === DESIGNATIONS.LECTURER ||
                            user?.designation === DESIGNATIONS.HOD) && (
                            <Link to={'/lecturer'}>
                                <NavItem icon={BsMessenger}>Lecturer</NavItem>
                            </Link>
                        )}
                        {user?.designation === DESIGNATIONS.REGISTRAR && (
                            <Link to={'/registrar'}>
                                <NavItem icon={BsMessenger}>Registrar</NavItem>
                            </Link>
                        )}

                        {user?.designation === DESIGNATIONS.HOD && (
                            <Link to={'/hod'}>
                                <NavItem icon={BsMessenger}>HOD</NavItem>
                            </Link>
                        )}
                        <Link to={'/status'}>
                            <NavItem icon={BsMessenger}>Status</NavItem>
                        </Link>
                        <Link to={'/reviews'}>
                            <NavItem icon={BsBellFill}>Reviews</NavItem>
                        </Link>
                        <Link to={'/faqs'}>
                            <NavItem icon={FiHelpCircle}>FAQs</NavItem>
                        </Link>
                    </Flex>
                </Box>
            </VStack>
        </Box>
    );
};
