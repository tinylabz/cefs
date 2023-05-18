import { SimpleGrid, Container } from '@chakra-ui/react';

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
        icon: HiOutlineMail,
        href: '/list',
        status:undefined
    },
    {
        id: 2,
        label: 'Complaints resolved',
        icon: AiOutlineLike,
        href: '/list',
        status:"RESOLVED"
    },
    {
        id: 3,
        label: 'PENDING complaints',
        icon: AiOutlineEye,
        href: '/list',
        status:"PENDING"
    },
];

export default function Home() {
    const navigate = useNavigate();

    const { user } = useStore();
    useEffect(() => {
        if (!user && process.env.NODE_ENV !== 'development') {
            navigate('/signin');
        }

        console.log(user);
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
            </Container>
        </Page>
    );
}
