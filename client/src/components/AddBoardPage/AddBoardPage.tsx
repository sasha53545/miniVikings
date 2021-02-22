import React, {useEffect} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {
    getBoardIconsWrapped, getBoardProfessionsWrapped, getBoardTribesWrapped
} from "../../redux/dictionaries";
import {useDispatch} from "react-redux";
import Container from "@material-ui/core/Container";
import Navbar from "./Navbar/Navbar";
import {Box} from "@material-ui/core";
import AddBoard from "./AddBoard/AddBoard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrappAddBoardPage: {
            width: '100%',
            height: '90vh',
        },
        wrappContainer: {
            height: '90vh',
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
        dispatch(getBoardIconsWrapped());
        dispatch(getBoardTribesWrapped());
        dispatch(getBoardProfessionsWrapped());
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
