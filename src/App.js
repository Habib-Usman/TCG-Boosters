import "./default.scss";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <div className="main">
                <Homepage></Homepage>
            </div>
        </div>
    );
}

export default App;
