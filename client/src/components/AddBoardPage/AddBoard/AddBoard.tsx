import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {Box, Card, CardActionArea, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {RootState} from "../../../redux";
import PhotoIcon from '@material-ui/icons/Photo';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router";
import ListImages from "../ListImages/ListImages";
import {createBoard, createBoardWrapped} from "../../../redux/board";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrappAddBoard: {
            width: '70%',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
        },
        wrappForm: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'flex-end',
        },
        formControl: {},
        img: {
            width: '100%',
            height: '100%',
        },
        menuImages: {
            width: '20%',
            height: '20%',
        },
        wrappImage: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
        imgContainer: {
            width: '150px',
            height: '130px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: '10px',
            border: '1px #795548 solid',
            cursor: 'pointer',
            margin: theme.spacing(2),
            padding: '5px',
        },
        inputsContainer: {
            '& > *': {
                margin: theme.spacing(2),
                width: '50ch',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            },
        },
        selectIcon: {
            textAlign: 'center',
            height: '30px',
        },
        iconAndInputsContainer: {
            display: 'flex',
            justifyContent: 'space-evenly',
        },
        button: {
            width: '150px',
            height: '40px',
            color: 'white',
            backgroundColor: '#795548',
            '&:hover': {
                backgroundColor: '#5d4037',
            }
        },
        wrappButtons: {
            width: '320px',
            display: 'flex',
            justifyContent: 'space-between',
            margin: theme.spacing(2),
        },
        isSelectedImage: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
        }
    }),
);

const FormControlBoard = withStyles({
    root: {
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#795548',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#795548',
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#795548',
        }
    },
})(FormControl);

const ImageIcon = withStyles({
    root: {
        color: '#795548',
        width: '80px',
        height: '80px',
    },
})(PhotoIcon);

interface Tribe {
    name: string,
}

interface Profession {
    name: string,
}

const AddBoard: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const tribes = useSelector((state: RootState) => state.dictionaries.tribes);
    const username = useSelector((state: RootState) => state.auth.username);
    const professions = useSelector((state: RootState) => state.dictionaries.professions);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const [listImages, setListImages] = useState(false);
    const [formBoard, setFormBoard] = useState<any>({
        headOfTribe: username,
        tribalResident: '',
        age: '',
        icon: '',
        tribe: '',
        profession: '',
    });

    const handleSelectIcon = (icon: string) => {
        setFormBoard({
            ...formBoard,
            icon,
        })
    };

    const handleFormBoard = (event: any) => {
        if (event) {
            event.preventDefault();
        }
        setFormBoard({
            ...formBoard,
            [event.target.name]: event.target.value,
        });
    };

    const onAddBoard = (event: any) => {
        if (event) {
            event.preventDefault();
        }

        dispatch(createBoardWrapped(formBoard));

        return history.push('/dashboard');
    };

    const onListImages = () => {
        setListImages(!listImages);
    };

    return (
        <Box boxShadow={2} className={classes.wrappAddBoard}>
            {listImages && <ListImages handleFormBoard={handleFormBoard} onListImages={onListImages}
                                       handleSelectIcon={handleSelectIcon} listImages={listImages}/>}
            <form className={classes.wrappForm} noValidate autoComplete="off">
                <Box className={classes.iconAndInputsContainer}>
                    <CardActionArea className={classes.imgContainer} onClick={onListImages}>
                        {formBoard.icon !== '' && <img src={formBoard.icon} className={classes.isSelectedImage}/> ||
                        <Box>
                            <ImageIcon/>
                            <div className={classes.selectIcon}>Select image</div>
                        </Box>}
                    </CardActionArea>
                    <Box className={classes.inputsContainer}>
                        <FormControlBoard variant="outlined" className={classes.formControl}>
                            <TextField id="tribalResident" label="Имя жителя" onChange={handleFormBoard} name='tribalResident'
                                        value={formBoard.tribalResident}
                                        variant="outlined"/>
                        </FormControlBoard>
                        <FormControlBoard variant="outlined" className={classes.formControl}>
                            <TextField id="age" label="Возраст жителя" onChange={handleFormBoard} name='age' value={formBoard.age}
                                        variant="outlined"/>
                        </FormControlBoard>
                        <FormControlBoard variant="outlined" className={classes.formControl}>
                            <InputLabel id="profession">Профессия</InputLabel>
                            <Select
                                name='profession'
                                labelId="profession"
                                id="profession"
                                value={formBoard.profession}
                                onChange={handleFormBoard}
                                label="profession"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {professions.map((profession: Profession) => (
                                    <MenuItem value={profession.name}>{profession.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControlBoard>
                        <FormControlBoard variant="outlined" className={classes.formControl}>
                            <InputLabel id="tribe">Племя</InputLabel>
                            <Select
                                labelId="tribe"
                                id="tribe"
                                name='tribe'
                                value={formBoard.tribe}
                                onChange={handleFormBoard}
                                label="tribe"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {tribes.map((tribe: Tribe) => (
                                    <MenuItem value={tribe.name}>{tribe.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControlBoard>
                    </Box>
                </Box>
                <Box className={classes.wrappButtons}>
                    <Button
                        className={classes.button}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        className={classes.button}
                        onClick={onAddBoard}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Add
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddBoard;
