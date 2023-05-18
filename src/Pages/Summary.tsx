import { SimpleGrid, Container, Heading } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { useStore } from '@/state';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { type CardData, ComplaintCard } from '@/components/ComplaintCard';

const cardData: CardData[] = [
    {
        id: 1,
        label: 'Complaints submitted',
        number: 2,
        icon: HiOutlineMail,
        status:undefined,
        href:"/list"
    },
    {
        id: 2,
        label: 'Complaints resolved',
        number: 1,
        icon: AiOutlineLike,
        status:"RESOLVED",
        href:"/list"
    },
    {
        id: 3,
        label: 'PENDING complaints',
        number: 4,
        icon: AiOutlineEye,
        status:"PENDING",
        href:"/list"
    },
];

export default function Summary() {
    const navigate = useNavigate();

    const { user } = useStore();
    useEffect(() => {
        if (!user && process.env.NODE_ENV !== 'development') {
            navigate('/signin');
        }
    }, []);
    return (
        <Page>
            <Heading mb={'5'}>A Quick Summary Of Your Complaints</Heading>
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
            </Container>
        </Page>
    );
}
