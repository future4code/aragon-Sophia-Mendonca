import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(
        message: string = "Unfound resource"
    ) {
        super(404, message)
    }
}