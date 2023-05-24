import { Page } from '@/components/Page';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    GridItem,
    Progress,
    Stack,
    Text,
    Textarea,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Rating } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';
import { useStore } from '@/state';

export default function Reviews() {
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState('');
    const { user } = useStore();
    const qc = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: string) => axios.post('/reviews', JSON.parse(data)),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ['reviews'],
            }),
                toast({
                    status: 'success',
                    title: 'Your review was sucessfully added',
                    position: 'top',
                    isClosable: true,
                });
        },
        onError: () => {
            const toast = useToast();
            toast({
                status: 'error',
                title: 'Your review was not added. Try again',
                position: 'top',
                isClosable: true,
            });
        },
    });

    const { isLoading, data, error } = useQuery({
        queryKey: ['reviews'],
        queryFn: () => axios.get('/reviews').then((res) => res.data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ['reviews'],
            });
        },
    });

    return (
        <Page>
            <Container maxW={'container.xl'}>
                <Stack spacing={4}>
                    <Text align={'center'} fontSize={'4xl'}>
                        Reviews and Ratings
                    </Text>
                    <Text align={'center'} fontSize={'2xl'}>
                        Reviews and ratings are verified and are from people who
                        use the type of device as you.
                    </Text>
                </Stack>

                <Grid templateColumns="repeat(6, 1fr)" mt={'2em'} gap={4}>
                    <GridItem colSpan={2} w="100%">
                        <Stack
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems="flex-start"
                            justifyContent={'space-between'}
                        >
                            <Text fontSize={'7xl'} fontWeight={'extrabold'}>
                                4.8
                            </Text>

                            <Rating
                                fractions={2}
                                value={4.5}
                                size="xl"
                                color="teal"
                            />
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={4} w="100%">
                        <Stack spacing={5}>
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Progress
                                    key={idx.toString()}
                                    colorScheme="green"
                                    size="md"
                                    value={20 * (5 - idx)}
                                    borderRadius="md"
                                />
                            ))}
                        </Stack>
                    </GridItem>
                </Grid>

                <Stack mt="3em">
                    <Divider />

                    <Text fontSize={'2xl'}>
                        Please rate and add your comment
                    </Text>

                    <Rating
                        size="xl"
                        fractions={2}
                        color="teal"
                        value={value}
                        onChange={(value) => setValue(value)}
                    />
                    <Textarea
                        size={'xs'}
                        rows={5}
                        value={description}
                        onChange={({ target: { value } }) =>
                            setDescription(value)
                        }
                        placeholder="Write your review"
                    />
                    <Button
                        onClick={() =>
                            mutation.mutate(
                                JSON.stringify({
                                    value,
                                    description,
                                    user: user?.name,
                                })
                            )
                        }
                        colorScheme={'green'}
                    >
                        Add Review
                    </Button>
                </Stack>
                <VStack mt="6" spacing={4}>
                    <AvatarGroup alignSelf="start" size="md" max={2}>
                        {data?.reviews?.map(
                            (review: {
                                value: number;
                                description: string;
                                user: string;
                            }) => (
                                <Avatar
                                    key={review?.user}
                                    name={review?.user}
                                />
                            )
                        )}
                    </AvatarGroup>
                    {data?.reviews
                        ?.sort(
                            (a: any, b: any) =>
                                Date.parse(b?.createdAt) -
                                Date.parse(a?.createdAt)
                        )
                        .map((review: any) => (
                            <Stack
                                w="100%"
                                shadow="sm"
                                borderColor="ActiveBorder"
                                p="1"
                                key={review._id}
                                justifyContent={'space-between'}
                                direction="row"
                                alignItems="flex-start"
                            >
                                <Box w="10%">
                                    <Avatar name={review.user} />
                                </Box>
                                <Box w="90%">
                                    <Rating
                                        value={review.value}
                                        size="xl"
                                        fractions={2}
                                    />
                                    <Text>{review.description}</Text>
                                </Box>
                            </Stack>
                        ))}
                </VStack>
            </Container>
        </Page>
    );
}
