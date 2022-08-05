import { IRecipeDB, Recipe } from "../models/Recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
    public static TABLE_RECIPES = "Cookenu_Recipes"

    public createRecipe = async (recipe: Recipe) => {
        const recipeDB: IRecipeDB = {
            id: recipe.getId(),
            title: recipe.getTitle(),
            description: recipe.getDescription(),
            created_at: recipe.getCreatedAt(),
            updated_at: recipe.getUpdatedAt(),
            creator_id: recipe.getCreatorId()
        }

        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .insert(recipeDB)
    }

    public editRecipe = async (recipe: Recipe) => {
        const recipeDB: IRecipeDB = {
            id: recipe.getId(),
            title: recipe.getTitle(),
            description: recipe.getDescription(),
            created_at: recipe.getCreatedAt(),
            updated_at: recipe.getUpdatedAt(),
            creator_id: recipe.getCreatorId()
        }

        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .update(recipeDB)
            .where({ id: recipeDB.id })
    }

    public findById = async (id: string) => {
        const IdFound: IRecipeDB[] = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select()
            .where({ id })

        return IdFound[0]
    }

    public deleteRecipe = async (id: string) => {
        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .delete()
            .where({ id })
    }

    public getAllRecipes = async (search: string | undefined, sort: string, order: string, limit: number, page: number, offset: number) => {
        let recipesDB: IRecipeDB[] = []

        if (search) {
            recipesDB = await BaseDatabase
                .connection(RecipeDatabase.TABLE_RECIPES)
                .select()
                .where("title", "LIKE", `%${search}%`)
                .orderBy(`${sort}`, `${order}`)
                .limit(limit)
                .offset(offset)
        } else {
            recipesDB = await BaseDatabase
                .connection(RecipeDatabase.TABLE_RECIPES)
                .select()
                .orderBy(`${sort}`, `${order}`)
                .limit(limit)
                .offset(offset)

        }
        return recipesDB
    }
} 