import { BaseError } from "./BaseError";

export class RequestError extends BaseError {
    constructor(
        message: string = "Wrong request"
    ) {
        super(400, message)
    }
}