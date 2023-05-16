// @ts-nocheck
import { Input } from 'antd';

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

import { Button, Spinner, Stack, VStack } from '@chakra-ui/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';
import { useState } from 'react';

export const MissingMark = () => {
    const [studentNumber, setStudentNumber] = useState();
    const [registrationNumber, setRegistrationNumber] = useState();
    const [courseCode, setCourseCode] = useState();
    const [courseName, setCourseName] = useState();
    const [academicYear, setAcademicYear] = useState();
    const [courseLecturer, setCourseLecturer] = useState();
    const [semester, setSemester] = useState();

    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: string) => {
            axios.post('/complaints', JSON.parse(data));
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['complaints'] });
        },
    });
    const handleSubmit = (e) => {
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
                nature: 'MISSING_MARK',
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
                    onClick={handleSubmit}
                    type="submit"
                >
                    {mutation.isLoading ? <Spinner /> : 'Submit'}
                </Button>
            </Stack>
        </VStack>
    );
};

export const WrongAcademicYear = () => {
    const [studentNumber, setStudentNumber] = useState();
    const [registrationNumber, setRegistrationNumber] = useState();
    const [courseCode, setCourseCode] = useState();
    const [courseName, setCourseName] = useState();
    const [academicYearAllocated, setAcademicYearAllocated] = useState();
    const [correctAcademicYear, setCorrectAcademicYear] = useState();

    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/complaints', JSON.parse(data)),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['complaints'] });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(
            JSON.stringify({
                studentNumber,
                registrationNumber,
                courseCode,
                courseName,
                correctAcademicYear,
                academicYearAllocated,
                nature: 'WRONG_ACADEMIC_YEAR',
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
                    onClick={handleSubmit}
                    type="submit"
                >
                    {mutation.isLoading ? <Spinner /> : 'Submit'}
                </Button>
            </Stack>
        </VStack>
    );
};

export const Remark = () => {
    const [studentNumber, setStudentNumber] = useState();
    const [registrationNumber, setRegistrationNumber] = useState();
    const [courseCode, setCourseCode] = useState();
    const [courseName, setCourseName] = useState();
    const [academicYearOfSitting, setAcademicYearOfSitting] = useState();
    const [courseLecturer, setCourseLecturer] = useState();
    const [semester, setSemester] = useState();

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
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
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
        },
    });

    const handleSubmit = (e) => {
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
                nature: 'REMARK',
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
