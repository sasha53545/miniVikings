import React, {useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import Navbar from "./Navbar/Navbar";
import Table from "./Table/Table";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrappDashboardPage: {
            width: '100%',
            height: '90vh',
        },
        wrappContainer: {
            padding: '140px 0 0 0',
            height: '100%',
        },
        wrappButton: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0 0 40px 0'
        },
        button: {
            width: '150px',
            height: '40px',
            margin: '40px 0 0 0',
            color: 'white',
            backgroundColor: '#795548',
            '&:hover': {
                backgroundColor: '#5d4037',
            }
        },
    }),
);

const DashboardPage: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const onAddBoard = () => {
        history.push('/add-board');
    };

    return (
        <Box className={classes.wrappDashboardPage}>
            <Navbar/>
            <Container className={classes.wrappContainer}>
                <Table/>
                <Box className={classes.wrappButton}>
                    <Button type="submit"
                            fullWidth
                            variant="contained"
                            onClick={onAddBoard}
                            className={classes.button}>
                        New board
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default DashboardPage;
