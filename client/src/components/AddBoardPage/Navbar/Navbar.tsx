import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux";
import {deleteCookie} from "../../../utils/cookie";
import LinearDeterminate from "../../LinearDeterminate/LinearDeterminate";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '7vh',
        },
        title: {
            flexGrow: 1,
        },
        nav: {
            height: '100%',
            backgroundColor: '#795548',
        },
    }),
);

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const dictionariesLoader = useSelector((state: RootState) => state.dictionaries.loader);

    const onLogout = async () => {
        deleteCookie('auth_token');
        history.push('/login');
    };

    const onBack = () => {
        history.push('/dashboard');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.nav}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        MiniVikings
                    </Typography>
                    <Button color="inherit" onClick={onBack}>Back</Button>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            {dictionariesLoader && <LinearDeterminate/>}
        </div>
    );
}
