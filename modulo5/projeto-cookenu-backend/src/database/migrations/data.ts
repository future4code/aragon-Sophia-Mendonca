import { IRecipeDB } from "../../models/Recipe"
import { IUserDB, USER_ROLES } from "../../models/User"

export const users: IUserDB[] = [
    {
        id: "1",
        nickname: "Sam",
        email: "sam@gmail.com",
        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
        role: USER_ROLES.ADMIN
    },
    {
        id: "2",
        nickname: "Clover",
        email: "clover@gmail.com",
        password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO", // qwerty00
        role: USER_ROLES.NORMAL
    },
    {
        id: "3",
        nickname: "Alex",
        email: "alex@gmail.com",
        password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i", // asdfg123
        role: USER_ROLES.NORMAL
    }
]

export const recipes: IRecipeDB[] = [
    {
        id: "101",
        title: "Pizza",
        description: "Pizza metade quatro queijos, metade frango com catupiry",
        created_at: new Date("2022/02/06"),
        updated_at: new Date("2022/02/06"),
        creator_id: "1"
    },
    {
        id: "102",
        title: "Brigadeiro",
        description: "Brigadeiro de festa",
        created_at: new Date("2022/02/06"),
        updated_at: new Date("2022/02/06"),
        creator_id: "2"
    },
    {
        id: "103",
        title: "Bolo de cenoura",
        description: "Bolo de cenoura com cobertura de chocolate",
        created_at: new Date("2022/02/06"),
        updated_at: new Date("2022/02/06"),
        creator_id: "3"
    }
]