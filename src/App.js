import { Route, Routes } from "react-router-dom";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import "./default.scss";

function App() {
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
            </Routes>
        </div>
    );
}

export default App;
