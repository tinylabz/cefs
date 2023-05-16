// @ts-nocheck
import { SimpleGrid, Container } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { useStore } from '@/state';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { type CardData, ComplaintCard } from '@/components/ComplaintCard';

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const cardData: CardData[] = [
    {
        id: 1,
        label: 'Total complaints',
        status: undefined,
        number: 2,
        icon: HiOutlineMail,
        href: '/list',
    },
    {
        id: 2,
        label: 'PENDING Complaints',
        number: 1,
        status: 'PENDING',
        icon: AiOutlineLike,
        href: '/list',
    },
    {
        id: 3,
        status: 'RESOLVED',
        label: 'RESOLVED complaints',
        number: 4,
        icon: AiOutlineEye,
        href: '/list',
    },
];

const markSheetProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const attendenceSheetProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export default function Lecturer() {
    const navigate = useNavigate();

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
                    <Dragger {...markSheetProps}>
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
                    <Dragger {...attendenceSheetProps}>
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
