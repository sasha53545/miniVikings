import React, {useEffect} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {getBoardIcons, getBoardProfessions, getBoardTribes} from "../../redux/dictionaries";
import {useDispatch} from "react-redux";
import Container from "@material-ui/core/Container";
import Navbar from "./Navbar/Navbar";
import {Box} from "@material-ui/core";
import AddBoard from "./AddBoard/AddBoard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrappAddBoardPage: {
            width: '100%',
            height: '100vh',
        },
        wrappContainer: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }),
);

const AddBoardPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBoardIcons());
        dispatch(getBoardTribes());
        dispatch(getBoardProfessions());
    }, []);

    return (
        <Box className={classes.wrappAddBoardPage}>
            <Navbar/>
            <Container className={classes.wrappContainer}>
                <AddBoard/>
            </Container>
        </Box>
    );
};

export default AddBoardPage;
