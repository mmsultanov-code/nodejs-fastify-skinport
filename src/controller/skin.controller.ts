import { FastifyReply, FastifyRequest } from 'fastify';
import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 });

const getSkins = async (req: FastifyRequest, res: FastifyReply) => {
    const cacheKey = 'skins_with_prices';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.status(200).send({
            statusCode: 200,
            msg: 'Skins retrieved successfully (from cache)',
            data: cachedData,
        });
    }

    try {
        const [responseNonTradable, responseTradable] = await Promise.all([
            axios.get('https://api.skinport.com/v1/items', {
                params: { app_id: 730, currency: 'EUR', tradable: 0 },
                headers: { 'Accept-Encoding': 'gzip' },
            }),
            axios.get('https://api.skinport.com/v1/items', {
                params: { app_id: 730, currency: 'EUR', tradable: 1 },
                headers: { 'Accept-Encoding': 'gzip' },
            }),
        ]);

        const nonTradableItems = responseNonTradable.data;
        const tradableItems = responseTradable.data;

        const tradablePricesMap = new Map();
        tradableItems.forEach((item: { market_hash_name: string; min_price: number; }) => {
            if (!tradablePricesMap.has(item.market_hash_name) || tradablePricesMap.get(item.market_hash_name) > item.min_price) {
                tradablePricesMap.set(item.market_hash_name, item.min_price);
            }
        });

        const items = nonTradableItems.map((item: { market_hash_name: string; min_price: number; }) => ({
            name: item.market_hash_name,
            min_price_non_tradable: item.min_price,
            min_price_tradable: tradablePricesMap.get(item.market_hash_name) || null,
        }));

        cache.set(cacheKey, items);

        res.status(200).send({
            statusCode: 200,
            msg: 'Skins retrieved successfully',
            data: items,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error',
            error: error,
        });
    }
};

export default { getSkins };