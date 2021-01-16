import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearDeterminate from "../../LinearDeterminate/LinearDeterminate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux";
import {signOutThunk} from "../../../redux/auth";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        nav: {
            backgroundColor: '#795548',
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const boardLoader = useSelector((state: RootState) => state.board.loader);

    const onLogout = async () => {
        dispatch(signOutThunk());
    };

    const onLogin = () => {
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.nav}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        MiniVikings
                    </Typography>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            {boardLoader && <LinearDeterminate/>}
        </div>
    );
}
