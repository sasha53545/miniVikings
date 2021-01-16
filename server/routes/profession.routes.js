const {Router} = require('express');
const router = Router();
const Profession = require('../models/Profession');

router.get(
    '/board-professions',
    [],
    async (request, response) => {
        try {
            const professions = await Profession.find();

            response.status(200).json(professions);
        } catch (e) {
            response.status(500).json({message: 'Что-то пошла не так, попробуйте снова'});
        }
    }

);

module.exports = router;
