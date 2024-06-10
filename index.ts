import App from './src/app';
import dotenv from 'dotenv'

dotenv.config()

const app = App({
	logger: true
});

const PORT = process.env.PORT_DEV || 3000;

app.listen({ port: Number(PORT) }, (err) => {
	if(err) {
		app.log.error(err)
		process.exit(1)
	}
	app.log.info(`SERVER STARTED ON PORT:${PORT}`)
})