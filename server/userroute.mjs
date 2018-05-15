import express from 'express';
import theUserLookup from '../server/userlookup';

const router = express.Router();
/* GET users listing. */
router.get('/', (req, res) => theUserLookup.findAll((err, ids) => res.set('Content-Type', 'application/json').send(ids).end()))

router.get('/:id', (req, res) => theUserLookup.findById(req.params.id, (err, user) => res.set('Content-Type', 'application/json').send(user).end()))

router.post('/', (req, res) => theUserLookup.save(req.body, (err, user) => res.set('Content-Type', 'application/json').send(user).end()))

export default router;
