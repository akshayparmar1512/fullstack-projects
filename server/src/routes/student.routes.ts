import { Router } from "express";
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../controllers/student.controller.js";
import { validateCreateStudent, validateStudentId, validateUpdateStudent } from "../middlewares/student.middleware.js";

export const router = Router()

router.get("/",getStudents)
router.get("/:id",validateStudentId,getStudentById)
router.post("/",validateCreateStudent,createStudent)
router.patch("/:id",validateStudentId,validateUpdateStudent,updateStudent)
router.delete("/:id",validateStudentId,deleteStudent)