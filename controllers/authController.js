import StoreRepository from "../repository/sequalize/StoreRepository.js";
import { comparePasswords } from "./utils.js";
import jwt from 'jsonwebtoken'
import { secret } from "../config/auth/constans.js";

export const showLoginPage = (req, res) => {
    res.render('login')
}

export const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password
    try {
        const store = await StoreRepository.getByEmail(email)
        if (!store) {
            return res.render('login', {
                loginError: 'Nieprawidłowy adres email lub hasło'
            })
        }
        if (await comparePasswords(password, store.password)) {
            delete store.password
            req.session.loggedUser = store
            return res.redirect('/')
        }

        res.render('login', {
            loginError: 'Nieprawidłowy adres email lub hasło'
        })
    } catch (err) {
        console.error(err)
        next(err)
    }
}

export const logout = (req, res) => {
    req.session.loggedUser = undefined
    res.redirect('/')
}

export const onlyAuthUserMiddleware = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if (loggedUser) {
        next();
    } else {
        throw new Error('Unauthorized access')
    }
}

export const isJWTValid = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (accessToken == null) {
        return res.sendStatus(401)
    }

    jwt.verify(accessToken, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
    })
    next()
}