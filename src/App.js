import { Route, Routes } from "react-router-dom";
import { checkUserSession } from "./components/redux/User/user.actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
        dispatch(checkUserSession());
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

export default App;
