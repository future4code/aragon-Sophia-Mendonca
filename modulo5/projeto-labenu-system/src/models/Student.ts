export interface IStudentsHobbiesDB {
    student_id: string,
    hobby_id: string
}

export interface IHobbiesDB {
    id: string,
    title: string
}

export interface IStudentDB {
    id: string,
    name: string,
    email: string,
    birthdate: Date,
    classroom_id: null | string
}

export class Student {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private birthdate: Date,
        private classroomId: null | string,
        private hobbies: string[]
    ) { }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email
    }

    getBirthdate() {
        return this.birthdate
    }

    getClassroomId() {
        return this.classroomId
    }

    getHobbies() {
        return this.hobbies
    }

    setId(newId: string) {
        this.id = newId
    }

    setName(newName: string) {
        this.name = newName
    }

    setEmail(newEmail: string) {
        this.email = newEmail
    }

    setBirthdate(newBirthdate: Date) {
        this.birthdate = newBirthdate
    }

    setClassroomId(newClassroomId: null | string) {
        this.classroomId = newClassroomId
    }

    setHobbies(newHobbies: string[]) {
        this.hobbies = [...newHobbies]
    }
}