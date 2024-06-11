import { client } from '../config/db.config';

const getUsers = async () => {
    try {
        const res = await client.query('SELECT * FROM users');
        return res.rows;
    } catch (err) {
        throw new Error('Failed to fetch users');
    }
};

const getUserById = async (id: number) => {
    try {
        const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    } catch (err) {
        throw new Error(`Failed to fetch user with ID ${id}`);
    }
};

const deductBalance = async (userId: number, amount: number) => {
    const clientInstance = client
    try {
        const res = await clientInstance.query('SELECT balance FROM users WHERE id = $1 FOR UPDATE', [userId]);
        if (res.rows.length === 0) {
            throw new Error('User not found');
        }
        const balance = res.rows[0].balance;
        if (balance < amount) {
            throw new Error('Insufficient balance');
        }
        const newBalance = balance - amount;
        await clientInstance.query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, userId]);
        const updatedUser = await getUserById(userId);
        return { success: true, user: updatedUser };
    } catch (error) {
        return { success: false, msg: error };
    }
};

export default { getUsers, getUserById, deductBalance };