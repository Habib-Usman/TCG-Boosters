import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { Component } from "react";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import "./default.scss";

const initialState = {
    currentUser: null,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
        };
    }

    authListner = null;

    componentDidMount() {
        this.authListner = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot((snapshot) => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data(),
                        },
                    });
                });
            }

            this.setState({
                ...initialState,
            });
        });
    }

    componentWillUnmount() {
        this.authListner();
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="App">
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <HomepageLayout currentUser={currentUser}>
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
                                <MainLayout currentUser={currentUser}>
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
                </Routes>
            </div>
        );
    }
}

export default App;
