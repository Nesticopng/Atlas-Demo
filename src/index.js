const app = require('./server')

app.listen(app.get('port'), () => {
    console.log('🔆✅'), app.get('port')
})