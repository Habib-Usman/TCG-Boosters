import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = (props) => {
    return (
        <div>
            <Header {...props}></Header>
            <div className="main">{props.children}</div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
