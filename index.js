const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const loggingMiddleware = require('./middleware/loggingMiddleware');

const channelsRouter = require('./routes/channels');
const messagesRouter = require('./routes/messages');
const loginRouter = require('./routes/login');
const RegisterRouter = require('./routes/register');


const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(cookieParser());
app.use(loggingMiddleware);

app.use('/api/register', RegisterRouter);
app.use('/api/login', loginRouter);
app.use('/api/channels', channelsRouter);
app.use('/api/messages', messagesRouter);


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
