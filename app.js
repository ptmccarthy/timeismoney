
/**
 * Module dependencies.
 */

var logger = require('./logger');
var config = require('./config/config_server');

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , morgan = require('morgan')
  , methodOverride = require('method-override');

var app = express();

app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(morgan(config.morganLogFormat,{'stream': logger.stream}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
	app.locals.pretty = true;
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  logger.info('Express server listening on port ' + app.get('port'));
});
