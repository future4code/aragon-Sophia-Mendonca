import { ShowDatabase } from "../database/ShowDatabase"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import { RequestError } from "../errors/RequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { IBuyTicketInputDTO, IBuyTicketOutputDTO, ICreateShowInputDTO, ICreateShowOutputDTO, IDeleteTicketInputDTO, IGetShowsOutputDTO, ITicketDB, Show } from "../models/Show"
import { USER_ROLES } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public createShow = async (input: ICreateShowInputDTO) => {

        const { token, band, startAt } = input

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Missing or wrong Token")
        }

        if (!band || !startAt) {
            throw new RequestError("Missing parameters")
        }

        if (typeof band !== "string") {
            throw new RequestError("Paramether 'band' must be a string")
        }

        if (typeof startAt !== "string") {
            throw new RequestError("Paramether 'band' must be a string")
        }

        if (payload.role === USER_ROLES.NORMAL) {
            throw new UnauthorizedError("Unauthorized user")
        }

        const busyDate = await this.showDatabase.verifyDate(new Date(startAt))

        if (busyDate) {
            throw new RequestError("Show's date is busy")
        }

        if (startAt > "2022/12/11") {
            throw new RequestError("Show's date cannot exceed December 11th")
        }

        if (startAt < "2022/12/05") {
            throw new RequestError("Show's date cannot happens before December 5th")
        }

        const id = this.idGenerator.generate()

        const show = new Show(
            id,
            band,
            new Date(startAt)
        )

        await this.showDatabase.createShow(show)

        const response: ICreateShowOutputDTO = {
            message: "Show registered successfully",
            show
        }

        return response
    }

    public getShows = async () => {
        const showsDB = await this.showDatabase.getShows()

        const shows = showsDB.map(showDB => {
            return new Show(
                showDB.id,
                showDB.band,
                showDB.starts_at
            )
        })

        for (let show of shows) {
            const tickets: string | number = await this.showDatabase.getTickets(show.getId())

            show.setTickets(show.getTickets() - Number(tickets))
        }

        const response: IGetShowsOutputDTO = {
            shows
        }

        return response
    }

    public buyTicket = async (input: IBuyTicketInputDTO) => {
        const { token, showId } = input

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Wrong or missing token")
        }

        if (!showId) {
            throw new RequestError("Missing pararameters")
        }

        if (typeof showId !== "string") {
            throw new RequestError("Parameter 'showId' must be a string.")
        }

        const findShow = await this.showDatabase.verifyShow(showId)

        if (!findShow) {
            throw new NotFoundError("Show not found")
        }

        const findTicket = await this.showDatabase.verifyTicketShowBuy(showId, payload.id)

        if (findTicket) {
            throw new ConflictError("Ticket already purchased")
        }

        const shows = await this.getShows()

        const [ticketsShow] = shows.shows.filter((show: Show) => {
            return show.getId() === showId
        })

        if (ticketsShow.getTickets() < 1) {
            throw new RequestError("Tickets sold out")
        }

        const id = this.idGenerator.generate()

        const ticket: ITicketDB = {
            id: id,
            show_id: showId,
            user_id: payload.id
        }

        await this.showDatabase.newTicket(ticket)

        const response: IBuyTicketOutputDTO = {
            message: "Ticket purchased sucessfully"
        }

        return response
    }

    public deleteTicket = async (input: IDeleteTicketInputDTO) => {
        const { token, ticketId } = input

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Wrong or missing token")
        }

        if (!ticketId) {
            throw new RequestError("Missing parameter")
        }

        const findTicket = await this.showDatabase.verifyTicketShow(ticketId, payload.id)

        if (!findTicket) {
            throw new NotFoundError("Ticket not purchased")
        }

        if (payload.role === USER_ROLES.NORMAL) {
            if (payload.id !== findTicket.user_id) {
                throw new Error("Unauthorized user");
            }
        }

        await this.showDatabase.deleteTicket(ticketId)

        const response: IBuyTicketOutputDTO = {
            message: "Ticket removed sucessfully"
        }

        return response
    }
} 