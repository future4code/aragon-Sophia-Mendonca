import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(
        message: string = "Wrong credentials"
    ) {
        super(401, message)
    }
}