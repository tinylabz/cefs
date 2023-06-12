import { SimpleGrid, Container } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { type CardData, ComplaintCard } from '@/components/ComplaintCard';

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';

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

import { useState } from 'react';
import { useStore } from '@/state';
import { useToast } from '@chakra-ui/react';

export default function Lecturer() {
    const toast = useToast();
    const { token, user } = useStore();

    const markSheetProps: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'http://localhost:4000/api/upload/marks',
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
        action: 'http://localhost:4000/api/upload/exam-attendence',
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
        action: 'http://localhost:4000/api/upload/test-attendence',
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
                            Upload Attendance sheets
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Dragger>
                    <Dragger {...examAttendenceSheetProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Upload Mark Sheets</p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Dragger>
                </SimpleGrid>
            </Container>
        </Page>
    );
}
