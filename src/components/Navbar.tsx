import {
    Container,
    Box,
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
    IconButton
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FiMenu } from 'react-icons/fi';

type IconButtonProps = {
    children: ReactNode;
};

// const IconButton = ({ children }: IconButtonProps) => {
//     return (
//         <Button
//             padding="0.4rem"
//             width="auto"
//             height="auto"
//             borderRadius="100%"
//             bg="transparent"
//             _hover={{ bg: '#f6f6f6' }}
//         >
//             {children}
//         </Button>
//     );
// };


export const Navbar = ({ onOpen }: { onOpen: () => void }) => {

    return (
        <Box
            py="2"
            boxShadow="sm"
            border="0 solid #e5e7eb"
            position="fixed"
            top="0"
            bg={useColorModeValue('gray.100', 'gray.700')}
            width="100%"
            zIndex="1"
        >
            <Container px={4} mx="auto">
                <HStack spacing={4} justifyContent="space-between">

                    <IconButton
                        aria-label="Menu"
                        display={{ base: 'inline-flex', md: 'none' }}
                        onClick={onOpen}
                        icon={<FiMenu />}
                        size="md"
                    />

                    <Menu isLazy>
                        <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                            <Avatar size="sm" src={'https://avatars2.githubusercontent.com/u/37842853?v=4'} />
                        </MenuButton>
                        <MenuList
                            zIndex={5}
                        >
                            <MenuItem>
                                <VStack justify="start" alignItems="left">
                                    <Text fontWeight="500">Joan</Text>
                                </VStack>
                            </MenuItem>
                            <MenuItem>
                                <Text fontWeight="500">Dashboard</Text>
                            </MenuItem>
                            <MenuItem>
                                <Text fontWeight="500">Sign Out</Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </Container>
        </Box >
    );
};