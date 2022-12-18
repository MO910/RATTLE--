import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import usersSchema from "~/server/models/Users/Users";
import connect from "~/server/functions/connect";

export default defineEventHandler(async (event) => {
    const { SECRET_KEY, MONGO_URL } = process.env;
    const body = await readBody(event);
    // connect to mongoose
    await connect(mongoose, MONGO_URL);
    // login
    let auth = (
        await usersSchema.find({
            username: body.username,
            password: body.password,
        })
    )[0];
    if (auth)
        // create a token
        return {
            token: await jwt.sign(
                { user: { _id: auth._id, first_name: auth.first_name } },
                SECRET_KEY
            ),
        };
    else throw { status: 403 };
});
