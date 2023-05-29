import { Configuration, OpenAIApi } from 'openai';

export const chatCompletion = async (intent: string) => {
    const configuration = new Configuration({
        organization: 'org-pR8KdvBVyrz67OHDBtbkC9QN',
        apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    return await openai.createChatCompletion({
        model: 'gpt-3.5-turbo-0301',
        messages: [
            {
                role: 'system',
                content:
                    'You are a helpful assistant who respond in one sentence.',
            },
            {
                role: 'user',
                content: intent,
            },
        ],
    });
};
