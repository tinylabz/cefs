import { SimpleGrid, Container, Heading } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { ComplaintCard } from '@/components/ComplaintCard';
import { cardData } from './Lecturer';

export default function Summary() {
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
