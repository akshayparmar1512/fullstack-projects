import type { Request, Response, NextFunction } from "express"
import { validate as isUUID } from "uuid"

function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.trim() !== ""
}

export function validateCreateStudent(req: Request, res: Response, next: NextFunction) {
    const body = req.body

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({
            success: false,
            message: "Request body is required"
        })
    }

    const { name, email, course, gender, hobbies } = body

    if (!isNonEmptyString(name)) {
        return res.status(400).json({ success: false, message: "name is required" })
    }

    if (!isNonEmptyString(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({ success: false, message: "valid email is required" })
    }

    if (!isNonEmptyString(course)) {
        return res.status(400).json({ success: false, message: "course is required" })
    }

    if (!isNonEmptyString(gender)) {
        return res.status(400).json({ success: false, message: "gender is required" })
    }

    if (!Array.isArray(hobbies) || !hobbies.every(isNonEmptyString)) {
        return res.status(400).json({
            success: false,
            message: "hobbies must be an array of non-empty strings"
        })
    }

    if (hobbies.some((hobby) => hobby.includes(","))) {
        return res.status(400).json({
            success: false,
            message: "hobbies must not contain commas"
        })
    }

    next()
}

export function validateUpdateStudent(req: Request, res: Response, next: NextFunction) {
    const body = req.body

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({ success: false, message: "Request body is required" })
    }

    const { name, email, course, gender, hobbies } = body

    if (name === undefined && email === undefined && course === undefined && gender === undefined && hobbies === undefined) {
        return res.status(400).json({ success: false, message: "Send at least one field to update" })
    }

    if (name !== undefined && !isNonEmptyString(name)) {
        return res.status(400).json({ success: false, message: "name must be a non-empty string" })
    }

    if (email !== undefined && (!isNonEmptyString(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))) {
        return res.status(400).json({ success: false, message: "valid email is required" })
    }

    if (course !== undefined && !isNonEmptyString(course)) {
        return res.status(400).json({ success: false, message: "course must be a non-empty string" })
    }

    if (gender !== undefined && !isNonEmptyString(gender)) {
        return res.status(400).json({ success: false, message: "gender must be a non-empty string" })
    }

    if (hobbies !== undefined && (!Array.isArray(hobbies) || !hobbies.every(isNonEmptyString) || hobbies.some((h) => h.includes(",")))) {
        return res.status(400).json({ success: false, message: "hobbies must be an array of non-empty strings without commas" })
    }

    next()
}



export function validateStudentId(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    if (!isUUID(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid student id" })
    }

    next()
}