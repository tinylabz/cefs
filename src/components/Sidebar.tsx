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

export const Sidebar = ({ ...props }: BoxProps) => (
    <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue('green.500', 'gray.800')}
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
                <Flex px="4" py="5" align="center">
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
                    as="nav"
                    fontSize="md"
                    color="white"
                    aria-label="Main Navigation"
                >
                    <NavItem icon={FaHamburger}>Dashboard</NavItem>
                    <NavItem icon={BsMessenger}>Complaint</NavItem>
                    <NavItem icon={BsBellFill}>Feedback</NavItem>
                    <NavItem icon={FiHelpCircle}>FAQs</NavItem>
                </Flex>
            </Box>
        </VStack>
    </Box>
);
