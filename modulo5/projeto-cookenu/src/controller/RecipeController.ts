import { Request, Response } from "express";
import { RecipeDatabase } from "../database/RecipeDatabase";
import { Recipe } from "../models/Recipe";
import { USER_ROLES } from "../models/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class RecipeController {
    public createRecipe = async (request: Request, response: Response) => {
        let errorCode = 400
        try {
            const token = request.headers.authorization
            const title = request.body.title
            const description = request.body.description

            if (!token) {
                errorCode = 401
                throw new Error("Missing token")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Wrong token")
            }

            if (!title || !description) {
                errorCode = 422
                throw new Error("Missing parameter(s)")

            }

            if (typeof title !== "string") {
                errorCode = 422
                throw new Error("Thw 'title' parameter must be a string")
            }

            if (typeof description !== "string") {
                errorCode = 422
                throw new Error("Thw 'descriotions' parameter must be a string")
            }

            if (title.length < 3) {
                errorCode = 422
                throw new Error("The 'title' parameter must be at least 3 characters long")
            }

            if (description.length < 10) {
                errorCode = 422
                throw new Error("The 'description' parameter must be at least 3 characters long")
            }


            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const recipe = new Recipe(
                id,
                title,
                description,
                new Date(),
                new Date(),
                payload.id
            )

            const recipeDataBase = new RecipeDatabase()
            await recipeDataBase.createRecipe(recipe)

            response.status(201).send({
                message: "Recipe reg!stered sucessfully",
                recipe
            })

        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public editRecipe = async (request: Request, response: Response) => {
        let errorCode = 400
        try {
            const token = request.headers.authorization
            const id = request.params.id
            const title = request.body.title
            const description = request.body.description

            if (!token) {
                errorCode = 422
                throw new Error("Missing token")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Wrong token")
            }

            if (!title && !description) {
                errorCode = 422
                throw new Error("Missing parameter(s)")
            }

            if (title && typeof title !== "string") {
                errorCode = 422
                throw new Error("The 'title' parameter must be a string")
            }

            if (description && typeof description !== "string") {
                errorCode = 422
                throw new Error("The 'description' parameter must be a string")
            }

            if (title && title.length < 3) {
                throw new Error("The 'title' parameter must be at least 3 characters long")
            }

            if (description && description.length < 10) {
                throw new Error("The 'description' parameter must be at least 10 characters long")
            }

            const recipeDataBase = new RecipeDatabase()
            const receitaDB = await recipeDataBase.findById(id)

            if (!receitaDB) {
                errorCode = 404
                throw new Error("Unfound recipe")
            }

            if (payload.role === USER_ROLES.NORMAL) {
                if (payload.id !== receitaDB.creator_id) {
                    errorCode = 403
                    throw new Error("Unauthorized user")
                }
            }

            const recipe = new Recipe(
                receitaDB.id,
                receitaDB.title,
                receitaDB.description,
                receitaDB.created_at,
                receitaDB.updated_at = new Date(),
                receitaDB.creator_id
            )

            title && recipe.setTitle(title)
            description && recipe.setDescription(description)

            await recipeDataBase.editRecipe(recipe)

            response.status(201).send({ message: "Recipe edited sucessfully", recipe })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public deleteRecipe = async (request: Request, response: Response) => {
        let errorCode = 400
        try {
            const token = request.headers.authorization
            const id = request.params.id

            if (!token) {
                errorCode = 422
                throw new Error("Missing token")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Wrong Token")
            }

            const recipeDataBase = new RecipeDatabase()
            const recipeDB = await recipeDataBase.findById(id)

            if (!recipeDB) {
                errorCode = 404
                throw new Error("Unfound recipe")
            }

            if (payload.role === USER_ROLES.NORMAL) {
                if (payload.id !== recipeDB.creator_id) {
                    errorCode = 403
                    throw new Error("Unauthorized user")
                }
            }

            await recipeDataBase.deleteRecipe(id)

            response.status(200).send({ message: "Recipe deleted sucessfully" })

        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }

    public getAllRecipes = async (request: Request, response: Response) => {
        let errorCode = 400
        try {
            const token = request.headers.authorization
            const search = request.query.search as string
            const sort = request.query.sort as string || "title"
            const order = request.query.order as string || "asc"
            const limit = Number(request.query.limit) || 5
            const page = Number(request.query.page) || 1
            const offset = limit * (page - 1)

            if (!token) {
                errorCode = 401
                throw new Error("Missing token")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Wrong token")
            }

            if (typeof search !== "string") {
                throw new Error("The 'seach' parameter must be a string")
            }

            const recipeDatabase = new RecipeDatabase()
            const recipesDB = await recipeDatabase.getAllRecipes(search, sort, order, limit, page, offset)

            const recipes = recipesDB.map((recipeDB) => {
                return new Recipe(
                    recipeDB.id,
                    recipeDB.title,
                    recipeDB.description,
                    recipeDB.created_at,
                    recipeDB.updated_at,
                    recipeDB.creator_id
                )
            })

            response.status(200).send({ recipes })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }
}