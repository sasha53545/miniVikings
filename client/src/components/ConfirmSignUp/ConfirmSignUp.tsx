import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {confirmingSignUpThunk} from "../../redux/auth";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="https://material-ui.com/">
                Kazakov Alexander
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ConfirmSignUp: React.FC = () => {
    const classes = useStyles();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isAuthError = useSelector((state: RootState) => state.auth.error);
    const dispatch = useDispatch();
    const history = useHistory();
    const [confirmingData, setSConfirmingData] = useState({
        username: '',
        confirmingCode: '',
    });

    const onChange = (event: any) => {
        setSConfirmingData({
            ...confirmingData,
            [event.target.name]: event.target.value,
        });
    };

    const onClickConfirmingCode = async (event: any) => {
        event.preventDefault();

        dispatch(confirmingSignUpThunk(confirmingData));

        return history.push('/login');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Confirm registration
                </Typography>
                <form className={classes.form} noValidate onSubmit={onClickConfirmingCode}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="confirmingCode"
                                label="Confirming Code"
                                name="confirmingCode"
                                autoComplete="confirmingCode"
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onClickConfirmingCode}
                    >
                        Confirm
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
};

export default ConfirmSignUp;
