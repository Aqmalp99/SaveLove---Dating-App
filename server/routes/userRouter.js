const express = require('express');
const router = express.Router();

router.get('/dates/:id', async (req, res) => {
    console.log("works");
    const query = `SELECT customer.first_name, customer.surname, date_confirmed.date, date_confirmed.time FROM date_confirmed
                    INNER JOIN match
                    ON date_confirmed.match_id=match.match_id
                    INNER JOIN customer
                    ON match.person_1 = customer.user_id
                    WHERE
                    match.person_2 = $1
                    UNION
                    SELECT customer.first_name, customer.surname, date_confirmed.date, date_confirmed.time FROM date_confirmed
                    INNER JOIN match
                    ON date_confirmed.match_id=match.match_id
                    INNER JOIN customer
                    ON match.person_2 = customer.user_id
                    WHERE
                    match.person_1 = $1
                    ORDER BY date,time ASC;`;
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