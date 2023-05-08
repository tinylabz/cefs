import { SimpleGrid, Container } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { useStore } from '@/state';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { type CardData, ComplaintCard } from '@/components/ComplaintCard';
import Dnd from '@/components/Dnd';

const cardData: CardData[] = [
    {
        id: 1,
        label: 'You have 8 complaints',
        number: 2,
        icon: HiOutlineMail,
    },
    {
        id: 2,
        label: 'Pending Complaints',
        number: 1,
        icon: AiOutlineLike,
    },
    {
        id: 3,
        label: 'Resolved complaints',
        number: 4,
        icon: AiOutlineEye,
    },
];

export default function Lecturer() {
    const navigate = useNavigate();

    const { user } = useStore();
    useEffect(() => {
        if (!user && process.env.NODE_ENV !== 'development') {
            navigate('/login');
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
                <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5} mb={4}>
                    <Dnd />
                    <Dnd />
                </SimpleGrid>
            </Container>
        </Page>
    );
}
