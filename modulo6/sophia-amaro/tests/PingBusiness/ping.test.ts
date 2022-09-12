import { PingBusiness } from "../../src/business/PingBusiness"

describe("Testing PingBusiness", () => {
    const pingBusiness = new PingBusiness()
    
    test("The test should return 'Pong!' on success", async () => {
        const response = await pingBusiness.ping()
        expect(response.message).toBe("Pong!")
    })
})