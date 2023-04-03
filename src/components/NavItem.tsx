import {
    Container,
    Box,
    Icon,
    Avatar,
    Button,
    HStack,
    VStack,
    Image,
    Input,
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Link,
    MenuDivider,
    useColorModeValue,
    IconButton,
    Flex
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FiMenu } from 'react-icons/fi';

export const NavItem = (props: any) => {
    const color = useColorModeValue('gray.800', 'gray.300');

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