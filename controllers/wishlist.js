const express = require('express')
const router = express.Router()
const Wishlist = require('../models/wishlist.js')

router.get('/', (req, res) => {
    Wishlist.find({}, (err, foundWishlist) => {
        res.json(foundWishlist);
    })
});

router.post('/', (req, res) => {
    Wishlist.create(req.body, (error, createdWishlist) => {
        res.json(createdWishlist);
    });
});

router.delete('/:id', (req, res) => {
    Wishlist.findByIdAndRemove(req.params.id, (error, deletedWishlist) => {
        res.json(deletedWishlist);
    });
});

router.put('/:id', (req, res) => {
    Wishlist.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedWishlist) => {
        res.json(updatedWishlist);
    })
});

module.exports = router;