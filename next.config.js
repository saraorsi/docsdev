require('dotenv').config();
const nextTranslate = require('next-translate');

module.exports = {
    env: {
        API_URL: process.env.API_URL
    },
    ...nextTranslate(),
}
