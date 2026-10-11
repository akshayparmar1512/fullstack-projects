
import type { Student, StudentFormData } from "../studenttypes";
import api from "../api/axios";


// const API_URL = "http://localhost:3000/api/student"
const API = "/api/student"

export const getAllStudents = async ()=>{
    const response = await api.get(API)
    return response
}

export const addNewStudent = async (data:StudentFormData)=>{
    const response = await api.post(API,data)
    return response
}

export const updateSingleStudent = async (id:string,data:Partial<Student>)=>{
    const response = await api.patch(`${API}/${id}`,data)
    return response
}

export const deleteSingleStudent = async (id:string)=>{
    const response = await api.delete(`${API}/${id}`)
    return response

}