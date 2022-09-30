import { BaseError } from "./BaseError";

export class RequestError extends BaseError {
    constructor(
        message: string = "The request is wrong"
    ) {
        super(400, message)
    }
}