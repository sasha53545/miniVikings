const {Router} = require('express');
const router = Router();
const Board = require('../models/Board');

router.get(
    '/boards',
    [],
    async (request, response) => {
        try {
            const boards = await Board.find({deleted: false});
            response.status(200).json(boards);
        } catch (e) {
            response.status(500).json({message: 'Что-то пошла не так, попробуйте снова'});
        }
    }
);

router.post(
    '/board-create',
    [],
    async (request, response) => {
        try {
            const user = request.user;
            console.log('user', user);
            if(!user) return response.status(400).send('You are not authorised');
            const {headOfTribe, tribalResident, age, profession, tribe, icon} = request.body;
            const board = new Board({headOfTribe, tribalResident, age, profession, tribe, icon, deleted: false});
            await board.save();

            const boards = await Board.find({deleted: false});
            response.status(200).json(boards);
        } catch (e) {
            response.status(500).json({error: e.message, message: 'Что-то пошла не так, попробуйте снова'});
        }
    }
);

router.post(
    '/board-delete/:id',
    [],
    async (request, response) => {
        try {
            const user = request.user;
            console.log('user', user);
            if(!user) return response.status(400).send('You are not authorised');
            const _id = request.params.id;
            await Board.update(
                {_id},
                {deleted: true},
            );

            const boards = await Board.find({deleted: false});
            response.status(200).json(boards);
        } catch (e) {
            response.status(500).json({error: e.message, message: 'Что-то пошла не так, попробуйте снова'});
        }
    }
);

router.get(
    '/board{id}',
    [],
    async (request, response) => {

    }
);

module.exports = router;
