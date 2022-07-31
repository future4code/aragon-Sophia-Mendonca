import { IStudentDB, Student } from "../models/Student";
import { BaseDatabase } from "./BaseDatabase";
import { students } from "./migrations/data";

export class StudentDatabase extends BaseDatabase {

    public static TABLE_STUDENTS = "Labe_Students"
    public static TABLE_HOBBIES = "Labe_Hobbies"
    public static TABLE_STUDENTS_HOBBIES = "Students_Hobbies"
    public static TABLE_CLASSROOMS = "Labe_Classrooms"

    public async createStudent(students: IStudentDB) {
        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .insert({
                id: students.id,
                name: students.name,
                email: students.email,
                birthdate: students.birthdate,
                classroom_id: students.classroom_id
            })
    }

    public async getAllStudents() {
        const AllStudents = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()

        return AllStudents
    }

    public async getNameStudent() {
        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .insert(students)
    }

    public async editStudentClassroom(Student: Student, newClassroomId: string) {
        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .update({ classroom_id: newClassroomId })
    }

    public async changeStudentClassroom(id: string, classroom_id: string) {
        const result = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .where({ id: id })
            .update({ classroom_id: classroom_id })

        return result
    }

    public async getStudentsClass(id: string) {
        const [result] = await BaseDatabase
            .connection.raw(`
        SELECT
            ${StudentDatabase.TABLE_STUDENTS}.id,
            ${StudentDatabase.TABLE_STUDENTS}.name,
            ${StudentDatabase.TABLE_STUDENTS}.email
        FROM ${StudentDatabase.TABLE_CLASSROOMS}
        JOIN ${StudentDatabase.TABLE_STUDENTS}
        ON ${StudentDatabase.TABLE_STUDENTS}.classroom_id = ${StudentDatabase.TABLE_CLASSROOMS}.id,
        WHERE ${StudentDatabase.TABLE_CLASSROOMS}.id = ${id};`)

        return result
    }

    public async getStudentsClassroom(id: string) {
        const [result] = await BaseDatabase
            .connection.raw(`
            SELECT
                ${StudentDatabase.TABLE_STUDENTS}.id,
                ${StudentDatabase.TABLE_STUDENTS}.name,
                ${StudentDatabase.TABLE_STUDENTS}.email
            FROM ${StudentDatabase.TABLE_CLASSROOMS}
            JOIN ${StudentDatabase.TABLE_STUDENTS}
            ON ${StudentDatabase.TABLE_STUDENTS}.classroom_id = ${StudentDatabase.TABLE_CLASSROOMS}.id
            WHERE ${StudentDatabase.TABLE_CLASSROOMS}.id = ${id};`)


        return result
    }
}