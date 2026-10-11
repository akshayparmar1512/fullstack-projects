import axios from "axios";
import type { Student, StudentFormData } from "../studenttypes";


const API_URL = "http://localhost:3000/api/student"

export const getAllStudents = async ()=>{
    const response = await axios.get(API_URL)
    return response
}

export const addNewStudent = async (data:StudentFormData)=>{
    const response = await axios.post(API_URL,data)
    return response
}

export const updateSingleStudent = async (id:string,data:Partial<Student>)=>{
    const response = await axios.patch(`${API_URL}/${id}`,data)
    return response
}

export const deleteSingleStudent = async (id:string)=>{
    const response = await axios.delete(`${API_URL}/${id}`)
    return response

}