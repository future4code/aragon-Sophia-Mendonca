import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { ICreatePostDTO, IDeletePostInputDTO, IDislikePostInputDTO, IEditPostInputDTO, IGetPostsInputDTO, ILikePostInputDTO } from "../models/Post"

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    public newPost = async (req: Request, res: Response) => {
        try {
            const input: ICreatePostDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }
            const response = await this.postBusiness.newPost(input)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public getAllPosts = async (req: Request, res: Response) => {
        try {
            const input: IGetPostsInputDTO = {
                token: req.headers.authorization,
            }
            const response = await this.postBusiness.getAllPosts(input)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input: IDeletePostInputDTO = {
                token: req.headers.authorization,
                id: req.params.id
            }
            const response = await this.postBusiness.deletePost(input)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
    public likePost = async (req: Request, res: Response) => {
        try {
            const input: ILikePostInputDTO = {
                token: req.headers.authorization,
                id: req.params.id
            }
            const response = await this.postBusiness.likePost(input)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public deslikePost = async (req: Request, res: Response) => {
        try {

            const input: IDislikePostInputDTO = {
                token: req.headers.authorization,
                id: req.params.id
            }

            const response = await this.postBusiness.deslikePost(input)

            res.status(200).send(response)

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
} 