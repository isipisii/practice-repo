import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt"


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId

    try {
        if(!authenticatedUserId){
            throw createHttpError(401, "User not authenticated")
        }

        const user = await UserModel.findById(authenticatedUserId).select("+email").exec()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

interface ISignUpBody {
    username?: string
    email: string
    password: string
}

export const signUp: RequestHandler<unknown, unknown, ISignUpBody, unknown> = async (req, res, next) => {
    const { username, email, password: passwordRaw } = req.body

    try {
        if(!username || !email || !passwordRaw){
            throw createHttpError(400, "Missing parameters");
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec()

        if(existingUsername){
            throw createHttpError(409, "This username is already taken, please use different one.")
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec()

        if(existingEmail){
            throw createHttpError(409, "This e-mail is already taken, please use different one.")
        }
    
        const hashedPassword = await bcrypt.hash(passwordRaw, 10)

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        
        req.session.userId = newUser._id

        res.status(201).json(newUser);
    } catch (error) {
        next(error)
    }
}

interface ILoginBody {
    username?: string,
    password?: string
}

export const logIn: RequestHandler <unknown, unknown, ILoginBody, unknown> = async (req, res, next) => {
    const { username, password } = req.body

    try {
        if(!username || !password){
            throw createHttpError(400, "Missing parameters")
        }

        const user = await UserModel.findOne({username: username}).select("+password +email").exec()
        
        if(!user){
            throw createHttpError(401, "Invalid credentials")
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            throw createHttpError(401, "Invalid credentials")
        }

        req.session.userId = user._id
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

export const logOut: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error)
        }
        else {
            res.sendStatus(200)
        }
    })
}