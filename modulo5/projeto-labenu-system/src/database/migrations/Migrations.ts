import { BaseDatabase } from "../BaseDatabase";
import { ClasroomDatabase } from "../ClassroomDatabase";
import { StudentDatabase } from "../StudentDatabase";

class Migrations extends BaseDatabase {
    public async execute() {
        try {
            
        } catch (error) {
            
        }
    }

    private async createTables() {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS 
            ${StudentDatabase.TABLE_STUDENTS_HOBBIES},
            ${StudentDatabase.TABLE_STUDENTS},
            ${StudentDatabase.TABLE_HOBBIES},
            ${ClasroomDatabase.TABLE_CLASSROOMS};

        CREATE TABLE IF NOT EXISTS 
            ${ClasroomDatabase.TABLE_CLASSROOMS} (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                module ENUM("0", "1", "2", "3", "4", "5", "6") DEFAULT "0" NOT NULL
            );
        
        CREATE TABLE IF NOT EXISTS
            ${StudentDatabase.TABLE_STUDENTS} (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                birthdate DATE NOT NULL,
                classroom_id VARCHAR(255) DEFAULT NULL,
                FOREIGN KEY (classroom_id) REFERENCES ${ClasroomDatabase.TABLE_CLASSROOMS}(id)
            );
        
        `)
    }
}