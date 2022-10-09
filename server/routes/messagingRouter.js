const express = require('express');
const router = express.Router();

router.get('/matches/:id', async (req, res) => {
    const query = `SELECT matches.match_id, users.first_name, users.surname 
                   FROM matches 
                   INNER JOIN users 
                   ON matches.person2 = users.user_id 
                   WHERE person1=$1 
                   UNION 
                   SELECT matches.match_id, users.first_name, users.surname 
                   FROM matches 
                   INNER JOIN users 
                   ON matches.person1 = users.user_id 
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
    const query = `SELECT * FROM messages WHERE match_id = $1 ORDER BY date_message ASC;`;
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
