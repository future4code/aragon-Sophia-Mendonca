import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase"
import { StudentDatabase } from "../database/StudentDatabase"
import { IStudentDB } from "../models/Student"

export class StudentsController {
    public static TABLE_CLASSROOMS = "Labe_Classrooms"

    public async getAllTheStudents(request: Request, response: Response) {
        let errorCode = 400
        try {
            const studentDatabase = new StudentDatabase()
            const AllTheStudents = await studentDatabase.getAllStudents()
            response.status(200).send({ students: AllTheStudents })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public async createStudent(request: Request, response: Response) {
        let errorCode = 400
        try {
            const name = request.body.name
            const email = request.body.email
            const birthdate = request.body.birthdate
            const classroom_id = request.body.classroom_id
            if (!name || !email || !birthdate || !classroom_id) {
                throw new Error("Missing parameters.")
            }
            const student: IStudentDB = {
                id: Date.now().toString(),
                name: name,
                email: email,
                birthdate: new Date(birthdate),
                classroom_id: classroom_id
            }
            const studentDatabase = new StudentDatabase()
            await studentDatabase.createStudent(student)
            response.status(201).send({ message: "Student created successfully!" })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public async getNameStudent(request: Request, response: Response) {
        let errorCode = 400
        try {
            const search = request.query.id as string
            if (search) {
                const studentDatabase = new StudentDatabase()
                const foundNameStudent = await studentDatabase.getNameStudent()
                response.status(200).send({ message: "Student found in the system!", student: foundNameStudent })
            } else {
                const studentDatabase = new StudentDatabase()
                const result = await studentDatabase.getAllStudents()
                response.status(200).send({ students: result })
            }
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public async changeStudentClassroom(request: Request, response: Response) {
        let errorCode = 400
        try {
            const id = request.params.id as string
            const classroom_id = request.body.classroom_id as string
            if (!id || !classroom_id) {
                errorCode = 422
                throw new Error("Missing parameters.")
            }
            if (typeof classroom_id !== "string" || typeof id !== "string") {
                errorCode = 422
                throw new Error("Invalid typed parameters, must be string.")
            }
            const studentDatabase = new StudentDatabase()
            await studentDatabase.changeStudentClassroom(id, classroom_id)
            response.status(200).send({ message: " Classeoom successfully changed!" })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public async getStudentsClassroom(request: Request, response: Response) {
        let errorCode = 400
        try {
            const id = request.params.id as string
            if (!id) {
                errorCode = 422
                throw new Error("Missing parameters.")
            }
            const classroomDataBase = new ClassroomDatabase()
            const findClassrooms = await classroomDataBase.getActiveClassrooms(id)

            if (!findClassrooms[0]) {
                errorCode = 404
                throw new Error("Class not found.");
            }

            const studentDataBase = new StudentDatabase()
            const studentClassroom = await studentDataBase.getStudentsClassroom(id)
            response.status(200).send({ students: studentClassroom })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }
}