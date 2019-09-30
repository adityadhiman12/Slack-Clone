const express = require('express');


const exphbs = require('express-handlebars');
const loggingMiddleware = require('./middleware/logginMiddleware');

const channelsRoute = require('./routes/channels');
const messagesRoute = require('./routes/messages');


const app = express();


app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// loggin Middleware
app.use(loggingMiddleware);
// channel api routes
app.use('/api/channels', channelsRoute);
// message api route
app.use('/api/messages', messagesRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
