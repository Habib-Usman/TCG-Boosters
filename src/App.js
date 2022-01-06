import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { useEffect } from "react";
import { setCurrentUser } from "./components/redux/User/user.actions";
import { useSelector, useDispatch } from "react-redux";

//hoc
import WithAuth from "./components/hoc/withAuth";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";

import "./default.scss";

const App = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const authListner = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot((snapshot) => {
                    dispatch(
                        setCurrentUser({
                            id: snapshot.id,
                            ...snapshot.data(),
                        })
                    );
                });
            }

            dispatch(setCurrentUser(userAuth));
        });

        return () => {
            authListner();
        };
    });

    return (
        <div className="App">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <HomepageLayout>
                            <Homepage></Homepage>
                        </HomepageLayout>
                    }
                ></Route>
                <Route
                    path="/registration"
                    element={
                        <MainLayout>
                            <Registration></Registration>
                        </MainLayout>
                    }
                ></Route>
                <Route
                    path="/login"
                    element={
                        <MainLayout>
                            <Login></Login>
                        </MainLayout>
                    }
                ></Route>
                <Route
                    path="/recovery"
                    element={
                        <MainLayout>
                            <Recovery></Recovery>
                        </MainLayout>
                    }
                ></Route>
                <Route
                    path="/dashboard"
                    element={
                        <WithAuth>
                            <MainLayout>
                                <Dashboard></Dashboard>
                            </MainLayout>
                        </WithAuth>
                    }
                ></Route>
            </Routes>
        </div>
    );
};

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default App;
