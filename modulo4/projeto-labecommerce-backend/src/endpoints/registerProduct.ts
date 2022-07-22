import { Request, Response } from "express"
import connection from "../database/connection"
import { TABLE_PRODUCTS} from "../database/tableNames"
import { Product } from "../models/Product"


export const registerProduct = async (req: Request, res: Response) => {
    let errorCode: number = 400

    try {
        const { name, price } = req.body

        if (!name || !price) {
            errorCode = 422;
            throw new Error("Name and price must exist.")
        }

        if ( typeof name !== "string")
        {
            errorCode = 422;
            throw new Error("Name must be a string.")
        }

        if (typeof price !== "number" || price <= 0) {
            errorCode = 422
            throw new Error("Price must be a number greater then 0.");

        }

        const newProduct: Product = {
            id: Date.now().toString(),
            name: name,
            price: price
        };

        await connection(TABLE_PRODUCTS)
            .insert({
                id: newProduct.id,
                name: newProduct.name,
                price: newProduct.price
            })

        res.status(200).send({ products: newProduct, message: "Product registered successfully." })
    } catch (error) {
        res.status(errorCode).send({ message: error.message });
    }
}