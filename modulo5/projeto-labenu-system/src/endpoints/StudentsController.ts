import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase"
import { StudentDatabase } from "../database/StudentDatabase"
import { IStudentDB } from "../models/Student"

export class StudentsController {

    public async createStudent(request: Request, response: Response) {
        let errorCode = 400
        try {

            const name = request.body.name
            const email = request.body.email
            const birthdate = request.body.birthdate
            const classroom_id = request.body.classrom_id

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
            const studentDatabase = new StudentDatabase()
            const query = request.query.q

            if (typeof query === "string") {
                const NameStudent = await studentDatabase.getAllStudents()
                return response.status(200).send({ students: NameStudent })
            }

        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public async changeStudentClassrooom(request: Request, response: Response) {
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
            const result = await studentDatabase.changeStudentClassroom(id, classroom_id)

            response.status(200).send({ message: "Successfully changed class!" })

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
            const findClass = await classroomDataBase.verificationClass(id)

            if (!findClass[0]) {
                errorCode = 404
                throw new Error("Class not found.");
            }

            const studentDataBase = new StudentDatabase()
            const result = await studentDataBase.getStudentsClassroom(id)

            response.status(200).send({ students: result })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

}