const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
// const reactionRoutes = require('./reactionRoutes')

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);
// router.use('/reaction', reactionRoutes)
module.exports = router;

// <-------- Do I need a reactionRoutes.js?------->