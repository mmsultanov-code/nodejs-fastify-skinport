import { FastifyReply, FastifyRequest } from 'fastify'
import axios from 'axios';
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 300 }); // Кеширование на 5 минут (300 секунд)

const getSkins = async (req: FastifyRequest, res: FastifyReply) => {
    const cacheKey = 'skins';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.status(200).send({
            statusCode: 200,
            msg: 'Skins retrieved successfully (from cache)',
            data: cachedData,
        });
    }

    try {
        const response = await axios.get('https://api.skinport.com/v1/items', {
            params: {
                app_id: 730,
                currency: 'EUR',
                tradable: 0,
            },
            headers: {
                'Accept-Encoding': 'gzip',
            },
        });

        // Сохранение данных в кеш на 5 минут
        cache.set(cacheKey, response.data);

        res.status(200).send({
            statusCode: 200,
            msg: 'Skins retrieved successfully',
            data: response.data,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error',
            error: error,
        });
    }
};

export default {
    getSkins,
};