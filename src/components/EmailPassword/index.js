import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetAllAuthForms } from "../redux/User/user.actions";
// import { useNavigate } from "react-router-dom";
import "./styles.scss";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";

import { withRouter } from "../withRouter/";

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError,
});

const EmailPassword = (props) => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetAllAuthForms());
            props.navigate("/login");
        }
    }, [resetPasswordSuccess]);

    // const handleSubmit = e => {
    //     e.preventDefault();

    //     try {
    //         const config = {
    //             url: "http://localhost:3000/login",
    //         };

    //         await auth

    //             .sendPasswordResetEmail(email, config)
    //             .then(() => {
    //                 props.navigate("/login");
    //                 // const navigate = useNavigate();
    //                 // console.log(navigate);

    //                 // navigate(-1);
    //             })
    //             .catch(() => {
    //                 const err = ["Email not found. Please try again"];
    //                 setErrors([err]);
    //             });
    //     } catch (err) {
    //         // console.log(err)
    //     }
    // };

    useEffect(() => {
        if (
            Array.isArray(resetPasswordError) &&
            resetPasswordError.length > 0
        ) {
            setErrors(resetPasswordError);
        }
    }, [resetPasswordError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ email }));
    };

    const configAuthWrapper = {
        headline: "Email Password",
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((e, index) => {
                            return <li key={index}>{e}</li>;
                        })}
                    </ul>
                )}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                    ></FormInput>

                    <Button type="submit">Email Password</Button>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default withRouter(EmailPassword);
