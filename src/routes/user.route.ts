import { userController } from "../controller";
import { FastifyInstance } from "fastify";

const userRoute = async (app: FastifyInstance) => {
    app.get('/', userController.getUsers);
    app.get('/:id', userController.getUserById);
}

export default userRoute