const express = require( 'express' )

const router = express.Router()

router.get('/', ( req, res) => res.json({ message: "tasks" }) )
router.post('/', ( req, res) => res.json({ message: "tasks" }) )
router.post('/:id', ( req, res) => res.json({ message: "tasks" }) )

module.exports = router