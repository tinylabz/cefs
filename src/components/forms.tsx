import { Input } from 'antd';

import Dnd from '@/components/Dnd';
import { useForm } from 'react-hook-form';
import { VStack } from '@chakra-ui/react';

export const MissingMark = () => {
    const { handleSubmit, register } = useForm();

    return (
        <VStack
            as="form"
            onSubmit={handleSubmit((data) => JSON.stringify(data))}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            rounded="lg"
        >
            <VStack spacing={15} w="100%">
                <Input
                    {...register('studentNumber')}
                    placeholder="Student Number"
                    type="text"
                />
                <Input
                    {...register('registrationNumber')}
                    placeholder="Registration Number"
                    type="text"
                />
                <Input
                    {...register('courseCode')}
                    placeholder="Course Code"
                    type="text"
                />
                <Input
                    {...register('courseName')}
                    placeholder="Course Name"
                    type="text"
                />
                <Input
                    {...register('academicYear')}
                    placeholder="Academic Year of Sitting"
                    type="text"
                />
                <Input
                    {...register('semester')}
                    placeholder="Semester"
                    type="text"
                />

                <Input
                    {...register('courseLecturer')}
                    placeholder="Course Lecturer"
                    type="text"
                />
            </VStack>
        </VStack>
    );
};

export const WrongAcademicYear = () => {
    const { handleSubmit, register } = useForm();

    return (
        <VStack
            as="form"
            onSubmit={handleSubmit((data) => JSON.stringify(data))}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            rounded="lg"
        >
            <VStack spacing={15} w="100%">
                <Input
                    {...register('studentNumber')}
                    placeholder="Student Number"
                    type="text"
                />
                <Input
                    {...register('registrationNumber')}
                    placeholder="Registration Number"
                    type="text"
                />
                <Input
                    {...register('courseCode')}
                    placeholder="Course Code"
                    type="text"
                />
                <Input
                    {...register('courseName')}
                    placeholder="Course Name"
                    type="text"
                />
                <Input
                    {...register('academicYearAllocated')}
                    placeholder="Academic Year Allocated"
                    type="text"
                />
                <Input
                    {...register('correctAcademicYear')}
                    placeholder="Correct Academic Year"
                    type="text"
                />
            </VStack>
        </VStack>
    );
};

export const Remark = () => {
    const { handleSubmit, register } = useForm();

    return (
        <VStack
            as="form"
            onSubmit={handleSubmit((data) => JSON.stringify(data))}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            rounded="lg"
        >
            <VStack spacing={4} w="100%">
                <Input
                    {...register('academicYearOfSitting')}
                    placeholder="Academic Year Of Sitting"
                    type="text"
                />
                <Input
                    {...register('Semester')}
                    placeholder="semester"
                    type="text"
                />
                <Input
                    {...register('courseLecturer')}
                    placeholder="Course Lecturer"
                    type="text"
                />

                <Dnd />
            </VStack>
        </VStack>
    );
};
