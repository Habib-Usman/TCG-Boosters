import ShopYugioh from "./../../assests/7deaee8e7bd44f6a9c1e410780ca002a_Original.jpg";
import ShopPokemon from "./../../assests/2e28506fa3f74ffd82664720d12314dd_Original.jpg";
import "./styles.scss";
const Directory = (props) => {
    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{ backgroundImage: `url(${ShopYugioh})` }}
                >
                    <a>Shop Yugioh</a>
                </div>
                <div
                    className="item"
                    style={{ backgroundImage: `url(${ShopPokemon})` }}
                >
                    <a>Shop Pokemon</a>
                </div>
            </div>
        </div>
    );
};

export default Directory;
