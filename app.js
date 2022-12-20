import createError from 'http-errors';
import express from 'express';
import { dirname, join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';

//TODO stworzyć jakiś jeden plik w routes/ który będzie exportował to wszystko na raz
import indexRouter from './routes/index.js';
import storeRouter from './routes/storeRoute.js'
import productRouter from './routes/productRoute.js';
import pricebookRouter from './routes/pricebookRoute.js';
import unitRouter from './routes/unitRoute.js'
import storeApiRouter from './routes/api/storeApiRoute.js';
import productApiRouter from './routes/api/productApiRoute.js';
import pricebookApiRouter from './routes/api/pricebookApiRoute.js';
import unitOfMeasureApiRouter from './routes/api/unitOfMeasureApiRoute.js';
import session from 'express-session';
import { onlyAuthUserMiddleware } from './controllers/authController.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(session({
  secret: 'secret_password',
  resave: false
}))

app.use((req, res, next) => {
  const paths = req.path.split('/')
  res.locals.validationErrors = new Map()
  res.locals.navLocation = '/' + paths[1]
  /**
   * @param {string | Date | undefined} date 
   */
  res.locals.formatDate = (date) => {
    const dateFormat = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    if (!date)
      return ''
    if (typeof date === 'object' && date.constructor.name === 'Date')
      return dateFormat.format(date)
        .split('/')
        .reverse()
        .join('-')
    return date
  }
  res.locals.loggedUser = req.session.loggedUser
  if (!res.locals.loginError) {
    res.locals.loginError = undefined
  }
  next()
})

app.use('/', indexRouter);
app.use('/stores', storeRouter);
app.use('/products', productRouter);
app.use('/pricebooks', onlyAuthUserMiddleware, pricebookRouter)
app.use('/units', unitRouter)
// api endpoints
app.use('/api/stores', storeApiRouter)
app.use('/api/products', productApiRouter)
app.use('/api/pricebooks', pricebookApiRouter)
app.use('/api/units', unitOfMeasureApiRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
