const app = require('./config/app.config')
const { getMethod } = require('./middleware/router.helper')
app.use('/api', getMethod, require('./router'))
app.listen(3000, () => console.log('This server has been started!'))