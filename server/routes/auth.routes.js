const {Router} = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
const jwksClient = require('jwks-rsa');
const {JWT_SECRET} = require('./../config');

const client = jwksClient({
    strictSsl: false,
    jwksUri: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_nlPgYFjFU/.well-known/jwks.json',
});

function getKey(header, callback){
    console.log('header', header);
    client.getSigningKey(header.kid, function(err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

router.post('/update-token', [], async (request, response) => {
    const data = await request.body;

    jwt.verify(data.serverRefreshToken, JWT_SECRET, {}, function(err, decoded) {
        if(err) response.status(400).send(err);

        const {sub, email, 'cognito:username': username} = decoded;

        const accessToken = jwt.sign(
            {sub, email, username, kind: 'access'},
            JWT_SECRET,
            {expiresIn: '5m'},
        );

        const refreshToken = jwt.sign(
            {sub, email, username, kind: 'refresh'},
            JWT_SECRET,
            {expiresIn: '14d'},
        );

        response.status(200).send({accessToken, refreshToken});
    });
});

router.post('/token', [], async (request, response) => {
    const data = await request.body;

    jwt.verify(data.awsToken, getKey, {}, function(err, decoded) {
        if(err) response.status(400).send(err);

        const {sub, email, 'cognito:username': username} = decoded;

        const accessToken = jwt.sign(
            {sub, email, username, kind: 'access'},
           JWT_SECRET,
            {expiresIn: '5m'},
        );

        const refreshToken = jwt.sign(
            {sub, email, username, kind: 'refresh'},
           JWT_SECRET,
            {expiresIn: '14d'},
        );

        response.status(200).send({accessToken, refreshToken});
    });
});

module.exports = router;
