import React, {useEffect, useState} from 'react';
import {makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux";
import {deleteBoard, getBoards} from "../../../redux/board";
import {getBoardIcons} from "../../../redux/dictionaries";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Box, IconButton} from "@material-ui/core";
import ConfirmActionDelete from "../../ConfirmActionDelete/ConfirmActionDelete";
import ConfirmActionEdit from "../../ConfirmActionEdit/ConfirmActionEdit";

const useStyles = makeStyles({
    '@keyframes animateHoverRow': {
        '0%': {
            transition: '0',
        },
        '100%': {
            color: 'white',
            backgroundColor: '#795548',
            transition: '1',
        }
    },
    '@keyframes animateHoverButton': {
        '0%': {
            transition: '0',
        },
        '100%': {
            color: 'white',
            transition: '1',
        }
    },
    table: {
        minWidth: '650px',
    },
    tableBody: {
        minHeight: '700px',
    },
    boardImage: {
        width: '100%',
        height: '100%',
    },
    boardIcon: {
        color: '#424242'
    },
    boardIconWrapp: {
        width: '200px',
        height: '50px',
    },
    tableRow: {
        '&:hover .MuiTableCell-body': {
            cursor: 'pointer',
            animation: '$animateHoverRow .5s ease-in-out',
            animationFillMode: 'forwards',
        },
        '&:hover .MuiIconButton-root': {
            cursor: 'pointer',
            animation: '$animateHoverButton .5s ease-in-out',
            animationFillMode: 'forwards',
        }
    },
    wrappIcon: {
        height: '50px',
        width: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

interface BoardOfTable {
    name: string,
    age: string,
    profession: string,
    tribe: string,
    icon: string,
    _id: string,
}

export default function AcccessibleTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const boards = useSelector((state: RootState) => state.board.data);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);
    const icons = useSelector((state: RootState) => state.dictionaries.icons);
    const [confirmDelete, setConfirmDelete] = useState({boardId: ''});
    const [confirmEdit, setConfirmEdit] = useState({boardId: ''});

    useEffect(() => {
        // if(Number(accessToken) - Number(refreshToken) >= 0) {
        //     console.log('a');
        //     dispatch(updateServerTokenThunk(refreshToken));
        // }
        dispatch(getBoards());
        dispatch(getBoardIcons());
    }, []);

    const onDeleteBoard = (id: string) => (event: any) => {
        if (event) {
            event.preventDefault();
        }

        dispatch(deleteBoard(id));
    };

    const onEditBoard = (id: string) => (event: any) => {
        if (event) {
            event.preventDefault();
        }

        dispatch(deleteBoard(id));
    };

    const onConfirmDelete = (id: any) => () => {
        setConfirmDelete({boardId: id});
    };

    const onConfirmEdit = (id: any) => () => {
        setConfirmEdit({boardId: id});
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"></TableCell>
                        <TableCell align='left'>Имя</TableCell>
                        <TableCell align="left">Возраст</TableCell>
                        <TableCell align="left">Профессия</TableCell>
                        <TableCell align="left">Племя</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                    {boards.map((board: BoardOfTable) => (
                        <TableRow className={classes.tableRow} key={board._id} onMouseLeave={() => {
                            onConfirmDelete('')();
                            onConfirmEdit('')();
                        }}>
                            <TableCell className={classes.boardIconWrapp} align="left"><img
                                className={classes.boardImage} src={board.icon}/></TableCell>
                            <TableCell align="left">{board.name}</TableCell>
                            <TableCell align="left">{board.age}</TableCell>
                            <TableCell align="left">{board.profession}</TableCell>
                            <TableCell align="left">{board.tribe}</TableCell>
                            <TableCell align="left">
                                <Box className={classes.wrappIcon}>
                                    {confirmEdit.boardId === board._id &&
                                    <ConfirmActionEdit onEditBoard={onEditBoard(board._id)}
                                                       onConfirmEdit={onConfirmEdit('')}/>}
                                    {!(confirmEdit.boardId === board._id) &&
                                    <IconButton aria-label="edit" onClick={onConfirmEdit(board._id)}
                                                className={classes.boardIcon}>
                                        <EditIcon/>
                                    </IconButton>}
                                </Box>
                            </TableCell>
                            <TableCell align="left">
                                <Box className={classes.wrappIcon}>
                                    {confirmDelete.boardId === board._id &&
                                    <ConfirmActionDelete onDeleteBoard={onDeleteBoard(board._id)}
                                                         onConfirmDelete={onConfirmDelete('')}/>}
                                    {!(confirmDelete.boardId === board._id) &&
                                    <IconButton aria-label="delete" onClick={onConfirmDelete(board._id)}
                                                className={classes.boardIcon}>
                                        <DeleteIcon/>
                                    </IconButton>}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
