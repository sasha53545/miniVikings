import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

const BorderLinearProgress = withStyles(() =>
    createStyles({
        bar: {
            backgroundColor: '#e65100',
        },
    }),
)(LinearProgress);


const LinearDeterminate = () => {
    const [progress, setProgress] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <BorderLinearProgress variant="indeterminate" value={progress} />
        </div>
    );
};

export default LinearDeterminate;
