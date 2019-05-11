// Configuring the database
const dbConfig = require('./server/config/database.config')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
var cookieParser = require('cookie-parser');

// Port
const port = process.env.PORT || 5000

// mongodb global
mongoose.Promise = global.Promise

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    //delete all headers related to cache a
    req.headers['if-none-match'] = '';
    req.headers['if-modified-since'] = '';
    next();
});

app.use(cookieParser())

var whitelist = ['http://localhost:3000']

app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(whitelist.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    // allowedHeaders: ["Cookie"]
}));

// parse requests of content-type - application/json
app.use(bodyParser.json())

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
require('./server/app/routes/thiSinhNhap.routes.js')(app);
require('./server/app/routes/khuVuc.routes.js')(app);
require('./server/app/routes/doiTuong.routes.js')(app);
require('./server/app/routes/nganh.routes.js')(app);
require('./server/app/routes/nganhKhoi.routes.js')(app);
require('./server/app/routes/khoi.routes.js')(app);
require('./server/app/routes/khoiMon.routes.js')(app);
require('./server/app/routes/mon.routes.js')(app);