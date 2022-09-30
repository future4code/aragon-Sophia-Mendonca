import { UserBusiness } from "../../src/business/UserBusiness"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { ILoginInputDTO } from "../../src/models/User"
import { BaseError } from "../../src/errors/BaseError"

describe("Testing UserBusiness", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("The user was sucessfully logged", async () => {
        const input: ILoginInputDTO = {
            email: "sophia@gmail.com",
            password: "sophiamendonca"
        }

        const response = await userBusiness.login(input)

        expect(response.message).toEqual("The user was successfully logged")
        expect(response.token).toEqual("token-sophia")
    })

    test("Returns error if email was not added", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "thiago@gmail.com",
                password: "thiagovernizzi"
            }

            await userBusiness.login(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(404)
                expect(error.message).toEqual("The email was not registered")
            }
        }
    })

    test("returns error if email is wrong", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "sophiaemail.com",
                password: "sophiamendonca"
            }

            await userBusiness.login(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("The email parameter is wrong")
            }
        }
    })

    test("retorna erro se senha estiver incorreta", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "sophia@gmail.com",
                password: "password"
            }

            await userBusiness.login(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("The password is wrong")
            }
        }
    })

})