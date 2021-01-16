const {Router} = require('express');
const router = Router();
const Tribe = require('../models/Tribe');

router.get(
    '/board-tribes',
    [],
    async (request, response) => {
        try {
            const tribes = await Tribe.find();

            response.status(200).json(tribes);
        } catch (e) {
            response.status(500).json({message: 'Что-то пошла не так, попробуйте снова'});
        }
    }

);

module.exports = router;
