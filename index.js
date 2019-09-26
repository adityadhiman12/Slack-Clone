const express = require('express');
const mysql = require('mysql');
const exphbs = require('express-handlebars');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adi@29071998',
  database: 'chatboxDB',
});


db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('My SQL connected');
  }
});


app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// channel api routes
app.use('/api/channels', require('./routes/channels'));
app.use('/api/messages', require('./routes/messages'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
