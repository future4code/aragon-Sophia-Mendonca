import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(
        message: string = "Wrong Credentials"
    ) {
        super(401, message)
    }
}