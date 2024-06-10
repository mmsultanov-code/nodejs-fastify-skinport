import { client } from '../config/db.config';

const getUsers = async () => {
    try {
        const res = await client.query(`SELECT * FROM users`);
        return res.rows;
    } catch (err) {
        throw err;
    }
};

const getUserById = async (id: number) => {
    try {
        const res = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return res.rows[0]; // Assuming you want a single user, not an array
    } catch (err) {
        throw err;
    }
};

export default {
    getUsers,
    getUserById
};