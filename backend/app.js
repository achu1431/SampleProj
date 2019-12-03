const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require('crypto');



const dbconfig = require("./config/db.config.json");
const config = dbconfig.database.dbConfig;
dbpass = decrypt(config.password);

const options = {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4
};

mongoose.connect(`mongodb+srv://${config.username}:${dbpass}@${config.host}/${config.dbName}?retryWrites=true&w=majority`, options)
  .then(() => {
    console.log("Connected to DataBase");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.set('useCreateIndex', true)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

function decrypt(data) {
  pass = 'Break555';
  const key = crypto.scryptSync(pass, 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv('aes192', key, iv);
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = app;
