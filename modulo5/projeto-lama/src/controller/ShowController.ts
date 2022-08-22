import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BaseError } from "../errors/BaseError";
import { IBuyTicketInputDTO, ICreateShowInputDTO, IDeleteTicketInputDTO } from "../models/Show";

export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) { }

    public createShow = async (req: Request, res: Response) => {
        try {
            const input: ICreateShowInputDTO = {
                token: req.headers.authorization,
                band: req.body.band,
                startAt: req.body.startAt
            }

            const response = await this.showBusiness.createShow(input)
            res.status(201).send(response)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Unexpected error in show registration" })
        }
    }

    public getShows = async (req: Request, res: Response) => {
        try {

            const response = await this.showBusiness.getShows()
            res.status(200).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Unexpected error in shows search" })
        }
    }

    public buyTicket = async (req: Request, res: Response) => {
        try {
            const input: IBuyTicketInputDTO = {
                token: req.headers.authorization,
                showId: req.params.id
            }

            const response = await this.showBusiness.buyTicket(input)
            res.status(200).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Unexpected error in ticket sell" })
        }
    }

    public deleteTicket = async (req: Request, res: Response) => {
        try {
            const input: IDeleteTicketInputDTO = {
                token: req.headers.authorization,
                ticketId: req.params.id
            }

            const response = await this.showBusiness.deleteTicket(input)
            res.status(200).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Unexpected error in show removing" })
        }
    }
} 