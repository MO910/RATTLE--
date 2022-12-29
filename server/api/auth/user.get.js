import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const { SECRET_KEY } = process.env;
    const { authorization } = event.node.req.headers;
    if (authorization) {
        return await jwt.verify(authorization, SECRET_KEY);
    } else throw { status: 403 };
});
