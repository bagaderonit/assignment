
import express from "express";
import cors from 'cors'
import { v4 } from "uuid";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import env from 'dotenv'
import { mongoClient } from "./services/DBservices.js";
import { DBConfigs, ERROR_MESSAGES, PORT_NUMBER } from "./services/constants.js";

// app configs

const app = express();
app.use(cors());
app.use(express.json())
env.config()


// constants
const PORT = process.env.PORT_NUMBER ?? PORT_NUMBER;


// starting the server and listening to an endpoint
app.listen(PORT, () => {
    console.log('listening the server to the port ', PORT);
})

// General Endpoint to list all the users

app.get('/', async (req, resp) => {
    await mongoClient.connect()
    const userCollection = mongoClient.db(DBConfigs.USER_DB_NAME).collection(DBConfigs.USER_COLLECTION_NAME);
    const users = await userCollection.find().toArray()
    resp.send(users)
})

app.post('/signup', async (req, resp) => {
    const { firstName, lastName, password, email } = req.body;
    try {
        await mongoClient.connect();
        const userCollection = mongoClient.db(DBConfigs.USER_DB_NAME).collection(DBConfigs.USER_COLLECTION_NAME);
        const sanitizedEmail = email?.toString()?.toLowerCase();
        if (!password || password.length < 6) {
            return resp.status(407).send(ERROR_MESSAGES.SHORT_PASSWORD)
        }
        const existingUser = await userCollection.findOne({ email })
        if (existingUser) {
            return resp.status(409).send(ERROR_MESSAGES.DUPLICATE_USER)
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = v4()
        const user = {
            firstName,
            lastName,
            fullName: firstName + ' ' + lastName,
            userId,
            hashedPassword,
            email: sanitizedEmail,
        }
        await userCollection.insertOne(user);
        const token = jwt.sign({ userId, sanitizedEmail }, process.env.AUTH_SECRET_KEY ?? 'secret', {
            expiresIn: '1h',
        })

        const userInfo = {
            token
        }
        resp.status(201).send(userInfo)
    } catch (e) {
        resp.status(500).send('Internal server error');
    } finally {
        await mongoClient.close();
    }
})


// login endpoint

app.post('/login', async (req, resp) => {
    const { email, password } = req.body;
    const sanitizedEmail = email?.toString()?.toLowerCase();

    try {
        await mongoClient.connect();
        const userCollection = mongoClient.db(DBConfigs.USER_DB_NAME).collection(DBConfigs.USER_COLLECTION_NAME);
        const user = await userCollection.findOne({ email: sanitizedEmail });
        if (!user) {
            resp.status(400).send(ERROR_MESSAGES.USER_NOT_EXIST)
            return
        }
        const matchedPassword = await bcrypt.compare(password, user.hashedPassword);
        if (!matchedPassword) {
            resp.status(400).send(ERROR_MESSAGES.WRONG_PASSWORD)
            return
        }
        const token = jwt.sign({ userId: user.userId, sanitizedEmail }, process.env.AUTH_SECRET_KEY ?? 'secret', {
            expiresIn: '1h',
        })

        const userResponse = {
            token
        }
        resp.status(200).send(userResponse);

    } catch (e) {
        resp.status(504).send('Internal server error...');
    } finally {
        await mongoClient.close();
    }
})


app.get('/me', authorizer, async (req, resp) => {
    const { userId } = req.user
    try {
        await mongoClient.connect()
        const userCollection = mongoClient.db(DBConfigs.USER_DB_NAME).collection(DBConfigs.USER_COLLECTION_NAME)
        const user = await userCollection.findOne({ userId })
        return resp.send(user)
    } catch (e) {
        return resp.send(500)
    } finally {
        mongoClient.close()
    }
})

async function authorizer(req, resp, next) {
    const authToken = req.headers.authorization?.split(' ')[1]
    if (!authToken) return resp.status(401).send(ERROR_MESSAGES.AUTH_TOKEN_MISSING)
    try {
        const decoded = jwt.verify(authToken, process.env.AUTH_SECRET_KEY ?? 'secret')
        req.user = decoded
        next()
    } catch (e) {
        return resp.status(403).send(ERROR_MESSAGES.INVLID_AUTH_TOKEN)
    }
}