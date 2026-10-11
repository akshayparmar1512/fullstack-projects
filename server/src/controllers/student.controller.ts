import { type Request, type Response } from "express";
import { createNewStudent, deleteStudentById, getAllStudents, getSingleStudentById, updateStudentById } from "../services/student.service.js";
import type { NewStudentData } from "../types.js";

export async function getStudents(req: Request, res: Response) {

    try {
        const allStudents = await getAllStudents()
        return res.status(200).json({
            success: true,
            data: allStudents
        })

    } catch (error: any) {
        console.error(error)

        const status = error.status || 500

       return res.status(status).json({
            success: false,
            message: status === 500 ? "something went wrong" : error.message
        })
    }
}



export async function createStudent(req: Request, res: Response) {
    try {
        const student = req.body
        const resultAfterStudentCreate = await createNewStudent(student)

        return res.status(201).json({
            success: true,
            message: "student created successfully"
        })

    } catch (error: any) {
        console.error(error)

        const status = error.status || 500

        return res.status(status).json({
            success: false,
            message: status === 500 ? "something went wrong due to create new student" : error.message
        })
    }

}

export async function getStudentById(req: Request<{ id: string }>, res: Response) {
    try {

        const id = req.params.id
        const student = await getSingleStudentById(id)

        return res.status(200).json({
            success: true,
            data: student,
            message: "student found succesfully"
        })

    } catch (error: any) {
        console.error(error)

        const status = error.status || 500

        return res.status(status).json({
            success: false,
            message: status === 500 ? "something went wrong" : error.message
        })
    }
}



export async function updateStudent(req: Request<{ id: string }>, res: Response) {
    try {
        const id = req.params.id
        const studentdata = req.body
        const data: Partial<NewStudentData> = {}

        if (studentdata.name !== undefined) data.name = studentdata.name
        if (studentdata.email !== undefined) data.email = studentdata.email
        if (studentdata.course !== undefined) data.course = studentdata.course
        if (studentdata.gender !== undefined) data.gender = studentdata.gender
        if (studentdata.hobbies !== undefined) data.hobbies = studentdata.hobbies

        const result = await updateStudentById(id, data)
        if (result.affected === 1) {
           return res.status(200).json({
                success: true,
                message: "student updated succesfully"
            })
        }else{
            return res.status(404).json({
                success:false,
                message:"student to update was not found"
            })
        }

    } catch (error:any) {
        console.error(error)

        const status = error.status || 500

        return res.status(status).json({
            success: false,
            message: status === 500 ? "something went wrong" : error.message
        })
    }
}



export async function deleteStudent(req: Request<{ id: string }>, res: Response) {
    try {
        const id = req.params.id
        const resultAfterDelete = await deleteStudentById(id)
        if (resultAfterDelete.affected === 1) {
           return res.status(200).json({
                success: true,
                message: "student deleted succesfully"
            })
        } else {
           return res.status(404).json({
                success: false,
                message: "student to delete was not found"
            })
        }
    } catch (error:any) {
           console.error(error)

        const status = error.status || 500

        return res.status(status).json({
            success: false,
            message: status === 500 ? "something went wrong" : error.message
        })
    }

}