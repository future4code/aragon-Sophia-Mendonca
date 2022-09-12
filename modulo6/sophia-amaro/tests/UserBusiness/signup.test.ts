import { UserBusiness } from "../../src/business/UserBusiness"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { ISignupInputDTO } from "../../src/models/User"
import { BaseError } from "../../src/errors/BaseError"

describe("Testing UserBusiness", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Signup successfully", async () => {
        const input: ISignupInputDTO = {
            name: "sophia",
            email: "sophia@gmail.com",
            password: "sophiamendonca"
        }

        const response = await userBusiness.signup(input)

        expect(response.message).toEqual("The user was successfully registered")
        expect(response.token).toEqual("token-mock")
    })

    test("retorna erro se email já for cadastrado", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                name: "sophia",
                email: "sophia@gmail.com",
                password: "sophiamendonca"
            }

            await userBusiness.signup(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(409)
                expect(error.message).toEqual("The email was already registered")
            }
        }
    })

    test("retorna erro se email tiver formato inválido ", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                name: "sophia",
                email: "sophiagmail.com",
                password: "sophiamendonca"
            }

            await userBusiness.signup(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("The email parameter is wrong")
            }
        }
    })

    test("retorna erro se senha tiver menos que 6 caracteres ", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                name: "sophia",
                email: "sophia@gmail.com",
                password: "sophia"
            }

            await userBusiness.signup(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Invalid 'password' parameter: minimum 6 characters.")
            }
        }
    })
})