import { SimpleGrid, Container, Toast, useToast } from '@chakra-ui/react';

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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';

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

    const UploadProps: UploadProps = {
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
                    status: 'error',
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

    const navigate = useNavigate();

    const qc = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => axios.post('/upload', {}),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ['files'],
            });
            toast({
                title: 'Files uploaded',
                status: 'success',
                isClosable: true,
                position: 'top',
            });
        },
        onError: () => {
            toast({
                title: 'Error during upload',
                status: 'success',
                isClosable: true,
                position: 'top',
            });
        },
    });

    const { user } = useStore();
    useEffect(() => {
        if (!user && process.env.NODE_ENV !== 'development') {
            navigate('/signin');
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
                <SimpleGrid
                    mt={{ sm: '1em', md: '12em' }}
                    columns={{ sm: 1, md: 2 }}
                    spacing={5}
                    mb={4}
                >
                    <Dragger {...UploadProps}>
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
                    <Dragger {...UploadProps}>
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
