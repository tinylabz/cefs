import {
    HStack,
    VStack,
    Text,
    useColorModeValue,
    Flex,
    Link,
    Icon,
    Stack,
} from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';

export interface CardData {
    id: number;
    label: string;
    number: number;
    icon: any;
}

export const ComplaintCard = ({ data }: { data: CardData }) => {
    return (
        <motion.div whileHover={{ translateY: -5 }}>
            <Stack
                direction="column"
                rounded="md"
                boxShadow={useColorModeValue(
                    '0 4px 6px rgba(160, 174, 192, 0.6)',
                    '2px 4px 6px rgba(9, 17, 28, 0.9)'
                )}
                w="100%"
                textAlign="left"
                align="start"
                spacing={0}
                role="group"
                overflow="hidden"
            >
                <HStack
                    py={6}
                    px={5}
                    spacing={4}
                    color="white"
                    bg={useColorModeValue('whatsapp.700', 'whatsapp.700')}
                    w="100%"
                >
                    <Flex
                        justify="center"
                        alignItems="center"
                        rounded="lg"
                        p={2}
                        bg="whatsapp.700.400"
                        position="relative"
                        w={12}
                        h={12}
                        overflow="hidden"
                        lineHeight={0}
                        boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)"
                    >
                        <Icon as={data.icon} w={6} h={6} color="white" />
                    </Flex>
                    <VStack
                        color="white"
                        spacing={0}
                        align="start"
                        maxW="lg"
                        h="100%"
                    >
                        <Text
                            as="h3"
                            fontSize="md"
                            noOfLines={2}
                            color="gray.100"
                        >
                            {data.label}
                        </Text>
                        <HStack spacing={2}>
                            <Text as="h2" fontSize="lg" fontWeight="extrabold">
                                {data.number}
                            </Text>
                            <Flex>
                                {data.label === 'Complaints resolved' ? (
                                    <Icon
                                        as={BsArrowUpShort}
                                        w={6}
                                        h={6}
                                        color="#0D940A"
                                    />
                                ) : (
                                    <Icon
                                        as={BsArrowDownShort}
                                        w={6}
                                        h={6}
                                        color="red"
                                    />
                                )}
                            </Flex>
                        </HStack>
                    </VStack>
                </HStack>
                <Flex
                    py={3}
                    px={5}
                    _groupHover={{
                        d: 'flex',
                        bg: useColorModeValue('gray.100', 'gray.800'),
                    }}
                >
                    <Link fontSize="md" color="black">
                        Click to View All
                    </Link>
                </Flex>
            </Stack>
        </motion.div>
    );
};
