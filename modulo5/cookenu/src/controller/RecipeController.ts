import { Request, response, Response } from "express";
import { RecipeDatabase } from "../database/RecipeDatabase";
import { Recipe } from "../models/Recipe";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class RecipeController {
    public getAllRecipes = async (request: Request, response: Response) => {
        let errorCode = 400
        try {
            const token = request.headers.authorization

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

            const recipeDatabase = new RecipeDatabase()
            const recipesDB = await recipeDatabase.getAllRecipes()

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

    public createRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { title, description } = req.body

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
                throw new Error("Missing Paramethers");

            }

            if (typeof title !== "string" || typeof description !== "string") {
                errorCode = 422
                throw new Error("Parameters must be strings");
            }

            if (title.length < 3) {
                errorCode = 422
                throw new Error("The 'title' parameter must be at least 3 characters long");
            }

            if (description.length < 10) {
                errorCode = 422
                throw new Error("The 'description' parameter must be at least 3 characters long");
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
                message: "Recipe sucessfully registeredo!",
                recipe
            })

        } catch (error) {
            response.status(errorCode).send({ message: error.message })
        }
    }
}