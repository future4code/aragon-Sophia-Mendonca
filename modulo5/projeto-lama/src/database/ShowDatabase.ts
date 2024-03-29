import { IShowDB, ITicketDB, Show } from "../models/Show"
import { BaseDatabase } from "./BaseDatabase"

export class ShowDatabase extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    public toShowDBModel = async (show: Show) => {
        const showDB: IShowDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt()
        }

        return showDB
    }

    public verifyDate = async (date: Date): Promise<IShowDB | undefined> => {

        const dateFound: IShowDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .select()
            .where({ starts_at: date })

        return dateFound[0]
    }

    public createShow = async (show: Show) => {
        const showDB = await this.toShowDBModel(show)

        await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .insert(showDB)
    }

    public getShows = async (): Promise<IShowDB[] | undefined> => {
        const showsFound: IShowDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .select()

        return showsFound
    }

    public getTickets = async (id: string) => {

        const ticketsFound = await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
            .select()
            .count("id")
            .where({ show_id: id })


        return ticketsFound[0]["count(`id`)"]
    }

    public verifyShow = async (id: string): Promise<IShowDB | undefined> => {
        const showFound: IShowDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .select()
            .where({ id })

        return showFound[0]
    }

    public verifyTicketShow = async (id: string, idUser: string): Promise<ITicketDB | undefined> => {
        const ticketShow: ITicketDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .select()
            .where("id", "=", `${id}`)
            .andWhere("user_id", "=", `${idUser}`)

        return ticketShow[0]
    }

    public verifyTicketShowBuy = async (id: string, idUser: string): Promise<ITicketDB | undefined> => {
        const ticketPurchased: ITicketDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .select()
            .where("show_id", "=", `${id}`)
            .andWhere("user_id", "=", `${idUser}`)

        return ticketPurchased[0]
    }

    public newTicket = async (ticket: ITicketDB) => {

        await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .insert(ticket)
    }

    public deleteTicket = async (id: string) => {
        await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .delete()
            .where({ id })
    }
}