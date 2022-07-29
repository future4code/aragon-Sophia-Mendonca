    export interface IClassroomDB {
        id: string,
        name: string,
        module: string
    }
    
    export class Classroom {
        constructor(
            private id: string,
            private name: string,
            private students: string[],
            private module: number
        ) {}
        
        getId() {
            return this.id
        }

        getName() {
            return this.name
        }

        getStudents() {
            return this.students
        }

        getModule() {
            return this.module
        }

        setId(newId: string) {
            this.id = newId
        }

        setName(newName: string) {
            this.name = newName
        }

        setStudents(newStudents: string[]) {
            this.students = [...newStudents]
        }

        setModule(newModule: number) {
            this.module = newModule
        }

    }   
