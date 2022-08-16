import { IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Auth_Users"

    public signup = async (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword()
        }

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public findByEmail = async (email: string) => {
        const emailFound: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ email })

        return emailFound[0]
    }

    public getAllUsers = async () => {
        const AllUsers: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()

        return AllUsers
    }

    public getUsersByNickname = async (search: string) => {
        const UsersByNickname: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where("nickname", "LIKE", `${search}`)

        return UsersByNickname
    }

    public editUser = async (id: string, nickname: string, email: string, password: string) => {
        const userEdited: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update("nickname", "email", "password")
            .where({ id, nickname, email, password })

        return userEdited
    }

    public deleteUser = async (id: string) => {
        const userCannotDeleted = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .delete()
        .where({ id })
    
        return userCannotDeleted
      }
}