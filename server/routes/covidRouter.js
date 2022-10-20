const express = require('express');
const router = express.Router();

router.post('/confirm-date', async (req, res) => {
    console.log(req.body.time);
    const query = `INSERT INTO date_confirmed (match_id,date,time) VALUES ($1,$2,$3);`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.matchID, req.body.date, req.body.time], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            // console.log(result.rows)
            res.sendStatus(200);
            // console.log(data);
        })
    })
});

router.post('/tested-positive', async (req, res) => {
    console.log(req.body.date);
    const query = `SELECT customer.email FROM date_confirmed
    INNER JOIN match
    ON date_confirmed.match_id = match.match_id
    INNER JOIN customer
    ON match.person2 = customer.user_id
    WHERE match.person1 = 1 
    AND date_confirmed.date >= date ($1) - integer '14' 
    AND date_confirmed.date <= date ($1) 
    UNION
    SELECT customer.email FROM date_confirmed
    INNER JOIN match
    ON date_confirmed.match_id = match.match_id
    INNER JOIN customer
    ON match.person1 = customer.user_id
    WHERE match.person2 = 1 
    AND date_confirmed.date >= date ($1)  - integer '14' 
    AND date_confirmed.date <= date ($1) ;`;
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(query, [req.body.date], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            console.log(result.rows);
        })
    })
    await req.pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
       
        client.query('INSERT INTO covid_case (customer,date_of_infection) VALUES (1,$1)', [req.body.date], (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            console.log(result.rows);
            res.sendStatus(200);
            // console.log(data);
        })
    })
});

module.exports = router;