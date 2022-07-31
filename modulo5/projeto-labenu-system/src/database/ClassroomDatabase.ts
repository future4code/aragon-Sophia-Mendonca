import { IClassroomDB } from "../models/Classroom";
import { BaseDatabase } from "./BaseDatabase";
import { StudentDatabase } from "./StudentDatabase";

export class ClassroomDatabase extends BaseDatabase {

  public static TABLE_CLASSROOMS = "Labe_Classrooms"

  public async createClassroom(classroom: IClassroomDB) {
    await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .insert({
        id: classroom.id,
        name: classroom.name,
        module: classroom.module
      });
  }

  public async getAllClassrooms() {
    const result = await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
    return result
  }

  public async getActiveClassrooms() {
    await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
  }

  public async changeClassroomModule(id: string, module: string) {
    await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
  }


  public async change(id: string, classroom_id: string) {
    const result = await BaseDatabase
      .connection(StudentDatabase.TABLE_STUDENTS)
      .where({ id: id })
      .update({ classroom_id: classroom_id })

    return result
  }

  public async verificationClass(id: string) {
    const findClass = await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .select()
      .where({ id: id })
    return findClass
  }
}