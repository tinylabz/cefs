import { SimpleGrid, Container } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { type CardData, ComplaintCard } from '@/components/ComplaintCard';

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { useStore } from '@/state';
import { useToast } from '@chakra-ui/react';
import { baseURL } from '@/config/axios-config';

console.log('ROUTE: ', baseURL);

export const cardData: CardData[] = [
    {
        label: 'Total complaints',
        status: undefined,
        icon: HiOutlineMail,
        href: '/list',
    },
    {
        label: 'PENDING Complaints',
        status: 'PENDING',
        icon: AiOutlineLike,
        href: '/list',
    },
    {
        status: 'RESOLVED',
        label: 'RESOLVED complaints',
        icon: AiOutlineEye,
        href: '/list',
    },
];

export default function Lecturer() {
    const toast = useToast();
    const { token, user } = useStore();

    const markSheetProps: UploadProps = {
        name: 'file',
        multiple: true,
        action: `${baseURL}/api/upload/marks`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        beforeUpload(file) {
            const fileSizeInMB = file.size / 1024 / 1024;
            const allowedExtensions = ['.xls', '.xlsx'];
            if (fileSizeInMB > 5) {
                toast({
                    status: 'error',
                    title: `${file.name} exceeds the maximum file size of 5MB.`,
                    position: 'top',
                    isClosable: true,
                });
                return false; // Prevent upload
            }
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!allowedExtensions.includes(`.${fileExtension}`)) {
                toast({
                    status: 'error',
                    title: `Invalid file format. Only Excel files are allowed.`,
                    position: 'top',
                    isClosable: true,
                });
                return false; // Prevent upload
            }
            return true; // Proceed with upload
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                toast({
                    status: 'success',
                    title: `${info.file.name} marks uploaded successfully.`,
                    position: 'top',
                    isClosable: true,
                });
                console.log('RES: ', info.file.response?.file?.path);
            } else if (status === 'error') {
                toast({
                    status: 'success',
                    title: `${info.file.name} marks upload failed.`,
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
    const examAttendenceSheetProps: UploadProps = {
        name: 'file',
        multiple: true,
        action: `${baseURL}/api/upload/exam-attendence`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        beforeUpload(file) {
            const fileSizeInMB = file.size / 1024 / 1024;
            const allowedExtensions = ['.xls', '.xlsx'];
            if (fileSizeInMB > 5) {
                toast({
                    status: 'error',
                    title: `${file.name} exceeds the maximum file size of 5MB.`,
                    position: 'top',
                    isClosable: true,
                });
                return false; // Prevent upload
            }
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!allowedExtensions.includes(`.${fileExtension}`)) {
                toast({
                    status: 'error',
                    title: `Invalid file format. Only Excel files are allowed.`,
                    position: 'top',
                    isClosable: true,
                });
                return false; // Prevent upload
            }
            return true; // Proceed with upload
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                toast({
                    status: 'success',
                    title: `${info.file.name} exam attendence sheet uploaded successfully.`,
                    position: 'top',
                    isClosable: true,
                });
                console.log('RES: ', info.file.response?.file?.path);
            } else if (status === 'error') {
                toast({
                    status: 'success',
                    title: `${info.file.name} exam attendence sheet upload failed.`,
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
    const testAttendenceSheetProps: UploadProps = {
        name: 'file',
        multiple: true,
        action: `${baseURL}/api/upload/test-attendence`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        beforeUpload(file) {
            const fileSizeInMB = file.size / 1024 / 1024;
            const allowedExtensions = ['.xls', '.xlsx'];
            if (fileSizeInMB > 5) {
                toast({
                    status: 'error',
                    title: `${file.name} exceeds the maximum file size of 5MB.`,
                    position: 'top',
                    isClosable: true,
                });
                return false; // Prevent upload
            }
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!allowedExtensions.includes(`.${fileExtension}`)) {
                toast({
                    status: 'error',
                    title: `Invalid file format. Only Excel files are allowed.`,
                    position: 'top',
                    isClosable: true,
                });
                return false; // Prevent upload
            }
            return true; // Proceed with upload
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                toast({
                    status: 'success',
                    title: `${info.file.name} test attendence sheet uploaded successfully.`,
                    position: 'top',
                    isClosable: true,
                });
                console.log('RES: ', info.file.response?.file?.path);
            } else if (status === 'error') {
                toast({
                    status: 'success',
                    title: `${info.file.name} test attendence sheet upload failed.`,
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

    return (
        <Page>
            <Container maxW="7xl">
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3 }}
                    spacing={5}
                    mb={4}
                >
                    {cardData.map((data, index) => (
                        <ComplaintCard key={index} data={data} />
                    ))}
                </SimpleGrid>
                <Dragger {...markSheetProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Upload Mark/Result sheets</p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                </Dragger>
                <SimpleGrid
                    mt={{ sm: '1em', md: '1em' }}
                    columns={{ sm: 1, md: 2 }}
                    spacing={5}
                    mb={4}
                >
                    <Dragger {...testAttendenceSheetProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Upload Test Attendance sheets
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Dragger>
                    <Dragger {...examAttendenceSheetProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Upload Exam attendence sheets
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Dragger>
                </SimpleGrid>
            </Container>
        </Page>
    );
}
