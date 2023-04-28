const express = require('express');

const app = express();

const loginRoutes = require('./routes/login');


app.use(loginRoutes);





app.listen(4000);
