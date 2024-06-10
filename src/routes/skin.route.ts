import { skinController } from "../controller";
import { FastifyInstance } from "fastify";

const skinport = async (app: FastifyInstance) => {
    app.get('/', skinController.getSkins);
}

export default skinport