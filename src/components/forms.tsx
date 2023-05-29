import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import {
    Button,
    Spinner,
    Stack,
    useToast,
    Select,
    VStack,
} from '@chakra-ui/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';
import { ReactNode, useState } from 'react';
import { NATURE } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useStore } from '@/state';
import { Input } from '@mantine/core';

export const MissingMark = () => {
    const toast = useToast();

    const [courseCode, setCourseCode] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [academicYear, setAcademicYear] = useState<string>('');
    const [courseLecturer, setCourseLecturer] = useState<string>('');
    const [semester, setSemester] = useState<string>('');
    const { token, user } = useStore();
    const qc = useQueryClient();

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
            <Input
                w="100%"
                placeholder="Student Number"
                value={user?.studentNumber}
            />
            <Input
                w="100%"
                placeholder="Registration Number"
                value={user?.registrationNumber}
            />
            <Input
                w="100%"
                placeholder="Course Code"
                value={courseCode}
                required
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <Input
                w="100%"
                placeholder="Course Name"
                value={courseName}
                required
                onChange={({ target: { value } }) => setCourseName(value)}
            />
            <Input
                w="100%"
                placeholder="Academic Year of Sitting"
                value={academicYear}
                required
                onChange={({ target: { value } }) => setAcademicYear(value)}
            />
            <Select
                onChange={({ target: { value } }) => setSemester(value)}
                placeholder="Semester"
                defaultValue="Select Semester"
                value={semester}
                style={{ width: '100%' }}
            >
                <option value="ONE">One</option>
                <option value="TWO">Two</option>
                <option value="THREE">Three</option>
            </Select>

            <Input
                w="100%"
                placeholder="Course Lecturer"
                value={courseLecturer}
                required
                onChange={({ target: { value } }) => setCourseLecturer(value)}
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
            <Input
                w="100%"
                placeholder="Student Number"
                value={user?.studentNumber}
            />
            <Input
                w="100%"
                placeholder="Registration Number"
                value={user?.registrationNumber}
            />
            <Input
                w="100%"
                placeholder="Course Code"
                value={courseCode}
                required
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <Input
                w="100%"
                placeholder="Course Name"
                value={courseName}
                required
                onChange={({ target: { value } }) => setCourseName(value)}
            />
            <Input
                w="100%"
                placeholder="Academic Year Allocated"
                value={academicYearAllocated}
                required
                onChange={({ target: { value } }) =>
                    setAcademicYearAllocated(value)
                }
            />
            <Input
                w="100%"
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

    const qc = useQueryClient();
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
            <Input
                w="100%"
                placeholder="Student No"
                value={user?.studentNumber}
            />
            <Input
                w="100%"
                placeholder="Registration No"
                value={user?.registrationNumber}
            />
            <Input
                w="100%"
                placeholder="Academic Year Of Sitting"
                value={academicYearOfSitting}
                required
                onChange={({ target: { value } }) =>
                    setAcademicYearOfSitting(value)
                }
            />
            <Select
                onChange={({ target: { value } }) => setSemester(value)}
                placeholder="Semester"
                defaultValue="Select Semester"
                value={semester}
                style={{ width: '100%' }}
            >
                <option value="ONE">One</option>
                <option value="TWO">Two</option>
                <option value="THREE">Three</option>
            </Select>

            <Input
                w="100%"
                placeholder="Course Lecturer"
                value={courseLecturer}
                required
                onChange={({ target: { value } }) => setCourseLecturer(value)}
            />
            <Input
                w="100%"
                placeholder="Course Code"
                value={courseCode}
                required
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <Input
                w="100%"
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
