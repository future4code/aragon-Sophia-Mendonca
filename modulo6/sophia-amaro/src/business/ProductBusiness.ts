import { ProductDatabase } from "../database/ProductDatabase"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import { RequestError } from "../errors/RequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { IAddTagInputDTO, IAddTagOutputDTO, IGetProductsByTagOutputDTO, IGetProductsInputDTO, IGetProductsOutputDTO, IPostProductInputDTO, IPostProductOutputDTO, IProductDB, ITagsProductsDB, Product } from "../models/Products"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class ProductBusiness {
    constructor(
        private productDataBase: ProductDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public getProducts = async (input: IGetProductsInputDTO) => {
        const search = input.search

        if (search) {
            const productsDB = await this.productDataBase.getProductsBySearch(search)

            if (productsDB.length === 0) {
                throw new RequestError("This search did not find any products")
            }

            const products = productsDB.map(productDB => {
                return new Product(
                    productDB.id,
                    productDB.name
                )
            })

            for (let product of products) {

                const tagsDB: any = await this.productDataBase.getTags(product.getId())
                const tags = tagsDB?.map((tag: any) => tag.tag)
                product.setTags(tags)
            }

            const responseSearch: IGetProductsOutputDTO = {
                products
            }

            return responseSearch
        }

        const productsDB = await this.productDataBase.getProducts()

        const products = productsDB.map(productDB => {
            return new Product(
                productDB.id,
                productDB.name
            )
        })

        for (let product of products) {

            const tagsDB: any = await this.productDataBase.getTags(product.getId())

            const tags = tagsDB?.map((tag: any) => tag.tag)

            product.setTags(tags)
        }

        const response: IGetProductsOutputDTO = {
            products
        }

        return response
    }

    public getProductsTags = async (input: IGetProductsInputDTO) => {
        const search = input.search

        const tag = await this.productDataBase.getIdTag(search)

        if (!tag) {
            throw new RequestError("This search did not find any products")
        }

        const tagId = tag?.map(item => item.id)

        const products = await this.productDataBase.getSearchProductsByTag(tagId[0])

        if (products.length === 0 || undefined) {
            throw new RequestError("This search did not find any products")
        }

        const response: IGetProductsByTagOutputDTO = {
            products
        }

        return response
    }

    public postProduct = async (input: IPostProductInputDTO) => {
        const name = input.name
        const token = input.token
        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("The token is wrong or missing")
        }

        if (!name) {
            throw new RequestError("The name parameter is wrong")
        }

        if (typeof name !== "string") {
            throw new RequestError("The name parameter must be a string")
        }

        if (name.length < 4) {
            throw new RequestError("The name parameter must be at least 4 characters long")
        }

        const id = this.idGenerator.generate()

        const newProduct = new Product(
            id,
            name.toUpperCase()
        )

        await this.productDataBase.postProduct(newProduct)

        const response: IPostProductOutputDTO = {
            message: "The product was successfully added"
        }

        return response
    }

    public addTag = async (input: IAddTagInputDTO) => {
        const productId = input.id
        const tagName = input.tagName
        const token = input.token

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("The token is wrong or missing")
        }

        if (!productId) {
            throw new RequestError("The productId parameter is missing")
        }

        if (!tagName) {
            throw new RequestError("The tagName parameter is missing")
        }

        if (typeof tagName !== "string") {
            throw new RequestError("Then tagName parameter must be a string")
        }

        const searchProduct = await this.productDataBase.verifyProduct(productId);

        if (!searchProduct) {
            throw new NotFoundError("The product was not found");
        }

        const findTag = await this.productDataBase.getIdTag(tagName)

        if (!findTag) {
            throw new NotFoundError("The tag was not found");
        }

        const getTag = await this.productDataBase.getIdTag(tagName);
        const tagId = getTag.map(item => item.id);

        const findTagProduct = await this.productDataBase.verifyProductTag(productId, tagId[0])

        if (findTagProduct) {
            throw new ConflictError("The tag is already related to a product")
        }

        const id = this.idGenerator.generate();

        const tag: ITagsProductsDB = {
            id: id,
            product_id: productId,
            tag_id: tagId[0],
        };

        await this.productDataBase.addTag(tag);

        const response: IAddTagOutputDTO = {
            message: "The tag was sucessfully added"
        };

        return response
    };
}
