import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const { SECRET_KEY } = process.env;
    const bearerHeader = event.node.req.headers.authorization;
    if (bearerHeader) {
        const token = bearerHeader.split(" ")[1];
        return await jwt.verify(token, SECRET_KEY);
    } else throw { status: 403 };
});
