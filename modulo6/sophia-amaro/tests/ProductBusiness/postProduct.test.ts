import { ProductBusiness } from "../../src/business/ProductBusiness"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { IPostProductInputDTO } from "../../src/models/Products"
import { BaseError } from "../../src/errors/BaseError"

describe("Testing ProductsBusiness", () => {
    const productsBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Post product successfully", async () => {

        const input: IPostProductInputDTO = {
            token: "token-sophia",
            name: "Vestido rosa curto"
        }

        const response = await productsBusiness.postProduct(input)

        expect(response.message).toEqual("The product was added successfully")
    })


    test("Returns error iftoken is missing", async () => {
        expect.assertions(2)
        try {
            const input: IPostProductInputDTO = {
                token: "",
                name: "Vestido azul"
            }

            await productsBusiness.postProduct(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("The token is missing or wrong")
            }
        }
    })

    test("Returns error if product name is missing", async () => {
        expect.assertions(2)
        try {
            const input: IPostProductInputDTO = {
                token: "token-sophia",
                name: ""
            }

            await productsBusiness.postProduct(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Missing param.")
            }
        }
    })

    test("Returns error if product name is less than 4 characters", async () => {
        expect.assertions(2)
        try {
            const input: IPostProductInputDTO = {
                token: "token-sophia",
                name: "cal"
            }

            await productsBusiness.postProduct(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("The name param is wrong")
            }
        }
    })

})