import { InboxOutlined } from '@ant-design/icons';
import { Input } from 'antd';
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
import { useState } from 'react';
import { NATURE } from '@/types';
import { AxiosResponse } from 'axios';
import { useStore } from '@/state';

export const MissingMark = () => {
    const toast = useToast();

    const [studentNumber, setStudentNumber] = useState<string>('');
    const [registrationNumber, setRegistrationNumber] = useState<string>('');
    const [courseCode, setCourseCode] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [academicYear, setAcademicYear] = useState<string>('');
    const [courseLecturer, setCourseLecturer] = useState<string>('');
    const [semester, setSemester] = useState<string>('');
    const { token } = useStore();
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
                required
                onChange={({ target: { value } }) => setStudentNumber(value)}
            />
            <Input
                placeholder="Registration Number"
                value={registrationNumber}
                required
                onChange={({ target: { value } }) =>
                    setRegistrationNumber(value)
                }
            />
            <Input
                placeholder="Course Code"
                value={courseCode}
                required
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <Input
                placeholder="Course Name"
                value={courseName}
                required
                onChange={({ target: { value } }) => setCourseName(value)}
            />
            <Input
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
    const [studentNumber, setStudentNumber] = useState<string>('');
    const [registrationNumber, setRegistrationNumber] = useState<string>('');
    const [courseCode, setCourseCode] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [academicYearAllocated, setAcademicYearAllocated] =
        useState<string>('');
    const [correctAcademicYear, setCorrectAcademicYear] = useState<string>('');
    const toast = useToast();
    const qc = useQueryClient();
    const { token } = useStore();
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
                required
                onChange={({ target: { value } }) => setStudentNumber(value)}
            />
            <Input
                placeholder="Registration Number"
                value={registrationNumber}
                required
                onChange={({ target: { value } }) =>
                    setRegistrationNumber(value)
                }
            />
            <Input
                placeholder="Course Code"
                value={courseCode}
                required
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <Input
                placeholder="Course Name"
                value={courseName}
                required
                onChange={({ target: { value } }) => setCourseName(value)}
            />
            <Input
                placeholder="Academic Year Allocated"
                value={academicYearAllocated}
                required
                onChange={({ target: { value } }) =>
                    setAcademicYearAllocated(value)
                }
            />
            <Input
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
    const [studentNumber, setStudentNumber] = useState<string>('');
    const [registrationNumber, setRegistrationNumber] = useState<string>('');
    const [courseCode, setCourseCode] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [academicYearOfSitting, setAcademicYearOfSitting] =
        useState<string>('');

    const [courseLecturer, setCourseLecturer] = useState<string>('');
    const [semester, setSemester] = useState<string>('');
    const [recieptURL, setRecieptURL] = useState<string>('');
    const toast = useToast();
    const { token } = useStore();

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
                placeholder="Student No"
                value={studentNumber}
                required
                onChange={({ target: { value } }) => setStudentNumber(value)}
            />
            <Input
                placeholder="Registration No"
                value={registrationNumber}
                required
                onChange={({ target: { value } }) =>
                    setRegistrationNumber(value)
                }
            />
            <Input
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
                placeholder="Course Lecturer"
                value={courseLecturer}
                required
                onChange={({ target: { value } }) => setCourseLecturer(value)}
            />
            <Input
                placeholder="Course Code"
                value={courseCode}
                required
                onChange={({ target: { value } }) => setCourseCode(value)}
            />
            <Input
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
