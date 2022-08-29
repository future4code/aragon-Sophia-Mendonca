import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { IDeleteTicketInputDTO } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testing ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Ticket removed sucessfully", async () => {

        const input: IDeleteTicketInputDTO= {
            token: "token-mock",
            ticketId: "304"
        }

        const response = await showBusiness.deleteTicket(input)

        expect(response.message).toEqual("Ticket removed sucessfully")

    })

    test("if ticket not found", async () => {
        expect.assertions(2)
        try {
            const input: IDeleteTicketInputDTO= {
                token: "token-mock",
                ticketId: "306"
            }

            await showBusiness.deleteTicket(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {

                expect(error.statusCode).toEqual(404)
                expect(error.message).toEqual("Ticket not purchased")
            }
        }
    })

    test("Missing or wrong token", async () => {
        expect.assertions(2)
        try {
            const input: IDeleteTicketInputDTO= {
                token: "",
                ticketId: "306"
            }

            await showBusiness.deleteTicket(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {

                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("MNissing or wrong token")
            }
        }
    })

    test("Missing parameters", async () => {
        expect.assertions(2)
        try {
            const input: IDeleteTicketInputDTO= {
                token: "token-mock",
                ticketId: ""
            }

            await showBusiness.deleteTicket(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {

                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Missing parameters")
            }
        }
    })

}) 