/*jshint esversion: 8 */

const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const bookController = require('../controllers/bookController');
const debug = require('debug')('app:bookRoutes');
const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');

function router(nav) {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);
  bookRouter.route('/').get(getIndex);

  bookRouter.route('/:id').get(getById);
  return bookRouter;
}

module.exports = router;

// const express = require('express');
// const bookRouter = express.Router();
// const { MongoClient } = require('mongodb');
// const sql = require('mssql');
// const debug = require('debug')('app:bookRoutes');
// function router(nav) {
//   const books = [
//     {
//       title: 'War and Peace',
//       genre: 'Historical Fiction',
//       author: 'Lev Nikolayevich Tolstoy',
//       read: false,
//     },
//     {
//       title: 'Les Misérables',
//       genre: 'Historical Fiction',
//       author: 'Victor Hugo',
//       read: false,
//     },
//     {
//       title: 'The Time Machine',
//       genre: 'Science Fiction',
//       author: 'H. G. Wells',
//       read: false,
//     },
//     {
//       title: 'A Journey into the Center of the Earth',
//       genre: 'Science Fiction',
//       author: 'Jules Verne',
//       read: false,
//     },
//     {
//       title: 'The Dark World',
//       genre: 'Fantasy',
//       author: 'Henry Kuttner',
//       read: false,
//     },
//     {
//       title: 'The Wind in the Willows',
//       genre: 'Fantasy',
//       author: 'Kenneth Grahame',
//       read: false,
//     },
//     {
//       title: 'Life On The Mississippi',
//       genre: 'History',
//       author: 'Mark Twain',
//       read: false,
//     },
//     {
//       title: 'Childhood',
//       genre: 'Biography',
//       author: 'Lev Nikolayevich Tolstoy',
//       read: false,
//     },
//   ];
//   bookRouter.route('/').get((req, res) => {
//     (async function query() {
//       const request = new sql.Request();
//       const { recordset } = await request.query('select * from books');
//       res.render('bookListView', {
//         nav,
//         title: 'Library',
//         books: recordset,
//       });
//     })();
//   });

//   bookRouter
//     .route('/:id')
//     .all((req, res, next) => {
//       (async function query() {
//         const { id } = req.params;

//         const request = new sql.Request();
//         const { recordset } = await request
//           .input('id', sql.Int, id)
//           .query('select * from books where id = @id');
//         // ('select * from books where id= ' + id');\
//         req.book = recordset[0];
//         next();
//         // same as  : array deconstructuring [req.book] = recordset
//       })();
//     })

//     .get((req, res) => {
//       // debug(recordset[0]);
//       res.render('bookView', {
//         nav,
//         title: 'Library',
//         book: req.book,
//       });
//     });

//   return bookRouter;
// }

// module.exports = router;

/*jshint esversion: 8 */
// const express = require('express');
// const { MongoClient, ObjectID } = require('mongodb');
// const debug = require('debug')('app:bookRoutes');
// const bookController = require('../controllers/bookController');

// const bookRouter = express.Router();

// function router(nav) {
//   // bookRouter.use((req, res, next) => {
//   //   if (req.user) {
//   //     next();
//   //   } else {
//   //     res.redirect('');
//   //   }
//   // });
//   bookRouter.route('/').get((req, res) => {
//     const url = 'mongodb://localhost:27017';
//     const dbName = 'libraryApp';

//     (async function mongo() {
//       let client;
//       try {
//         client = await MongoClient.connect(url);
//         debug('Connected correctly to server');

//         const db = client.db(dbName);

//         const col = await db.collection('books');

//         const books = await col.find().toArray();

//         res.render('bookListView', {
//           nav,
//           title: 'Library',
//           books,
//         });
//       } catch (err) {
//         debug(err.stack);
//       }
//       client.close();
//     })();
//   });

//   bookRouter.route('/:id').get((req, res) => {
//     const { id } = req.params;
//     const url = 'mongodb://localhost:27017';
//     const dbName = 'libraryApp';

//     (async function mongo() {
//       let client;
//       try {
//         client = await MongoClient.connect(url);
//         debug('Connected correctly to server');

//         const db = client.db(dbName);

//         const col = await db.collection('books');

//         const book = await col.findOne({ _id: new ObjectID(id) });
//         debug(book);
//         res.render('bookView', {
//           nav,
//           title: 'Library',
//           book,
//         });
//       } catch (err) {
//         debug(err.stack);
//       }
//     })();
//   });
//   return bookRouter;
// }

// module.exports = router;
