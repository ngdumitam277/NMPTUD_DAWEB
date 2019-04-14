// Configuring the database
const dbConfig = require('./server/config/database.config')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// Port
const port = process.env.PORT || 5000

// mongodb global
mongoose.Promise = global.Promise

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Access control allow origin
app.use(cors())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit();
})

app.listen(port, () => console.log(`Server started on port ${port}`))

// Require routes
require('./server/app/routes/taikhoan.routes.js')(app);
require('./server/app/routes/ngQuanLy.routes.js')(app);
require('./server/app/routes/canbo.routes.js')(app);
require('./server/app/routes/ngNhapData.routes.js')(app);
require('./server/app/routes/ngNhapDiem.routes.js')(app);
require('./server/app/routes/phanhoi_phuckhao.routes.js')(app);
require('./server/app/routes/diemThi.routes.js')(app);
require('./server/app/routes/thiSinh.routes.js')(app);
require('./server/app/routes/taikhoanLog.routes.js')(app);