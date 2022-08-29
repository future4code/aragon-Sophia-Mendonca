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

    test("User sucessfully logged", async () => {
        const input: ILoginInputDTO = {
            email: "astrodev@gmail.com",
            password: "bananinha"
        }

        const response = await userBusiness.login(input)

        expect(response.message).toEqual("User sucessfully logged")
        expect(response.token).toEqual("token-astrodev")
    })

    test("Unregistered email", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "soph@gmail.com",
                password: "sophiamendonca"
            }

            await userBusiness.login(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(404)
                expect(error.message).toEqual("Unregistered email")
            }
        }
    })

    test("Parameter 'email' is wrong", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "astrodevgmail.com",
                password: "bananinha"
            }

            await userBusiness.login(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Parameter 'email' is wrong")
            }
        }
    })

    test("Wrong password", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "astrodev@gmail.com",
                password: "sophiasilva"
            }

            await userBusiness.login(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("Wrong password")
            }
        }
    })

}) 