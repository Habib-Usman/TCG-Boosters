import Header from "../components/Header";
import Footer from "../components/Footer";

const HomepageLayout = (props) => {
    return (
        <div className="fullHeight">
            <Header></Header>
            {props.children}
            <Footer></Footer>
        </div>
    );
};

export default HomepageLayout;
