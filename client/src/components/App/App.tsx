import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import DashboardPage from "../DashboardPage/DashboardPage";
import SignIn from "../SignIn/SignIn";
import Registration from "../SignUp/SignUp";
import {useDispatch, useSelector} from "react-redux";
import MainLoader from "../MainLoader/MainLoader";
import {RootState} from "../../redux";
import AddBoardPage from "../AddBoardPage/AddBoardPage";
import {awsSessionThunk} from "../../redux/auth";

const App: React.FC = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const authLoader = useSelector((state: RootState) => state.auth.loader);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(awsSessionThunk());
    }, []);

    return (
        <>
            {authLoader && <MainLoader/>}
            {!authLoader &&
            isAuth && <Switch>
                <Route exact path='/dashboard' render={() => <DashboardPage/>}/>
                <Route exact path='/add-board' render={() => <AddBoardPage/>}/>
                <Redirect to='/dashboard'/>
            </Switch> ||
            !isAuth && <Switch>
                <Route exact path='/login' render={() => <SignIn/>}/>
                <Route exact path='/registration' render={() => <Registration/>}/>
                <Redirect to='/login'/>
            </Switch>
            }
        </>
    );
};

export default App;
