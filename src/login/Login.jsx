
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "../component/Input";
import EmailInput from "../component/Email";
import PasswordInput from "../component/PasswordInput";
import '../css/Login.css';

const RegisterForm = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const url = isRegister
                ? "http://localhost:5000/register"
                : "http://localhost:5000/login";

            const response = await axios.post(url, data);
            console.log("Response:", response.data);
            setLoading(false);

            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                alert("Success! Token: " + response.data.access_token);
            } else {
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            setLoading(false);
            alert("An error occurred, please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>{isRegister ? "Registration" : "Login"} Form</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    {isRegister && <Input />}
                    <EmailInput register={register} errors={errors} />
                    <PasswordInput register={register} errors={errors} />
                    <button type="submit" className="submit-btn">
                        {isRegister ? "Register" : "Login"}
                    </button>
                    <p className="toggle-text">
                        {isRegister ? "Already have an account? " : "New to our website? "}
                        <span onClick={() => setIsRegister(!isRegister)} className="pointer-cursor">
                            {isRegister ? "Switch to Login" : "Switch to Register"}
                        </span>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
