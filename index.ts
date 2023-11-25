const app = require('./src/app');

app.get('/', (req, res)=>{
    res.status(200).json('MusiKar');
})