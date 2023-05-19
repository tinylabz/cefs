import { Button, useToast, Wrap, WrapItem } from '@chakra-ui/react';

type Status = 'success' | 'error' | 'warning' | 'info';

export const Toast = ({
    message,
    status,
}: {
    message: string;
    status: Status;
}) => {
    const toast = useToast();

    return (
        <Wrap>
            <WrapItem>
                <Button
                    onClick={() =>
                        toast({
                            title: `${message}`,
                            status: status,
                            isClosable: true,
                        })
                    }
                >
                    Show {status} toast
                </Button>
            </WrapItem>
        </Wrap>
    );
};
