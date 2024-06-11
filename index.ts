import App from './src/app';
import dotenv from 'dotenv';

dotenv.config();

const app = App({ logger: true });

const PORT = Number(process.env.PORT_DEV) || 3000;

app.listen({ port: PORT }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server started on port: ${PORT}`);
});