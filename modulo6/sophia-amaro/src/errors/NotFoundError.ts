import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(
        message: string = "This resource was not found"
    ) {
        super(404, message)
    }
}