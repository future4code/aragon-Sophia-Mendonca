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
            throw new RequestError("Missing parameters")
        }

        if (typeof name !== "string") {
            throw new RequestError("Parameter 'name' must be a string")
        }

        if (typeof email !== "string") {
            throw new RequestError("Parameter 'email' must be a string")
        }

        if (typeof password !== "string") {
            throw new RequestError("Parameter 'password' must be a string")
        }

        if (name.length < 3) {
            throw new RequestError("Parameter 'name' requires at least 3 characters")
        }

        if (password.length < 6) {
            throw new RequestError("Parameter 'password' requires at least 6 characters")
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("Parameter 'email' is wrong")
        }

        const findUserByEmail = await this.userDatabase.findByEmail(email)

        if (findUserByEmail) {
            throw new ConflictError("Email already registered")
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
            message: "User registered sucessfully",
            token
        }

        return response
    }


    public login = async (input: ILoginInputDTO) => {
        const { email, password } = input

        if (!email || !password) {
            throw new RequestError("Missing parameters")
        }

        if (typeof email !== "string") {
            throw new RequestError("Parameter 'email' must be a string")
        }

        if (typeof password !== "string") {
            throw new RequestError("Parameter 'password' must be a string")
        }

        if (password.length < 6) {
            throw new RequestError("Parameter 'password' requires at least 6 characters")
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("Parameter 'email' is wrong")
        }

        const findUserByEmail = await this.userDatabase.findByEmail(email)

        if (!findUserByEmail) {
            throw new NotFoundError("Unregistered email")
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
            throw new UnauthorizedError("Wrong password")
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: ILoginOutputDTO = {
            message: "User sucessfully logged",
            token
        }

        return response
    }
} 