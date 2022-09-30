import { ProductBusiness } from "../../src/business/ProductBusiness"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { IAddTagInputDTO } from "../../src/models/Products"
import { BaseError } from "../../src/errors/BaseError"

describe("Testing ProductsBusiness", () => {
    const productsBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Add tag to product successfully", async () => {

        const input: IAddTagInputDTO = {
            token: "token-sophia",
            id: "8360",
            tagName: "moderno",
        };

        const response = await productsBusiness.addTag(input)

        expect(response.message).toEqual("The tah was  successfully added")
    })

    test("The test returns error if the token was wrong or missing", async () => {
        expect.assertions(2)
        try {
            const input: IAddTagInputDTO = {
                token: "token",
                id: "8360",
                tagName: "moderno",
            };

            await productsBusiness.addTag(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(401)
                expect(error.message).toEqual("Missing or invalid token.")
            }
        }
    })

    test("The test returns error if the token was wrong or missing"), async () => {
        expect.assertions(2)
        try {
            const input: IAddTagInputDTO = {
                token: "token-sophia",
                id: "8360",
                tagName: "",
            };

            await productsBusiness.addTag(input)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("The parameter is missing")
            }
        }
    })

test("The test returns error if the product Id were not found", async () => {
    expect.assertions(2)
    try {
        const input: IAddTagInputDTO = {
            token: "token-sophia",
            id: "836",
            tagName: "moderno",
        };

        await productsBusiness.addTag(input)

    } catch (error: unknown) {
        if (error instanceof BaseError) {
            expect(error.statusCode).toEqual(404)
            expect(error.message).toEqual("The product was not found")
        }
    }
})

test("The test returns error if the tagName were not found", async () => {
    expect.assertions(2)
    try {
        const input: IAddTagInputDTO = {
            token: "token-sophia",
            id: "8360",
            tagName: "verao",
        };

        await productsBusiness.addTag(input)

    } catch (error: unknown) {
        if (error instanceof BaseError) {
            expect(error.statusCode).toEqual(404)
            expect(error.message).toEqual("The tag was not found.")
        }
    }
})

test("The test returns error if the tagName were not found, async () => {
        expect.assertions(2)
        try {
    const input: IAddTagInputDTO = {
        token: "token-sophia",
        id: "8360",
        tagName: "viagem",
    };

    await productsBusiness.addTag(input)

} catch (error: unknown) {
    if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(409)
        expect(error.message).toEqual("The tag is already related to a product")
    }
}
    })

})