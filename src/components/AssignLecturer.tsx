import { useStore } from '@/state';
import { useToast } from '@chakra-ui/react';
import { Button, Select, Stack } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ReactNode, useState } from 'react';
import { axios } from '@/config/axios-config';
export const AssignLecturer = ({
    courseLecturer,
    studentId,
    complaintId,
}: {
    courseLecturer: string;
    studentId: string;
    complaintId: string;
}) => {
    const [lecturers, setLecturers] = useState<{ name: string }[]>([]);
    const [assignedLecturer, setAssignedLecturer] = useState<string>('');
    const { token } = useStore();

    const toast = useToast();

    useQuery({
        queryKey: ['lecturers'],
        queryFn: () =>
            axios.get('/staff', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),

        onSuccess: (res) => {
            setLecturers(res.data?.staffs);
        },
        onError: (err: AxiosError) => {
            toast({
                status: 'error',
                title: err.response?.data as ReactNode,
                position: 'top',
                isClosable: true,
            });
        },
    });

    const mutation = useMutation({
        mutationFn: (data: { lecturerName: string; studentId: string }) =>
            axios.post(`/assign-lecturer/${complaintId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSuccess: () => {
            toast({
                title: 'Successfully File complaint',
                status: 'success',
                isClosable: true,
                position: 'top',
            });
        },
        onError: (err: AxiosError) => {
            toast({
                title: err.response?.data as ReactNode,
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        },
    });

    return (
        <Stack>
            <Select
                value={assignedLecturer}
                onChange={(value) => setAssignedLecturer(value!)}
                label="Assign lecturer"
                placeholder="Assign lecturer to do a remark"
                data={
                    lecturers?.length !== 0
                        ? [
                              ...lecturers
                                  ?.filter(
                                      (lecturer) =>
                                          lecturer.name !== courseLecturer
                                  )
                                  .map((lecturer) => ({
                                      value: lecturer.name,
                                      label: lecturer.name.toUpperCase(),
                                  })),
                          ]
                        : []
                }
            />
            <Button
                onClick={() =>
                    mutation.mutate({
                        lecturerName: assignedLecturer,
                        studentId,
                    })
                }
            >
                Assign the Remark to this Lecturer
            </Button>
        </Stack>
    );
};
