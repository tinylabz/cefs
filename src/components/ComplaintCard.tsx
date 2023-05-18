
import {
    HStack,
    VStack,
    Text,
    useColorModeValue,
    Flex,
    Icon,
    Stack,
} from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';

export interface CardData {
    id: number;
    label: string;
    status: 'RESOLVED' | 'PENDING' | undefined;
    icon: any;
    href: string;
}

export const ComplaintCard = ({
    data: complaintCardData,
}: {
    data: CardData;
}) => {
    const { data } = useQuery({
        queryKey: ['complaints'],
        queryFn: () => axios.get('/complaints').then((res) => res.data),
    });
    const [total, setTotal] = useState(0);
    const [pending, setPending] = useState<any>([]);
    const [resolved, setResolved] = useState<any>([]);

    useEffect(() => {
        setTotal(data?.complaints?.length);

        data?.complaints.forEach((c: { status: string; }) => {
            if (c?.status === 'PENDING') {
                setPending([...pending, c]);
            }
            if (c?.status === 'RESOLVED') {
                setResolved([...resolved, c]);
            }
        });
    }, [data]);

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
                        <Icon
                            as={complaintCardData.icon}
                            w={6}
                            h={6}
                            color="white"
                        />
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
                            {complaintCardData.label}
                        </Text>
                        <HStack spacing={2}>
                            <Text as="h2" fontSize="lg" fontWeight="extrabold">
                                {
                                    complaintCardData.status === "PENDING" ? pending.length :resolved.length
                                }
                            </Text>
                            <Flex>
                                {complaintCardData.label ===
                                'Complaints resolved' ? (
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
                    <Link to={complaintCardData.href} color="black">
                        Click to View All
                    </Link>
                </Flex>
            </Stack>
        </motion.div>
    );
};
