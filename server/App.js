const jwt = require("jsonwebtoken");

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const {PORT, JWT_SECRET, MONGO_PATH} = require('./config');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./routes/config.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use((req, res, next) => {
    if (req.headers.authorization) {
        const user = jwt.verify(req.headers.authorization.replace('Bearer ', ''), JWT_SECRET);
        req.user = user;
        if (!user) {
            res.send('User not found');
            return;
        }
    }
    return next();
});
app.use('', require('./routes/board.routes'));
app.use('/dictionaries', require('./routes/icon.routes'));
app.use('/dictionaries', require('./routes/tribe.routes'));
app.use('/dictionaries', require('./routes/profession.routes'));

const port = PORT || 5000;

async function start() {
    try {
        await mongoose.connect(MONGO_PATH, {
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
