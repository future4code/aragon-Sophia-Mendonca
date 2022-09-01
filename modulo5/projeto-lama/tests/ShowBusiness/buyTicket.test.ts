import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { IBuyTicketInputDTO } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testing ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Ticket purchased sucessfully", async () => {

        const input: IBuyTicketInputDTO = {
            token: "token-mock",
            showId: "201",
        }

        const response = await showBusiness.buyTicket(input)

        expect(response.message).toEqual("Ticket purchased sucessfully")

    })

    test("Show not found", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "token-mock",
                showId: "205",
            }

            await showBusiness.buyTicket(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(404)
                expect(error.message).toEqual("Show not found")
            }
        }
    })

    test("Ticket already purchased", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "token-astrodev",
                showId: "201",
            }

            await showBusiness.buyTicket(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(409)
                expect(error.message).toEqual("Ticket already purchased")
            }
        }
    })

    test("Missing or wrong token", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
                token: "token-astrodev2",
                showId: "201",
            }

            await showBusiness.buyTicket(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("Missing or wrong token")
            }
        }
    })

}) 