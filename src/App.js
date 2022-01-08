import { Route, Routes } from "react-router-dom";
import { checkUserSession } from "./components/redux/User/user.actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//components
import AdminToolbar from "./components/AdminToolbar";

//hoc
import WithAuth from "./components/hoc/withAuth";
import WithAdminAuth from "./components/hoc/withAdminAuth";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";

import "./default.scss";

const App = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserSession());
    });

    return (
        <div className="App">
            <AdminToolbar></AdminToolbar>
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
                    path="/product/:productID"
                    element={
                        <MainLayout>
                            <ProductDetails></ProductDetails>
                        </MainLayout>
                    }
                ></Route>
                <Route
                    exact
                    path="/search"
                    element={
                        <MainLayout>
                            <Search></Search>
                        </MainLayout>
                    }
                ></Route>
                <Route
                    path="/search/:filterType"
                    element={
                        <MainLayout>
                            <Search></Search>
                        </MainLayout>
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
                            <DashboardLayout>
                                <Dashboard></Dashboard>
                            </DashboardLayout>
                        </WithAuth>
                    }
                ></Route>
                <Route
                    path="/admin"
                    element={
                        <WithAdminAuth>
                            <AdminLayout>
                                <Admin />
                            </AdminLayout>
                        </WithAdminAuth>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
