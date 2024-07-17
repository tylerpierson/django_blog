require('dotenv').config()

const app = require('./app-server')

const PORT = 5004 || 8000

app.listen(PORT, () => {
	console.log(`I am listening on 5004. We in the Building`)
})
