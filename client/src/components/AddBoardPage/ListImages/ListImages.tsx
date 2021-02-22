import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux";
import {Box, CardActionArea, createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        '@keyframes animateHover': {
            '0%': {
                borderRadius: '10px',
                backgroundColor: 'white',
                transition: '0',
            },
            '100%': {
                borderRadius: '10px',
                backgroundColor: '#e8eaf6',
                transition: '1',
            }
        },
        '@keyframes animateClick': {
            '0%': {
                opacity: '0',
            },
            '100%': {
                opacity: '1',
            }
        },
        wrappGrid: {
            animation: '$animateClick .3s ease-in-out',
            width: '400px',
            maxHeight: '180px',
            padding: '20px',
            margin: '0 0 160px 150px',
            backgroundColor: 'white',
            overflow: 'auto',
            zIndex: 3,
            borderRadius: '10px',
        },
        imgBox: {
            width: '80px',
            height: '80px',
        },
        wrappImg: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            '&:hover': {
                cursor: 'pointer',
                animation: '$animateHover .5s ease-in-out',
                animationFillMode: 'forwards',
            }
        },
        img: {
            width: '100%',
            height: '100%',
        },
        wrappBox: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            zIndex: 5,
        }
    }),
);

interface Props {
    handleFormBoard: any,
    onListImages: any,
    handleSelectIcon: any,
    listImages: boolean,
}

const ListImages: React.FC<Props> = (props) => {
    const classes = useStyles();
    const icons = useSelector((state: RootState) => state.dictionaries.icons);

    return (
        <Box className={classes.wrappBox} onClick={() => {
            props.listImages && props.onListImages();
        }}>
            <Box boxShadow={5} className={classes.wrappGrid}>
                <Grid container spacing={1}>
                    {icons.map((icon: any) => (
                        <Grid key={icon.value} item xs={4} className={classes.imgBox} onClick={() => {
                            props.handleSelectIcon(icon.value);
                            props.onListImages();
                        }}>
                            <CardActionArea className={classes.wrappImg}>
                                <img className={classes.img} src={icon.value}/>
                            </CardActionArea>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default ListImages;
