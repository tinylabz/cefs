import {
    Box,
    Button,
    Container,
    Link,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import {
    Container as MantineContainer,
    Grid,
    SimpleGrid,
    Skeleton,
    useMantineTheme,
    rem,
} from '@mantine/core';
import { Divider, Steps } from 'antd';
import {
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Complaint, DESIGNATIONS } from '@/types';
import { useStore } from '@/state';
import { BsDownload, BsFilePdfFill } from 'react-icons/bs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';
import { AxiosError, AxiosResponse } from 'axios';

type Status = 'wait' | 'process' | 'finish' | 'error';

export const ComplaintDetail: React.FC<Complaint | undefined> = ({
    ...props
}) => {
    const [submittedStatus, setSubmittedStatus] = useState<Status>();
    const [pendingStatus, setPendingStatus] = useState<Status>();
    const [resolvingStatus, setResolvingStatus] = useState<Status>();
    const [doneStatus, setDoneStatus] = useState<Status>();
    const { user, token } = useStore();

    const qc = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: () =>
            axios.patch(`/complaints/resolve/${props._id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSuccess: () => {
            qc.invalidateQueries(['complaints']);
            toast({
                status: 'success',
                title: 'Successfully marked complaint as resolved!',
                isClosable: true,
                position: 'top',
            });
            setDoneStatus('finish');
        },
        onError: (error: AxiosError) => {
            toast({
                title: error.response?.data as unknown as string,
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        },
    });

    return (
        <Container maxW="100%">
            <Stack justifyContent={'space-between'} spacing={4}>
                <Steps
                    items={[
                        {
                            title: 'Submitted',
                            status: submittedStatus,
                            icon: <UserOutlined />,
                        },
                        {
                            title: 'Pending',
                            status: pendingStatus,
                            icon: <SolutionOutlined />,
                        },
                        {
                            title: 'Being worked on',
                            status: resolvingStatus,
                            icon: <LoadingOutlined />,
                        },
                        {
                            title: 'Rectified',
                            status: doneStatus,
                            icon: <SmileOutlined />,
                        },
                    ]}
                />
                <SimpleGrid
                    cols={3}
                    spacing="xs"
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                >
                    <Detail
                        title="Student Number"
                        value={props.studentNumber}
                    />
                    <Detail
                        title="Registration Number"
                        value={props.registrationNumber}
                    />
                    <Detail title="Nature" value={props.nature} />
                    <Detail title="Course Code" value={props.courseCode} />
                    <Detail
                        title="Date Filed"
                        value={new Date(props.createdAt!).toLocaleDateString(
                            'en-UG',
                            {
                                day: 'numeric',
                                month: 'numeric',
                                year: '2-digit',
                            }
                        )}
                    />
                    {props.nature === 'REMARK' && (
                        <Detail title="Reciept" value={props.recieptURL!} />
                    )}
                    {props.academicYearAllocated && (
                        <Detail
                            title="Academic Year Allocated"
                            value={props.academicYearAllocated!}
                        />
                    )}
                    {props.academicYearOfSitting && (
                        <Detail
                            title="Academic Year of Sitting"
                            value={props.academicYearOfSitting!}
                        />
                    )}
                    {props.courseLecturer && (
                        <Detail
                            title="Course lecturer"
                            value={props.courseLecturer!}
                        />
                    )}
                </SimpleGrid>
                {user?.designation !== DESIGNATIONS.STUDENT && (
                    <Button
                        colorScheme="green"
                        onClick={() => mutation.mutate()}
                    >
                        Mark as Resolved
                    </Button>
                )}
                <Comments />
            </Stack>
        </Container>
    );
};

const Comments = () => {
    const { user, token } = useStore();
    const toast = useToast();
    const [comment, setComment] = useState('');
    const query = useQuery({
        queryKey: ['comments'],
        queryFn: () =>
            axios
                .get(`/parse?studentNumber=${user?.studentNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => res.data),
        onSuccess: (res: AxiosResponse) => {
            setComment(res.data);
            toast({
                title: res.data as unknown as string,
                status: 'success',
                isClosable: true,
                position: 'top',
            });
        },
        onError: (error: AxiosError) => {
            setComment(error.response?.data as string);

            toast({
                title: error?.response?.data as unknown as string,
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        },
    });

    console.log('COmmet: ', query.data?.data);

    return (
        <Stack>
            <Divider />
            <Text fontSize={'2xl'}>Comments</Text>
            <Text>{comment}</Text>
        </Stack>
    );
};

const Detail: React.FC<{
    title: string;
    value: string;
}> = ({ title, value }) => {
    const PRIMARY_COL_HEIGHT = rem(300);
    const theme = useMantineTheme();
    const HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
    let href = '';
    if (title === 'Reciept') {
        href = `http://localhost:4000/${value.slice(7)}`;
    }

    return (
        <Box
            height={HEIGHT}
            rounded="md"
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            animation={'forwards'}
            bg={useColorModeValue('green.500', '')}
            color="white"
            p={3}
        >
            <Text fontSize="2xl">{title}</Text>
            {href ? (
                <>
                    <BsFilePdfFill size={'lg'} />
                    <Link href={href}>
                        <Button
                            w="full"
                            colorScheme="whatsapp"
                            leftIcon={<BsDownload />}
                        >
                            Download
                        </Button>
                    </Link>
                </>
            ) : (
                <Text fontSize="4xl">{value}</Text>
            )}
        </Box>
    );
};
