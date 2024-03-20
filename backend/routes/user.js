import { Router } from "express";
import 'dotenv/config'
import zod from 'zod'
import jwt from 'jsonwebtoken'
import { User, Account } from "../models/db.js";
import bcrypt from 'bcrypt'
import { authMiddleware } from "../middleware/auth.js";


export const userRouter = Router()


const jwtSecretKey = process.env.JWT_SECRET_KEY

userRouter.post('/signup', async (req, res) => {

    const signupBody = zod.object({
        fullName: zod.string(),
        username: zod.string(),
        email: zod.string().email(),
        password: zod.string()
    })

    const { fullName, username, email, password } = req.body
    console.log(fullName, username, email, password)

    const { success } = signupBody.safeParse(req.body)

    if (!success) {
        res.status(411).json({ message: "Email already exists / Incorrect inputs" })
    }

    const existingUser = await User.findOne({ username: req.body.username })

    if (existingUser) {
        res.status(411).json({ message: "username already exists / Incorrect inputs" })
    }

    const user = await User.create({
        fullName,
        username,
        email,
        password: bcrypt.hashSync(password, 10),
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: (Math.random() * 10000) + 1 
    })

    const token = jwt.sign({ userId }, jwtSecretKey)



    res.json({
        message: "User Created successfully",
        token: token
    })

})

userRouter.post('/signin', async (req, res) => {


    const signinBody = zod.object({
        username: zod.string(),
        password: zod.string()
    })

    const { success } = signinBody.safeParse(req.body)

    if (!success) {
        res.status(411).json({ message: "Email already exists / Incorrect inputs" })
    }

    const userExists = await User.findOne({ $or: [{ username: username }, { email: username }] })
    const isUserPass = bcrypt.compareSync(password, userExists.password)

    if (isUserPass) {
        const token = jwt.sign({ userId: userExists._id }, jwtSecretKey)
        res.json({ token: token })
    }

    res.status(401).json({ message: "Username or password incorrect" })

})

userRouter.put("/", authMiddleware, async (req, res) => {
    const updateBody = zod.object({
        fullName: zod.string().optional(),
        password: zod.string().optional()
    })

    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({ message: "Error while updating information" })
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully"
    })
})


userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        fullName: {
            "$regex": filter
        }

    })

    res.json({
        users: users.map(user => ({
            username: user.username,
            fullName: user.fullName,
            _id: user._id
        }))
    })
})