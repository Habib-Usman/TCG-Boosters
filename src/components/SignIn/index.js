import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../withRouter";
import { useDispatch, useSelector } from "react-redux";
import {
    signInUser,
    signInWithGoogle,
    resetAllAuthForms,
} from "../redux/User/user.actions";

import "./styles.scss";
import Buttons from "../forms/Button";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess,
});

const SignIn = (props) => {
    const { signInSuccess } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (signInSuccess) {
            resetForm();
            dispatch(resetAllAuthForms());
            props.navigate("/");
        }
    }, [signInSuccess]);

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));
    };

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    };

    const configAuthWrapper = {
        headline: "Login",
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                    ></FormInput>
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={(e) => setPassword(e.target.value)}
                    ></FormInput>

                    <Buttons type="submit">Login</Buttons>

                    <div className="socialSignin">
                        <div className="row">
                            <Buttons onClick={handleGoogleSignIn}>
                                Sign in with Google
                            </Buttons>
                        </div>
                    </div>

                    <div className="links">
                        <Link to="/recovery">Reset Password</Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default withRouter(SignIn);
