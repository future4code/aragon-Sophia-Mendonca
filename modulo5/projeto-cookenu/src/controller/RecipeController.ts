import { Request, response, Response } from "express";
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
            const { title, description } = request.body

            if (!token) {
                errorCode = 401
                throw new Error("Missing Token")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Wrong Token")
            }

            if (!title || !description) {
                errorCode = 422
                throw new Error("Missing Paramethers")

            }

            if (typeof title !== "string" || typeof description !== "string") {
                errorCode = 422
                throw new Error("Parameters must be strings")
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
                message: "Recipe sucessfully reg!stered",
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
                throw new Error("Missing Token")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Wrong Token")
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
                throw new Error("The 'description' parameter must be at least 3 characters long")
            }

            const recipeDataBase = new RecipeDatabase()
            const receitaDB = await recipeDataBase.findById(id)

            if (!receitaDB) {
                errorCode = 404
                throw new Error("Unfound recipe")
            };

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
                throw new Error("Missing Token")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Wrong Token")
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
            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)
            const offset = limit * (page - 1)

            if (!payload) {
                errorCode = 401
                throw new Error("Wrong Token")
            }

            if (typeof search !== "string") {
                throw new Error("Parâmetro 'search' deve ser uma string")
            }
            const recipeDatabase = new RecipeDatabase()
            const recipesDB = await recipeDatabase.getAllRecipes(search, sort, order, limit, page, offset)

            const recipes = recipesDB.map((recipe) => {
                const resultRecipes = {
                    id: recipe.id,
                    title: recipe.title,
                    description: recipe.description,
                    created_at: recipe.created_at,
                    updated_at: recipe.updated_at,
                    creator_id: recipe.creator_id,
                }

                return resultRecipes
            })

            response.status(200).send({ recipes })
        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }
} 