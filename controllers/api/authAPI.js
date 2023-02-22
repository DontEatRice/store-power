import { comparePasswords } from "../utils.js"
import jwt from 'jsonwebtoken'
import { secret } from "../../config/auth/constans.js"
import StoreRepository from "../../repository/sequalize/StoreRepository.js"

const BAD_CREDS_MESSAGE = 'Incorrect email or password!'
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 */
export const login = async (req, res) => {
    const email = req.body?.email
    const password = req.body?.password
    if (!email || !password) {
        return res.status(401).json({
            message: BAD_CREDS_MESSAGE
        })
    }
    try {
        const store = await StoreRepository.getByEmail(email)
        if (!store) {
            return res.status(401).json({
                message: BAD_CREDS_MESSAGE
            })
        }

        if (!await comparePasswords(password, store.password)) {
            return res.status(401).json({
                message: BAD_CREDS_MESSAGE
            })
        }
        const token = jwt.sign(
            {
                email: store.email,
                storeId: store.id
            },
            secret,
            { expiresIn: '1h' }
        )

        res.status(200).json({ token, storeId: store.id })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error occured",
            error: error.message
        })
    }
} 