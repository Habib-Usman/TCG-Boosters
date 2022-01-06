import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { Component } from "react";
import { setCurrentUser } from "./components/redux/User/user.actions";
import { connect } from "react-redux";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import "./default.scss";

class App extends Component {
    authListner = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.authListner = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot((snapshot) => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.authListner();
    }

    render() {
        const { currentUser } = this.props;

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
                            currentUser ? (
                                <Navigate to="/"></Navigate>
                            ) : (
                                <MainLayout>
                                    <Registration></Registration>
                                </MainLayout>
                            )
                        }
                    ></Route>
                    <Route
                        path="/login"
                        element={
                            currentUser ? (
                                <Navigate to="/"></Navigate>
                            ) : (
                                <MainLayout>
                                    <Login></Login>
                                </MainLayout>
                            )
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
                </Routes>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
