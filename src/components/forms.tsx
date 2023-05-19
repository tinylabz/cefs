import { InboxOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { Button, Spinner, Stack, useToast, VStack } from '@chakra-ui/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';
import { useState } from 'react';
import { NATURE } from '@/types';
import { AxiosResponse } from 'axios';

export const MissingMark = () => {
    const toast = useToast();

    const [studentNumber, setStudentNumber] = useState<string>('');
    const [registrationNumber, setRegistrationNumber] = useState<string>('');
    const [courseCode, setCourseCode] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [academicYear, setAcademicYear] = useState<string>('');
    const [courseLecturer, setCourseLecturer] = useState<string>('');
    const [semester, setSemester] = useState<string>('');

    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/complaints', JSON.parse(data)),
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
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        mutation.mutate(
            JSON.stringify({
                studentNumber,
                registrationNumber,
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
                placeholder="Student Number"
                value={studentNumber}
                onChange={({ target: { value } }) => setStudentNumber(value)}
            />
            <Input
                placeholder="Registration Number"
                value={registrationNumber}
                onChange={({ target: { value } }) =>
                    setRegistrationNumber(value)
                }
            />
            <Input
                placeholder="Course Code"
                value={courseCode}
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <Input
                placeholder="Course Name"
                value={courseName}
                onChange={({ target: { value } }) => setCourseName(value)}
            />
            <Input
                placeholder="Academic Year of Sitting"
                value={academicYear}
                onChange={({ target: { value } }) => setAcademicYear(value)}
            />
            <Input
                placeholder="Semester"
                value={semester}
                onChange={({ target: { value } }) => setSemester(value)}
            />

            <Input
                placeholder="Course Lecturer"
                value={courseLecturer}
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
    const [studentNumber, setStudentNumber] = useState<string>('');
    const [registrationNumber, setRegistrationNumber] = useState<string>('');
    const [courseCode, setCourseCode] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [academicYearAllocated, setAcademicYearAllocated] =
        useState<string>('');
    const [correctAcademicYear, setCorrectAcademicYear] = useState<string>('');
    const toast = useToast();
    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/complaints', JSON.parse(data)),
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
                studentNumber,
                registrationNumber,
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
                placeholder="Student Number"
                value={studentNumber}
                onChange={({ target: { value } }) => setStudentNumber(value)}
            />
            <Input
                placeholder="Registration Number"
                value={registrationNumber}
                onChange={({ target: { value } }) =>
                    setRegistrationNumber(value)
                }
            />
            <Input
                placeholder="Course Code"
                value={courseCode}
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <Input
                placeholder="Course Name"
                value={courseName}
                onChange={({ target: { value } }) => setCourseName(value)}
            />
            <Input
                placeholder="Academic Year Allocated"
                value={academicYearAllocated}
                onChange={({ target: { value } }) =>
                    setAcademicYearAllocated(value)
                }
            />
            <Input
                placeholder="Correct Academic Year"
                value={correctAcademicYear}
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
    const [studentNumber, setStudentNumber] = useState<string>('');
    const [registrationNumber, setRegistrationNumber] = useState<string>('');
    const [courseCode] = useState<string>('');
    const [courseName] = useState<string>('');
    const [academicYearOfSitting, setAcademicYearOfSitting] =
        useState<string>('');

    const [courseLecturer, setCourseLecturer] = useState<string>('');
    const [semester, setSemester] = useState<string>('');
    const toast = useToast();
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                toast({
                    status: 'success',
                    title: `${info.file.name} file uploaded successfully.`,
                    position: 'top',
                    isClosable: true,
                });
            } else if (status === 'error') {
                toast({
                    status: 'success',
                    title: `${info.file.name} file upload failed.`,
                    position: 'top',
                    isClosable: true,
                });
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const { Dragger } = Upload;

    const qc = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/complaints', JSON.parse(data)),
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

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        mutation.mutate(
            JSON.stringify({
                studentNumber,
                registrationNumber,
                courseCode,
                courseLecturer,
                courseName,
                academicYearOfSitting,
                semester,
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
                placeholder="Student No"
                value={studentNumber}
                onChange={({ target: { value } }) => setStudentNumber(value)}
            />
            <Input
                placeholder="Registration No"
                value={registrationNumber}
                onChange={({ target: { value } }) =>
                    setRegistrationNumber(value)
                }
            />
            <Input
                placeholder="Academic Year Of Sitting"
                value={academicYearOfSitting}
                onChange={({ target: { value } }) =>
                    setAcademicYearOfSitting(value)
                }
            />
            <Input
                placeholder="Semester"
                value={semester}
                onChange={({ target: { value } }) => setSemester(value)}
            />
            <Input
                placeholder="Course Lecturer"
                value={courseLecturer}
                onChange={({ target: { value } }) => setCourseLecturer(value)}
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
