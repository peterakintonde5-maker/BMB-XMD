const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk9CZGh1WkJUbXpyclZoSmIwdlpsS1M5Y3FIZWtNY0FjNHJJa0dFRnVWVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1BHQVZWV3d0RGZIZ29LS1pLV2c5dHBnSThuU0RsdE51MUltTHQ5Nm5RWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRzF3TTBRR2VRTVBUUS9HQm9sOWhtd3oxcWc3NTYxZENaM0VBM0RYNm0wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJISHY4YjFpcUc4MHY4T1N3dDNib0RFUUVJU21BYjF2d3hXQ25kTVhZaTE4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllNNWNvdjgzeTMrNjZIcnpwcmdFOFJCSmp4Y2h1eUFyMW1WL00rZG1RMlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxicnllbThKKzFML3FiaEJ5aUZsZlErRjdjMW9GSEdkS3duYzdWamR6WEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEd4K2xEQUdFekFaOWVrRmhPMFR6NnJ2L3cyamYvUGZoSS9TQzZSczBGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVFHajNDaDJ0ZklmTFRNTHFXdDNML3BRYXZqTUFxQno4ejJhUlhkL3dCWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1ERGNNSXFoOXh4THNnZ25lejNuaTl4VzJtZFhZWDNtVjVnbnpjYmtEY2dRTjh0UEVXTXVJSnp0NERiT1dzOFArT1A4aGxJejhJYjZrTnlqUlhJWGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAxLCJhZHZTZWNyZXRLZXkiOiJTSm93Y1VwVEZUbVhFd2o1NXJXQlRoQzMyWEtOU2NPd3JsYzVXenYzU1pjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxNjY1MjUxMTVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTdFODFFNjZGNEFCMkREQjc1NzQwM0M2OEMzNzgwQkYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NjA1MDgyNn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTE2NjUyNTExNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFRTMxODdGQjI1MjZGQkEyMThBN0JBNUQ0NkY1QzJEMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU2MDUwODM1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI1TlJNRENINyIsIm1lIjp7ImlkIjoiMjM0OTE2NjUyNTExNToxMUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjM2NzY5ODE5MDAxMDE4OjExQGxpZCIsIm5hbWUiOiLwn6W38J+Pvn5GWU4gU0hZVEV+8J+lt/Cfj74ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ091dm5kOENFUERxck1VR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InVoKzBEQzRpMGcxOEFaa3E0RDJNK2ZhTDA4dnk1MGM4cFRwV3NWUFpma3M9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik9RdGdSSHdMZktQMkFMTnBPY1pEdVEyd3FEbk55SHBvNnQ2ZHF5YThKRGVGK0VjNmwxY1p4bWpXZVZsR1JYZWJoUzIyek9TdUdLOGUrMjdDZm5makNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvUzZ0QTJET0VKWCsvSG92ZnpEQ1g3TXhnWCtjR1YxeGJQaEI3U0U2NCt6TDlsWGFpZkw1Nk1lRk9mN0x5L2xvSC9KdzBkS0N2SlFRZE82QmNmTUZpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxNjY1MjUxMTU6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYm9mdEF3dUl0SU5mQUdaS3VBOWpQbjJpOVBMOHVkSFBLVTZWckZUMlg1TCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU2MDUwODEzLCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUswWCJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255767862457",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, 
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes',
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
