const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOption');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built in middleware to handle urlencoded data, in other words, form data:'content-type':'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended : false }));

//built in middleware for json
app.use(express.json());

//serve static files
app.use('/',express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({ error: '404 Not found'});
    } else{
        res.type('txt').send('404 Not found');
    } 
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











































//Route handlers
// app.get('/hello(.html)?',(req, res, next ) => {
//     console.log('attempted to load hello.html');
//     next();
// },(req, res) => {
//     res.send('<h1>Hello World!</h1>');
// })


//chaining route handlers
// const one = (req, res, next) => {
//     console.log('one');
//     next();
// }

// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }

// const three = (req, res) => {
//     console.log('three');
//     res.send('<h1>Finished</h1>');
// }

// app.get('/chain(.html)?',[ one, two, three ]);
