const express = require('express');


const exphbs = require('express-handlebars');

const channelsRoute = require('./routes/channels');
const messagesRoute = require('./routes/messages');
const loginRoute = require('./routes/login');
const loggingMiddleWare = require('./middleware/loggingMiddleware');

const app = express();


app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// logging middleware
app.use(loggingMiddleWare);
// channel api routes
app.use('/api/channels', channelsRoute);
// message api route
// app.use('/api/messages', messagesRoute);
// login api route
// app.use('/api/login', loginRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
