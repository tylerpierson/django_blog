require('dotenv').config()

const app = require('./app-server')

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
	console.log(`I am listening on ${PORT}. We in the Building`)
})
