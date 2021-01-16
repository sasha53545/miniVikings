const {Router} = require('express');
const router = Router();

const boardIcons = [
    {
        key: '1',
        value: '/images/board-logo/1.svg'
    },
    {
        key: '2',
        value: '/images/board-logo/2.svg'
    },
    {
        key: '3',
        value: '/images/board-logo/3.svg'
    },
    {
        key: '4',
        value: '/images/board-logo/4.svg'
    },
    {
        key: '5',
        value: '/images/board-logo/5.svg'
    },
    {
        key: '6',
        value: '/images/board-logo/6.svg'
    },
    {
        key: '7',
        value: '/images/board-logo/7.svg'
    },
    {
        key: '8',
        value: '/images/board-logo/8.svg'
    },
    {
        key: '9',
        value: '/images/board-logo/9.svg'
    },
    {
        key: '10',
        value: '/images/board-logo/10.svg'
    },
    {
        key: '11',
        value: '/images/board-logo/11.svg'
    },
    {
        key: '12',
        value: '/images/board-logo/12.svg'
    },
    {
        key: '13',
        value: '/images/board-logo/13.svg'
    },
    {
        key: '14',
        value: '/images/board-logo/14.svg'
    },
    {
        key: '15',
        value: '/images/board-logo/15.svg'
    },
    {
        key: '16',
        value: '/images/board-logo/16.svg'
    },
    {
        key: '17',
        value: '/images/board-logo/17.svg'
    },
    {
        key: '18',
        value: '/images/board-logo/18.svg'
    },
];

router.get(
    '/board-icons',
    [],
    async (request, response) => {
        try {
            response.status(200).json(boardIcons);
        } catch (e) {
            response.status(500).json({message: 'Что-то пошла не так, попробуйте снова'});
        }
    }
);

module.exports = router;
