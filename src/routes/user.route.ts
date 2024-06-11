import { userController } from "../controller";
import { FastifyInstance } from "fastify";

const userRoute = async (app: FastifyInstance) => {
    app.get('/', userController.getUsers);
    app.get('/:id', userController.getUserById);
    app.post('/buy', userController.simpleBuyItem);
}

export default userRoute