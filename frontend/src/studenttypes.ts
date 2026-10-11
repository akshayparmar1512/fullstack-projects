import type { ChangeEvent } from "react";

export interface StudentFormData {
    name: string;
    email: string;
    course: string;
    gender: string;
    hobbies: string[];
}

export interface Student {
    student_id: string;
    name: string;
    email: string;
    course: string;
    gender: string;
    hobbies: string[];
}

export interface InputProps {
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchtext: string;
}