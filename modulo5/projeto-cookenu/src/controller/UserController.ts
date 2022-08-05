import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User, USER_ROLES } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    public signup = async (request: Request, response: Response) => {
        let errorCode = 400
        try {
            const nickname = request.body.nickname
            const email = request.body.email
            const password = request.body.password

            if (!nickname || !email || !password) {
                throw new Error("Missing Parameters")
            }

            if (typeof nickname !== "string") {
                throw new Error("The 'nickname' parameter must be a string");
            }

            if (typeof email !== "string") {
                throw new Error("The 'email'parameter must be a string")
            }

            if (typeof password !== "string") {
                throw new Error("The 'password' parameter must be a string")
            }

            if (nickname.length < 3) {
                throw new Error("The 'nickname' parameter must be at least 3 characters long");
            }

            if (password.length < 6) {
                throw new Error("The 'password' parameter must be at least 6 characters long");
            }

            if (!email.includes("@") || !email.includes(".com")) {
                throw new Error("The 'email' parameter must have a valid format")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const hashManager = new HashManager()
            const hashPassword = await hashManager.hash(password)

            const user = new User(
                id,
                nickname,
                email,
                hashPassword,
                USER_ROLES.NORMAL
            )

            const userDatabase = new UserDatabase()
            await userDatabase.signup(user)

            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)

            response.status(201).send({
                message: "User registered sucessfully",
                token
            })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public login = async (request: Request, response: Response) => {
        let errorCode = 400
        try {
            const email = request.body.email
            const password = request.body.password

            if (!email || !password) {
                errorCode = 401
                throw new Error("Missing email or password")

            }

            if (typeof email !== "string") {
                throw new Error("The 'email' parameter must be a string")
            }

            if (typeof password !== "string") {
                throw new Error("The 'password'parameter must be a string")
            }

            if (password.length < 6) {
                throw new Error("The 'password' parameter must be at least 6 characters long")
            }

            if (!email.includes("@") || !email.includes(".com")) {
                throw new Error("The 'email' parameter must have a valid format")
            }

            const userDatabase = new UserDatabase()
            const userDB = await userDatabase.login(email)

            if (!userDB) {
                errorCode = 401
                throw new Error("Unregistered email")
            }

            const user = new User(
                userDB.id,
                userDB.nickname,
                userDB.email,
                userDB.password,
                userDB.role
            )

            const hashManager = new HashManager()
            const isPasswordCorrect = await hashManager.compare(
                password,
                user.getPassword()
            )

            if (!isPasswordCorrect) {
                errorCode = 401
                throw new Error("Wrong password")
            }

            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)

            response.status(200).send({
                message: ("User logged successfully"),
                token
            })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public deleteUser = async (request: Request, response: Response) => {
        let errorCode = 400
        try {
            const token = request.headers.authorization
            const id = request.params.id

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Missing or Wrong Token")
            }

            if (payload.role !== USER_ROLES.ADMIN) {
                errorCode = 403
                throw new Error("Unautherized user to delete")
            }

            const userDatabase = new UserDatabase()
            const isUserExists = await userDatabase.findById(id)

            if (!isUserExists) {
                errorCode = 401
                throw new Error("Wrong Token")
            }

            if (id === payload.id) {
                throw new Error("Unable to delete your own account")
            }

            await userDatabase.deleteUser(id)

            response.status(200).send({ message: "User deleted sucessfully" })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }
}