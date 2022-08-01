import { IClassroomDB } from "../models/Classroom";
import { BaseDatabase } from "./BaseDatabase";

export class ClassroomDatabase extends BaseDatabase {
  public static TABLE_CLASSROOMS = "Labe_Classrooms"

  public async getAllClassrooms() {
    const AllClassrooms = await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .select()
    return AllClassrooms
  }

  public async createClassroom(classroom: IClassroomDB) {
    await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .insert({
        id: classroom.id,
        name: classroom.name,
        module: classroom.module
      });
  }

  public async getActiveClassrooms(id: string) {
    const findActiveClassrooms = await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .select()
      .where({ id: id })
    return findActiveClassrooms
  }

  public async changeClassroomModule(id: string, module: string) {
    await BaseDatabase
      .connection(ClassroomDatabase.TABLE_CLASSROOMS)
      .update({ module })
      .where({ id })
  }

}