const express = require('express');
const router = express.Router();

router.get('/matches/:id', async (req, res) => {
    const query = `SELECT match.match_id, customer.first_name, customer.surname 
                   FROM match 
                   INNER JOIN customer 
                   ON match.person2 = customer.user_id 
                   WHERE person1=$1 
                   UNION 
                   SELECT match.match_id, customer.first_name, customer.surname 
                   FROM match 
                   INNER JOIN customer 
                   ON match.person1 = customer.user_id 
                   WHERE person2=$1;`;
    await req.pool.connect((err, client, release) => {
        if (err){
            return console.error('Error acquiring client', err.stack);
        }
        client.query(query, [req.params.id], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack);
            }

            res.send(result.rows);
        })
    })
});

router.get('/messages/:id', async (req, res) => {
    const query = `SELECT * FROM message WHERE match_id = $1 ORDER BY date_message ASC;`;
    await req.pool.connect((err, client, release) => {
        if (err){
            return console.error('Error acquiring client', err.stack);
        }
        client.query(query, [req.params.id], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack);
            }

            res.send(result.rows);
        })
    })
});

module.exports = router;
