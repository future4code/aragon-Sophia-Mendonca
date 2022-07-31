import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase"
import { IClassroomDB } from "../models/Classroom"

export class ClassroomController {

    public static TABLE_CLASSROOMS = "Labe_Classrooms"

    public async createClassroom(request: Request, response: Response) {
        let errorCode = 400
        try {
            const name = request.body.name
            const module = request.body.module

            if (!name || !module) {
                throw new Error("Invalid parameter.")
            }

            const classroom: IClassroomDB = {
                id: Date.now().toString(),
                name: name,
                module: module
            }

            const classroomDatabase = new ClassroomDatabase()
            await classroomDatabase.createClassroom(classroom)

            response.status(200).send({ message: "Classroom created successfully!" })

        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }

    }
    public async getAllClassrooms(request: Request, response: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const allClassrooms = await classroomDatabase.getAllClassrooms()

            response.status(200).send({ classrooms: allClassrooms })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public async getActiveClassrooms(request: Request, response: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const list = await classroomDatabase.getAllClassrooms()

            const result = list.filter((item) => {
                return item.module !== "0"
            })

            response.status(200).send({ ActiveClassrooms: result })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public async changeClassroomModule(request: Request, response: Response) {
        let errorCode = 400
        try {
            const id = request.params.id
            const module = request.body.module

            if (module < 0 || module > 6) {
                errorCode = 422
                throw new Error("Invalid paramether")
            }

            const classroomDatabase = new ClassroomDatabase()
            await classroomDatabase.changeClassroomModule(id, module)

            response.status(201).send({ message: "Classroom module successfully changed!" })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }
}