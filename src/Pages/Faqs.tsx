import { Page } from '@/components/Page';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Container,
    Stack,
    Text,
} from '@chakra-ui/react';

export default function Faqs() {
    const faqs = [
        {
            heading: 'Where can i get help ?',
            content:
                'The system has a chatbot which uses artifical intelligence to repond to any questions and canalso further guide you ',
        },
        {
            heading: 'How can I submit my complaint ?',
            content:
                'You can submit your complaint by visiting our website and filling the complaint form',
        },
        {
            heading: 'what information do I need to submit my complaint?',
            content:
                'The kind of information needed to register a complaint depends on the type of complaint you want to submit but below is the required information; Course code, course name, lecturers name, academic year,type of complaint to be filed , a receipt if you are filing for a remark.',
        },
        {
            heading:
                'Will I recieve a notification email after submitting my complaint?',
            content:
                'A notification inform of an email will be sent to the registered email upon every progress of the complaint i.e when it is submitted and when it is resolved or a comment when it wasnt successfully resolved',
        },
        {
            heading:
                "What's the expected response time for the submitted complaint?",
            content:
                'The expected response time is an average of a day',
        },
        {
            heading: 'How can I track the progress of my complaint?',
            content:
                'The system automatically sends notifications inform of email and also activity progress in the interface',
        },
        {
            heading: 'Can I remain anonymous when submitting my complaint?',
            content:
                'Yes. The students name remains unknown to the lecturer since the complaint is submitted by a registration number and student number',
        },
    ];
    return (
        <Page>
            <Container maxW={'container.xl'}>
                <Stack spacing={4}>
                    <Text align={'center'} fontSize={'4xl'}>
                        Frequently Asked Questions
                    </Text>
                    <Accordion allowToggle>
                        {faqs.map(({ content, heading }, idx) => (
                            <AccordionItem key={idx.toString()}>
                                <h2>
                                    <AccordionButton>
                                        <Box
                                            as="span"
                                            flex="1"
                                            textAlign="left"
                                        >
                                            {heading}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {content}
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Stack>
            </Container>
        </Page>
    );
}
