var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hbs = require('hbs');

var routes = require('./routes/index');

//我们所说的 flash 即 connect-flash 模块https://github.com/jaredhanson/connect-flash，flash 是一个在 session 中用于存储信息的特定区域。信息写入 flash ，下一次显示完毕后即被清除。典型的应用是结合重定向的功能，确保信息是提供给下一个被渲染的页面。
var flash = require('connect-flash');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
app.use(flash());

// app.engine('hbs', exphbs({
//   layoutsDir: 'views',
//   defaultLayout: 'layout',
//   extname: '.hbs'
// }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db,
    url: settings.url,
    host: settings.host,
    port: settings.port
  })
}));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


//在模板文件里通过调用{{debug}}方便调试数据
hbs.registerHelper("debug", function(optionalValue) {  
  console.log("Current Context");
  console.log("====================");
  console.log(this);
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});


module.exports = app;
