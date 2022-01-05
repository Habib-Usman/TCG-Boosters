import { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { auth } from "../../firebase/utils";

const initialState = {
    email: "",
};

class EmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email } = this.state;

            const config = {
                url: "http://localhost:3000/login",
            };

            // const navigate = useNavigate();
            await auth

                .sendPasswordResetEmail(email, config)
                .then(() => {
                    console.log("hello");
                    useNavigate("/login");
                })
                .catch(() => {
                    console.log("something went wrong");
                });
        } catch (err) {
            // console.log(err)
        }
    };

    render() {
        const { email } = this.state;

        const configAuthWrapper = {
            headline: "Email Password",
        };

        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        ></FormInput>

                        <Button type="submit">Email Password</Button>
                    </form>
                </div>
            </AuthWrapper>
        );
    }
}
export default EmailPassword;
