import { IClassroomDB } from "../../models/Classroom";
import { IHobbiesDB, IStudentDB, IStudentsHobbiesDB } from "../../models/Student";

export const classrooms: IClassroomDB[] = [
    {
        id: "1",
        name: "Hosshaku Kempon",
        module: "0"
    },
    {
        id: "2",
        name: "Itai Doshin",
        module: "1"
    },
    {
        id: "3",
        name: "Shitei Funi",
        module: "2"
    }
]

export const students: IStudentDB[] = [
    {
        id: "1",
        name: "Sophia",
        email: "sophia@gmail.com",
        birthdate: new Date("06/02/1997"),
        classroom_id: "1"
    },
    {
        id: "2",
        name: "Vinícius",
        email: "vini@hotmail.com",
        birthdate: new Date("01/01/2000"),
        classroom_id: "3"
    },
    {
        id: "3",
        name: "Marcos",
        email: "marcos@gmail.com",
        birthdate: new Date("28/08/1986"),
        classroom_id: "3"
    },
    {
        id: "4",
        name: "Selma",
        email: "selma@hotmail.com",
        birthdate: new Date("17/09/1963"),
        classroom_id: "2"
    },
    {
        id: "5",
        name: "Lannyer",
        email: "lannyerjuninho@gmail.com",
        birthdate: new Date("14/11/1989"),
        classroom_id: "1"
    },
    {
        id: "6",
        name: "Suzy",
        email: "suzy@hotmail.com",
        birthdate: new Date("10/10/2001"),
        classroom_id: "2"
    },
    {
        id: "7",
        name: "Thiago",
        email: "thiago@gmail.com",
        birthdate: new Date("02/02/2002"),
        classroom_id: "3,"
    },
    {
        id: "8",
        name: "Willian",
        email: "will@hotmail.com",
        birthdate: new Date("03/03/2003"),
        classroom_id: "1"
    },
    {
        id: "9",
        name: "Márcia",
        email: "marcia@gmail.com",
        birthdate: new Date("12/01/1977"),
        classroom_id: "2"
    },
    {
        id: "10",
        name: "Samuel",
        email: "samuka@gmail.com",
        birthdate: new Date("04/04/2004"),
        classroom_id: null
    }

]

export const hobbies: IHobbiesDB[] = [
    { id: "1", title: "Estudar budismo" },
    { id: "2", title: "Jogar Pokemon" },
    { id: "3", title: "Pesquisar sobre acessibilidade" },
    { id: "4", title: "Assistir F1" },
    { id: "5", title: "Escrever críticas de filmes" },
    { id: "6", title: "Ir ao cinema" },
    { id: "7", title: "Andar de bicicleta" },
    { id: "8", title: "Ouvir música" },
    { id: "9", title: "Ver animes" },
    { id: "10", title: "Cantar" },
]

export const studentsHobbies: IStudentsHobbiesDB[] = [
    { student_id: "1", hobby_id: "5" },
    { student_id: "2", hobby_id: "4" },
    { student_id: "3", hobby_id: "2" },
    { student_id: "4", hobby_id: "1" },
    { student_id: "5", hobby_id: "9" },
    { student_id: "6", hobby_id: "6" },
    { student_id: "7", hobby_id: "7" },
    { student_id: "8", hobby_id: "10" },
    { student_id: "9", hobby_id: "3" },
    { student_id: "10", hobby_id: "8" },
]