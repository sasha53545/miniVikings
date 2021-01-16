import React from 'react';
import {Box, createStyles, IconButton, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrappBox: {
            width: '100px',
            height: '50px',
            backgroundColor: 'white',
            borderRadius: '30px',
            display: 'flex',
            justifyContent: 'space-between',
        },
        icon: {
            color: '#424242 !important',
        },
    }),
);

interface Props {
    onDeleteBoard: any,
    onConfirmDelete: any,
}

const ConfirmActionDelete: React.FC<Props> = (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.wrappBox}>
            <IconButton aria-label="done" className={classes.icon} onClick={props.onDeleteBoard}>
                <DoneIcon/>
            </IconButton>
            <IconButton aria-label="close" className={classes.icon} onClick={props.onConfirmDelete}>
                <CloseIcon/>
            </IconButton>
        </Box>
    );
};

export default ConfirmActionDelete;
