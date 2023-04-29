import { Page } from '@/components/Page';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Center,
    Container,
    Stack,
    Text,
} from '@chakra-ui/react';

export default function Faqs() {
    const faqs = [
        {
            heading: 'How can I submit my complaint ?',
            content:
                'You can submit your complaint by visiting our website and filling the complaint form',
        },
        {
            heading: 'what information do I need to submit my complaint?',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            heading:
                'Will I recieve a notification email after submitting my complaint?',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            heading:
                "What's the expected response time for the submitted complaint?",
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            heading: 'How can I track the progress of my complaint?',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            heading: 'Can I remain anonymous when submitting my complaint?',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
