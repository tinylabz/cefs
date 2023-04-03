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


export const Sidebar = ({ ...props }: BoxProps) => (
    <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue('green', 'gray.800')}
        borderColor={useColorModeValue('inherit', 'gray.700')}
        borderRightWidth="1px"
        w="60"
        {...props}
    >
        <Flex px="4" py="5" align="center">
            {/* <Icon as={RiFlashlightFill} color="white" h={8} w={8} /> */}
            <Text
                fontSize="2xl"
                ml="2"
                color={useColorModeValue('white', 'white')}
                fontWeight="semibold"
            >
                CEFS
            </Text>
        </Flex>
        <Flex direction="column" as="nav" fontSize="md" color="white" aria-label="Main Navigation">
            <NavItem icon={AiOutlineHome}>Dashboard</NavItem>
            <NavItem icon={AiOutlineTeam}>Complaint</NavItem>
            <NavItem icon={BsFolder2}>Feedback</NavItem>
            <NavItem icon={BsFolder2}>FAQ</NavItem>
        </Flex>
    </Box>
);

const NavItem = (props: any) => {
    const color = useColorModeValue('gray.600', 'gray.300');

    const { icon, children } = props;
    return (
        <Flex
            align="center"
            px="4"
            py="3"
            cursor="pointer"
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            color={useColorModeValue('inherit', 'gray.400')}
            _hover={{
                bg: useColorModeValue('gray.100', 'gray.900'),
                color: useColorModeValue('gray.900', 'gray.200')
            }}
        >
            {icon && (
                <Icon
                    mx="2"
                    boxSize="4"
                    _groupHover={{
                        color: color
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};