import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    constructor(
        message: string = "This resource already exists"
    ) {
        super(409, message)
    }
}