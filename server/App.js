const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const {PORT, JWT_SECRET, MONGO_PATH} = require('./config');

const app = express();

app.use(express.json({extended: true}));
app.use('/auth', require('./routes/auth.routes'));
app.use('', require('./routes/board.routes'));
app.use('/dictionaries', require('./routes/icon.routes'));
app.use('/dictionaries', require('./routes/tribe.routes'));
app.use('/dictionaries', require('./routes/profession.routes'));
app.use(require('./routes/config.routes'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser(JWT_SECRET));
app.use((req, res, next) => {
    if (req.headers.authorization) {
        let tokenParts = req.headers.authorization
            .split(' ')[1]
            .split('.');
        let signature = crypto
            .createHmac('SHA256', JWT_SECRET)
            .update(`${tokenParts[0]}.${tokenParts[1]}`)
            .digest('base64');
        if (signature === tokenParts[2])
            req.user = JSON.parse(
                Buffer.from(tokenParts[1], 'base64').toString(
                    'utf8'
                )
            );
        next()
    }
    next()
});

const port = PORT || 5000;

async function start() {
    try {
        await mongoose.connect(MONGO_PATH,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        app.listen(PORT, () => console.log('[akazakav] Приложение запущено по порту', port));
    } catch (e) {
        console.log('[akazakav] Ошибка сервера', e.message);
        process.exit(1);
    }
}

start();
