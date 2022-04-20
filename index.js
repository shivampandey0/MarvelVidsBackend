require('dotenv').config();
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const databaseConnection = require('./database/dbConnect');

databaseConnection();

const userRouter = require('./routers/user.router');
// const productRouter = require('./routers/product.router');
// const cartRouter = require('./routers/cart.router');
// const wishlistRouter = require('./routers/wishlist.router');
// const addressRouter = require('./routers/address.router');
const videoRouter = require('./routers/video.router');
const likedVideoRouter = require('./routers/likedVideo.router');
const historyRouter = require('./routers/history.router');
const playlistRouter = require('./routers/playlist.router');
const noteRouter = require('./routers/note.router');
// const postRouter = require('./routers/post.router');
// const notificationRouter = require('./routers/notification.router');
const errorHandler = require('./middlewares/errorHandler');
const routeHandler = require('./middlewares/routeHandler');
const authenticate = require('./middlewares/authenticate');

app.get('/', (req, res) => {
  res.send({ success: true, message: 'Welcome to Marvel Vids' });
});

app.use('/users', userRouter);
app.use('/videos', videoRouter);
app.use('/history', authenticate, historyRouter);
app.use('/liked', authenticate, likedVideoRouter);
app.use('/playlist', authenticate, playlistRouter);
app.use('/note', authenticate, noteRouter);
// app.use('/products', productRouter);
// app.use('/wishlist', authenticate, wishlistRouter);
// app.use('/cart', authenticate, cartRouter);
// app.use('/address', authenticate, addressRouter);
// app.use('/post', authenticate, postRouter);
// app.use('/notify', authenticate, notificationRouter);

app.use(routeHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('server started on port:', port);
});
