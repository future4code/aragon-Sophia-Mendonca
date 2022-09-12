import { UserDatabase } from "../database/UserDatabase"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import { RequestError } from "../errors/RequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { ILoginInputDTO, ILoginOutputDTO, ISignupInputDTO, ISignupOutputDTO, User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public signup = async (input: ISignupInputDTO) => {
        const { name, email, password } = input

        if (!name || !email || !password) {
            throw new RequestError("The parameters are missing")
        }

        if (typeof name !== "string") {
            throw new RequestError("The name parameter must a string")
        }

        if (typeof email !== "string") {
            throw new RequestError("The email parameter must be a string")
        }

        if (typeof password !== "string") {
            throw new RequestError("The password parameter must be a string")
        }

        if (name.length < 3) {
            throw new RequestError("The name parameter must be at least 3 characters long")
        }

        if (password.length < 6) {
            throw new RequestError("The password parameter must be at least 6 characters long")
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("The email parameter didn't match")
        }

        const findUserByEmail = await this.userDatabase.findByEmail(email)

        if (findUserByEmail) {
            throw new ConflictError("The email is already registered")
        }

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL
        )

        await this.userDatabase.createUser(user)

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: ISignupOutputDTO = {
            message: "The user was uccessfully registered",
            token
        }

        return response
    }


    public login = async (input: ILoginInputDTO) => {
        const { email, password } = input

        if (!email || !password) {
            throw new RequestError("The name or email paramater is missing")
        }

        if (typeof email !== "string") {
            throw new RequestError("The email parameter must be a string")
        }

        if (typeof password !== "string") {
            throw new RequestError("The password parameter must be a string")
        }

        if (password.length < 6) {
            throw new RequestError("The password parametermust be at least 6 characters long")
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("The email parameter did not match")
        }

        const findUserByEmail = await this.userDatabase.findByEmail(email)

        if (!findUserByEmail) {
            throw new NotFoundError("The email is not registered")
        }

        const user = new User(
            findUserByEmail.id,
            findUserByEmail.name,
            findUserByEmail.email,
            findUserByEmail.password,
            findUserByEmail.role
        )

        const isPasswordCorrect = await this.hashManager.compare(
            password,
            user.getPassword()
        )

        if (!isPasswordCorrect) {
            throw new UnauthorizedError("The password is wrong")
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: ILoginOutputDTO = {
            message: "The user was sucessfully logged",
            token
        }

        return response
    }
}