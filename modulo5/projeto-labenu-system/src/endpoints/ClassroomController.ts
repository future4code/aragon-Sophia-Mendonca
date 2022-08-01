import { Request, Response } from "express"
import { BaseDatabase } from "../database/BaseDatabase"
import { ClassroomDatabase } from "../database/ClassroomDatabase"
import { IClassroomDB } from "../models/Classroom"

export class ClassroomController extends BaseDatabase {
    public static TABLE_CLASSROOMS = "Labe_Classrooms"

    public async getAllTheClassrooms(request: Request, response: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const allTheClassrooms = await classroomDatabase.getAllClassrooms()
            response.status(200).send({ classrooms: allTheClassrooms })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

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

    public async getActiveClassrooms(request: Request, response: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const list = await classroomDatabase.getAllClassrooms()

            const activeClassrooms = list.filter((item) => {
                return item.module !== "0"
            })
            response.status(200).send({ ActiveClassrooms: activeClassrooms })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public async changeClassroomModule(request: Request, response: Response) {
        let errorCode = 400
        try {
            const classroomId = request.params.classroomId
            const module = request.body.module
            const [classroom] = await BaseDatabase.connection(ClassroomController.TABLE_CLASSROOMS)
                .select()
                .where("id", "=", `${classroomId}`)
            const classroomFound = classroom
            console.log(classroom)
            if (!classroomFound) {
                errorCode = 404
                throw new Error("Classroom does not exist.")
            }
            if (typeof module !== "string") {
                errorCode = 404
                throw new Error("'module' must to be a string")
            }
            const classroomDatabase = new ClassroomDatabase()
            await classroomDatabase.changeClassroomModule(classroomId, module)
            response.status(201).send({ message: `Classroom module ${classroom.name} successfully changed!` })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

}