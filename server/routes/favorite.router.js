const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = 'SELECT id, url FROM favorites';
  pool.query(queryText)
    .then((result) => { 
      console.log('Successful GET', result.rows);
      res.send(result.rows); })
    .catch((err) => {
      console.log('Error in favorites GET', err);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post('/', (req, res) => {
  res.sendStatus(200);
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  console.log('req.params', req.params);
  console.log('req.body', req.body);
  let favoriteId = req.params.favId;
  let categoryName = req.body.category;
  const queryText = `UPDATE "favorites" 
                SET "category_id" = (SELECT "category".id FROM "category"
                WHERE "category".name = '${categoryName}')
                WHERE "favorites".id = $1;`
  pool.query(queryText, [favoriteId])
    .then((result) => {
      console.log('Successful PUT');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in PUT', err);
      res.sendStatus(500);
    })
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/:id', (req, res) => {

});

module.exports = router;
