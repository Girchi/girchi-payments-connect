const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const axios = require('axios');
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
dotenv.config();
const axiosInstance = axios.create({ baseURL: process.env.DRUPAL_DOMAIN });
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

app.post("/api", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const refresh_token = req.body.refresh_token;

    const form = new URLSearchParams();
    form.append('client_id', process.env.CLIENT_ID);
    form.append('client_secret', process.env.SECRET_KEY);
    
    if(username && password) {
        form.append('grant_type', 'password');
        form.append('username', username);
        form.append('password', password);
        axiosInstance.post('/oauth/token', form)
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                const err = error.response?.data?.error ?? 'error retrieving token';
                res.json({"error": err});
            })
    }

    if(refresh_token) {
        form.append('grant_type', 'refresh_token');
        form.append('refresh_token', refresh_token);
        axiosInstance.post('/oauth/token', form)
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                const err = error.response?.data?.error ?? 'error refreshing token';
                res.json({"error": err});
            })
    }
})

const PORT = process.env.PORT || 5000;
if(process.env.ENVIROMENT === 'local'){
    https.createServer({
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT),
    }, app).listen(PORT, () => {console.log(`Server listening on ${PORT}`)});
} else {
    app.listen(PORT, () => {console.log(`Server listening on ${PORT}`)});
}
