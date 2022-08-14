import { Request, Response } from "express"

export class PingController {
    public ping = async (request: Request, response: Response) => {
        let errorCode = 400
        try {
            response.status(200).send({ message: "Pong!" })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }
}