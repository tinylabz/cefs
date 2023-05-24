export interface Complaint {
    createdAt: string;
    updatedAt: string;
    _id: string;
    courseCode?: string;
    courseName?: string;
    recieptURL?: string;
    studentNumber: string;
    courseLecturer?: string;
    registrationNumber: string;
    correctAcademicYear?: string;
    academicYearOfSitting?: string;
    academicYearAllocated?: string;
    semester?: 'ONE' | 'TWO' | 'THREE';
    nature?: 'REMARK' | 'MISSING MARK' | 'WRONG ACADEMIC YEAR';
    status?: 'PENDING' | 'RESOLVED';
    studentId?: string;
}

export enum NATURE {
    MISSING_MARK = 'MISSING MARKS',
    REMARK = 'REMARK',
    WRONG_ACADEMIC_YEAR = 'WRONG ACADEMIC YEAR',
}

export enum DESIGNATIONS {
    STUDENT = 'STUDENT',
    LECTURER = 'LECTURER',
    REGISTRAR = 'REGISTRAR',
    HOD = 'HOD',
}

export enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum SEMESTER {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE',
}

export enum COMPLAINT_STATUSES {
    SUBMITTED = 'SUBMITTED',
    PENDING = 'PENDING',
    RESOLVED = 'RESOLVED',
}
