const express = require('express');
// eslint-disable-next-line no-unused-vars
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');

const loggingMiddleware = require('./middleware/loggingMiddleware');


const channelsRouter = require('./routes/channels');
const messagesRouter = require('./routes/messages');
const loginRouter = require('./routes/login');
const RegisterRouter = require('./routes/register');
const mainPageRouter = require('./routes/mainPage');


const app = express();

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(loggingMiddleware);

app.use('/api/register', RegisterRouter);
app.use('/api/login', loginRouter);
app.use('/api/channels', channelsRouter);
app.use('/api/messages', messagesRouter);

app.use('/api/mainpage', mainPageRouter);


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
