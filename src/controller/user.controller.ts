import { userService } from '../service';
import { FastifyReply, FastifyRequest } from 'fastify';

const getUsers = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const users = await userService.getUsers();
        res.status(200).send({
            statusCode: 200,
            msg: 'get successfully',
            users
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error',
            error: error
        });
    }
};

const getUserById = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { id } = req.params as { id: string };
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            res.status(400).send({
                statusCode: 400,
                msg: 'Invalid ID'
            });
            return;
        }
        const user = await userService.getUserById(userId);
        if(!user) res.status(404).send({
            statusCode: 404,
            msg: 'not found'
        })
        res.status(200).send({
            statusCode: 200,
            msg: 'get successfully',
            user
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error',
            error: error
        });
    }
};

export default {
    getUsers,
    getUserById
};