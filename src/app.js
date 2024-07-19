require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');


app.post('/generate-token', (req, res) => {
    try {
        const payload = {
            iss: "firebase-adminsdk-b3ydm@vmafinalproject.iam.gserviceaccount.com",
            scope: "https://www.googleapis.com/auth/firebase.messaging",
            aud: "https://oauth2.googleapis.com/token",
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            iat: Math.floor(Date.now() / 1000)
        };

        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});