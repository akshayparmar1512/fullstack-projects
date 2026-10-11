import { AppDataSource } from "../db/data-source.js";
import { Student } from "../entities/Student.entity.js";
import { type NewStudentData } from "../types.js";
const studentRepository = AppDataSource.getRepository(Student)

// fetch all students from db
export async function getAllStudents() {

    const students = await studentRepository.find(
        {
            order:{
                created_at:"ASC"
            }
        }
    )
    return students

}

// create/add new student in db
export async function createNewStudent(student: NewStudentData) {
    try {
        const createdStudent = studentRepository.create({
            name: student.name,
            email: student.email,
            course: student.course,
            gender: student.gender,
            hobbies: student.hobbies

        })

        return await studentRepository.save(createdStudent)
    } catch (error:any) {

        if(error.code==="23505"){
            throw {status:409,message:"student with this email is already exists"}
        }
        throw error
    }
 
}

// fetch single student from db
export async function getSingleStudentById(studentId:string) {
       const student = await studentRepository.findOneBy({student_id:studentId}) 

       if(student === null){
        throw {status:404,message:"student not found"}
       }

       return student

}

export async function updateStudentById(studentId: string, updatedStudent: Partial<NewStudentData>) {
  try {
    return await studentRepository.update(studentId,updatedStudent)
  } catch (error:any) {
      if(error.code==="23505"){
            throw {status:409,message:"student with this email is already exists"}
        }
        throw error
  }
}

export async function deleteStudentById(studentId: string) {
        return await studentRepository.delete(studentId)
}