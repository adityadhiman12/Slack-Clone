const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const loggingMiddleware = require('./middleware/logginMiddleware');

const channelsRoute = require('./routes/channels');
const messagesRoute = require('./routes/messages');
const loginRoute = require('./routes/login');
const RegisterRoute = require('./routes/register');


const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(cookieParser());
app.use(loggingMiddleware);
app.use('/api/login', loginRoute);
app.use('/api/register', RegisterRoute);
app.use('/api/channels', channelsRoute);
app.use('/api/messages', messagesRoute);


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
