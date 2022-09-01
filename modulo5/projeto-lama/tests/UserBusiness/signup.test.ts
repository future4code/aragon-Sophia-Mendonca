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

    test("User registered sucessfully", async () => {
        const input: ISignupInputDTO = {
            name: "Sopgia",
            email: "sophia@gmail.com",
            password: "sophiamendonca"
        }

        const response = await userBusiness.signup(input)

        expect(response.message).toEqual("User registered sucessfully")
        expect(response.token).toEqual("token-mock")
    })

    test("Email already registered", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                name: "sophia",
                email: "astrodev@gmail.com",
                password: "sophiamendonca"
            }

            await userBusiness.signup(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(409)
                expect(error.message).toEqual("Email already registered")
            }
        }
    })

    test("Parameter 'email' is wrong", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                name: "sophia",
                email: "sophia.com",
                password: "sophiamendonca"
            }

            await userBusiness.signup(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Parameter 'email' is wrong")
            }
        }
    })

    test("Parameter 'password' requires at least 6 characters", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                name: "sophia",
                email: "sophia@gmail.com",
                password: "soph"
            }

            await userBusiness.signup(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Parameter 'password' requires at least 6 characters")
            }
        }
    })
}) 