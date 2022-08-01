import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ping } from './endpoints/Ping'
import { ClassroomController } from './endpoints/ClassroomController'
import { StudentsController } from './endpoints/StudentsController'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.get("/ping", ping)
app.post("/classrooms", new ClassroomController().createClassroom)
app.get("/classrooms/active", new ClassroomController().getActiveClassrooms)
app.put("/classrooms/:id/module", new ClassroomController().changeClassroomModule)
app.post("/students", new StudentsController().createStudent)
app.get("/students", new StudentsController().getNameStudent)
app.put("/students/:id", new StudentsController().changeStudentClassrooom)
app.get("/students/:id", new StudentsController().getStudentsClassroom)
app.get("/classrooms", new ClassroomController().getAllTheClassrooms)
app.get("/students", new StudentsController().getAllTheStudents)