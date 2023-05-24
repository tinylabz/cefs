import { SimpleGrid, Container, useToast } from '@chakra-ui/react';
// import 'firebase/storage';
// import firebase from 'firebase/app';
import { Page } from '@/components/Page';
import { useStore } from '@/state';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { type CardData, ComplaintCard } from '@/components/ComplaintCard';

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { DESIGNATIONS } from '@/types';
import { firebaseConfig } from '@/firebase';

const { Dragger } = Upload;

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
    const navigate = useNavigate();

    // firebase.initializeApp(firebaseConfig);

    const markSheetProps: UploadProps = {
        name: 'file',
        multiple: true,
        // action: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o`,
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
        // onChange(info) {
        //     const { status } = info.file;
        //     if (status !== 'uploading') {
        //         console.log(info.file, info.fileList);
        //     }
        //     if (status === 'done') {
        //         const fileRef = storageRef.child(info.file.name);
        //         fileRef
        //             .put(info.file.originFileObj)
        //             .then(() => {
        //                 toast({
        //                     status: 'success',
        //                     title: `${info.file.name} file uploaded successfully.`,
        //                     position: 'top',
        //                     isClosable: true,
        //                 });
        //             })
        //             .catch((error: any) => {
        //                 console.error('Error uploading file:', error);
        //                 toast({
        //                     status: 'error',
        //                     title: `${info.file.name} file upload failed.`,
        //                     position: 'top',
        //                     isClosable: true,
        //                 });
        //             });
        //     } else if (status === 'error') {
        //         toast({
        //             status: 'error',
        //             title: `${info.file.name} file upload failed.`,
        //             position: 'top',
        //             isClosable: true,
        //         });
        //     }
        // },
        onDrop(e) {
            e.preventDefault();
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const testAttendenceSheetProps: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'http://localhost:4000/api/upload/class-attendence',
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
            e.preventDefault();
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    useEffect(() => {
        if (!user && process.env.NODE_ENV !== 'development') {
            navigate('/signin');
        }

        if (
            user?.designation === DESIGNATIONS.STUDENT ||
            user?.designation === DESIGNATIONS.REGISTRAR
        ) {
            navigate('/');
        }
    }, []);
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

                <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={5} mb={4}>
                    <Dragger {...markSheetProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Upload Mark Sheets</p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Dragger>
                </SimpleGrid>
                <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5} mb={4}>
                    <Dragger {...testAttendenceSheetProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Upload Tests Attendence Sheets
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
                            Upload Exam Attendence Sheets
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
