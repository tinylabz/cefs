import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { Button, Spinner, Stack, useToast, VStack } from '@chakra-ui/react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';
import { ReactNode, useState } from 'react';
import { NATURE } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useStore } from '@/state';
import { Flex, TextInput, Select } from '@mantine/core';

export const MissingMark = () => {
    const toast = useToast();

    const [courseCode, setCourseCode] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [academicYear, setAcademicYear] = useState<string>('');
    const [courseLecturer, setCourseLecturer] = useState<string>('');
    const [semester, setSemester] = useState<string>('');
    const { token, user } = useStore();
    const qc = useQueryClient();

    const query = useQuery({
        queryKey: ['lecturers'],
        queryFn: () =>
            axios.get('/staff', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    });

    console.log('STAFFFF: ', query.data?.data);
    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/complaints', JSON.parse(data), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSuccess: (res) => {
            qc.invalidateQueries({ queryKey: ['complaints'] });
            axios
                .get(`/parse?studentNumber=${user?.studentNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    toast({
                        title: JSON.stringify(res.data),
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    });
                })
                .catch((err) => {
                    toast({
                        title: JSON.stringify(err?.response?.data),
                        status: 'error',
                        isClosable: true,
                        position: 'top',
                    });
                });
            toast({
                title: 'Successfully File complaint',
                status: 'success',
                isClosable: true,
                position: 'top',
            });
        },
        onError: (err: AxiosError) => {
            toast({
                title: err.response?.data as ReactNode,
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        },
    });
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        mutation.mutate(
            JSON.stringify({
                studentNumber: user?.studentNumber,
                registrationNumber: user?.registrationNumber,
                courseCode,
                courseLecturer,
                courseName,
                academicYear,
                semester,
                nature: NATURE.MISSING_MARK,
            })
        );
    };
    return (
        <VStack
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            rounded="lg"
        >
            <TextInput
                w="100%"
                label="Student Number"
                placeholder="Student Number"
                value={user?.studentNumber}
            />
            <TextInput
                w="100%"
                label="Registration Number"
                placeholder="Registration Number"
                value={user?.registrationNumber}
            />
            <TextInput
                w="100%"
                label="Course Code"
                placeholder="Course Code"
                value={courseCode}
                required
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <TextInput
                w="100%"
                label="Course Name"
                placeholder="Course Name"
                value={courseName}
                required
                onChange={({ target: { value } }) => setCourseName(value)}
            />
            <TextInput
                w="100%"
                label="Academic Year of Sitting"
                placeholder="Academic Year of Sitting"
                value={academicYear}
                required
                onChange={({ target: { value } }) => setAcademicYear(value)}
            />

            <Select
                w="100%"
                label="Semester"
                placeholder="Select Semester"
                onChange={(value) => setSemester(value!)}
                value={semester}
                data={[
                    { value: 'ONE', label: 'ONE' },
                    { value: 'TWO', label: 'TWO' },
                    { value: 'THREE', label: 'THREE' },
                ]}
            />

            <Flex w="100%" align={'center'} justify="space-between" gap="md">
                <Select
                    label="Lecturer's name"
                    placeholder="Select Lecturer's name"
                    onChange={(value) => setCourseLecturer(value!)}
                    value={courseLecturer}
                    data={[
                        ...query.data?.data?.staffs.map(
                            (staff: { name: any }) => ({
                                value: staff?.name,
                                label: staff?.name?.toUpperCase(),
                            })
                        ),
                    ]}
                />

                <TextInput
                    w="100%"
                    placeholder="Course Lecturer"
                    value={courseLecturer}
                    required
                    label="Type course lecturer"
                    onChange={({ target: { value } }) =>
                        setCourseLecturer(value)
                    }
                />
            </Flex>
            <Stack width={'full'}>
                <Button
                    colorScheme="green"
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                    type="submit"
                >
                    {mutation.isLoading ? <Spinner /> : 'Submit'}
                </Button>
            </Stack>
        </VStack>
    );
};

export const WrongAcademicYear = () => {
    const [courseCode, setCourseCode] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [academicYearAllocated, setAcademicYearAllocated] =
        useState<string>('');
    const [correctAcademicYear, setCorrectAcademicYear] = useState<string>('');
    const toast = useToast();
    const qc = useQueryClient();
    const { token, user } = useStore();
    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/complaints', JSON.parse(data), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSuccess: (res: AxiosResponse) => {
            qc.invalidateQueries({ queryKey: ['complaints'] });
            toast({
                title: 'Successfully File complaint',
                status: 'success',
                isClosable: true,
                position: 'top',
            });
        },
        onError: () => {
            toast({
                title: 'Failed to file complaint. Try again!',
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        },
    });

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        mutation.mutate(
            JSON.stringify({
                studentNumber: user?.studentNumber,
                registrationNumber: user?.registrationNumber,
                courseCode,
                courseName,
                correctAcademicYear,
                academicYearAllocated,
                nature: NATURE.WRONG_ACADEMIC_YEAR,
            })
        );
    };
    return (
        <VStack
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            rounded="lg"
        >
            <TextInput
                w="100%"
                label="Student Number"
                placeholder="Student Number"
                value={user?.studentNumber}
            />
            <TextInput
                w="100%"
                label="Registration Number"
                placeholder="Registration Number"
                value={user?.registrationNumber}
            />
            <TextInput
                w="100%"
                label="Course Code"
                placeholder="Course Code"
                value={courseCode}
                required
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <TextInput
                w="100%"
                label="Course Name"
                placeholder="Course Name"
                value={courseName}
                required
                onChange={({ target: { value } }) => setCourseName(value)}
            />
            <TextInput
                w="100%"
                label="Academic Year Allocated"
                placeholder="Academic Year Allocated"
                value={academicYearAllocated}
                required
                onChange={({ target: { value } }) =>
                    setAcademicYearAllocated(value)
                }
            />
            <TextInput
                w="100%"
                label="Correct Academic Year"
                placeholder="Correct Academic Year"
                value={correctAcademicYear}
                required
                onChange={({ target: { value } }) =>
                    setCorrectAcademicYear(value)
                }
            />
            <Stack width={'full'}>
                <Button
                    colorScheme="green"
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                    type="submit"
                >
                    {mutation.isLoading ? <Spinner /> : 'Submit'}
                </Button>
            </Stack>
        </VStack>
    );
};

export const Remark = () => {
    const [courseCode, setCourseCode] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [academicYearOfSitting, setAcademicYearOfSitting] =
        useState<string>('');

    const [courseLecturer, setCourseLecturer] = useState<string>('');
    const [semester, setSemester] = useState<string>('');
    const [recieptURL, setRecieptURL] = useState<string>('');
    const toast = useToast();
    const { token, user } = useStore();

    const qc = useQueryClient();
    const query = useQuery({
        queryKey: ['lecturers'],
        queryFn: () =>
            axios.get('/staff', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    });

    console.log('STAFFFF: ', query.data?.data);

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'http://localhost:4000/api/upload/reciept',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                toast({
                    status: 'success',
                    title: `${info.file.name} reciept uploaded successfully.`,
                    position: 'top',
                    isClosable: true,
                });
                console.log('RES: ', info.file.response?.file?.path);
                setRecieptURL(info.file.response?.file?.path);
            } else if (status === 'error') {
                toast({
                    status: 'success',
                    title: `${info.file.name} reciept upload failed.`,
                    position: 'top',
                    isClosable: true,
                });
            }
        },
        onDrop(e) {
            e.preventDefault();
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const { Dragger } = Upload;

    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/complaints', JSON.parse(data), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['complaints'] });
            toast({
                title: 'Successfully File complaint',
                status: 'success',
                isClosable: true,
                position: 'top',
            });
        },
        onError: () => {
            toast({
                title: 'Failed to file complaint. Try again!',
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(
            JSON.stringify({
                studentNumber: user?.studentNumber,
                registrationNumber: user?.registrationNumber,
                courseCode,
                courseLecturer,
                courseName,
                academicYearOfSitting,
                semester,
                recieptURL,
                nature: NATURE.REMARK,
            })
        );
    };
    return (
        <VStack
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            rounded="lg"
        >
            <TextInput
                w="100%"
                label="Student No"
                placeholder="Student No"
                value={user?.studentNumber}
            />
            <TextInput
                w="100%"
                label="Registration No"
                placeholder="Registration No"
                value={user?.registrationNumber}
            />
            <TextInput
                w="100%"
                label="Academic Year Of Sitting"
                placeholder="Academic Year Of Sitting"
                value={academicYearOfSitting}
                required
                onChange={({ target: { value } }) =>
                    setAcademicYearOfSitting(value)
                }
            />
            <Select
                w="100%"
                label="Semester"
                placeholder="Select Semester"
                onChange={(value) => setSemester(value!)}
                value={semester}
                data={[
                    { value: 'ONE', label: 'ONE' },
                    { value: 'TWO', label: 'TWO' },
                    { value: 'THREE', label: 'THREE' },
                ]}
            />

            <Flex w="100%" align={'center'} justify="space-between" gap="md">
                <Select
                    label="Lecturer's name"
                    placeholder="Select Lecturer's name"
                    onChange={(value) => setCourseLecturer(value!)}
                    value={courseLecturer}
                    data={[
                        ...query.data?.data?.staffs.map(
                            (staff: { name: any }) => ({
                                value: staff?.name,
                                label: staff?.name?.toUpperCase(),
                            })
                        ),
                    ]}
                />

                <TextInput
                    w="100%"
                    placeholder="Course Lecturer"
                    value={courseLecturer}
                    required
                    label="Type course lecturer"
                    onChange={({ target: { value } }) =>
                        setCourseLecturer(value)
                    }
                />
            </Flex>
            <TextInput
                w="100%"
                label="Course Code"
                placeholder="Course Code"
                value={courseCode}
                required
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <TextInput
                w="100%"
                label="Course Name"
                placeholder="Course Name"
                value={courseName}
                required
                onChange={({ target: { value } }) => setCourseName(value)}
            />

            <Stack width="full">
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Upload Reciept</p>
                    <p className="ant-upload-text">
                        Click or drag your reciept to this area to upload
                    </p>
                </Dragger>
            </Stack>
            <Stack width={'full'}>
                <Button
                    colorScheme="green"
                    onClick={handleSubmit}
                    type="submit"
                >
                    {mutation.isLoading ? <Spinner /> : 'Submit'}
                </Button>
            </Stack>
        </VStack>
    );
};
