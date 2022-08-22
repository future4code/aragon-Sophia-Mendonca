import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ICreateShowInputDTO } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testing ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Show registered successfully", async () => {
        const input: ICreateShowInputDTO = {
            token: "token-astrodev",
            band: "The Pierces",
            startAt: "2022/12/09"
        }

        const response = await showBusiness.createShow(input)

        expect(response.message).toEqual("Show registered successfully")
        expect(response.show.getId()).toEqual("id-mock")
        expect(response.show.getBand()).toEqual("The Pierces")
        expect(response.show.getStartsAt()).toEqual(new Date("2022/12/09"))
        expect(response.show.getTickets()).toEqual(4999)
    })

    test("Unauthorized user", async () => {
        expect.assertions(2)
        try {
            const input: ICreateShowInputDTO = {
                token: "token-mock",
                band: "The Pierces",
                startAt: "2022/12/08"
            }

            await showBusiness.createShow(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("Unauthorized user")
            }
        }
    })

    test("Show's date is busy", async () => {
        expect.assertions(2)
        try {
            const input: ICreateShowInputDTO = {
                token: "token-astrodev",
                band: "The Pierces",
                startAt: "2022/12/05"
            }

            await showBusiness.createShow(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Show's date is busy")
            }
        }
    })

    test("Show's date cannot exceed December 11th", async () => {
        expect.assertions(2)
        try {
            const input: ICreateShowInputDTO = {
                token: "token-astrodev",
                band: "The Pierces",
                startAt: "2022/12/13"
            }

            await showBusiness.createShow(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Show's date cannot exceed December 11th")
            }
        }
    })

    test("Show's date cannot happens before December 5th", async () => {
        expect.assertions(2)
        try {
            const input: ICreateShowInputDTO = {
                token: "token-astrodev",
                band: "The Pierces",
                startAt: "2022/12/03"
            }

            await showBusiness.createShow(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Show's date cannot happens before December 5th")
            }
        }
    })

}) 