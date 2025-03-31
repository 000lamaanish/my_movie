import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "../component/Input"; // Reusable Input Component

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
                localStorage.setItem("token", response.data.access_token);
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-600">
                    {isRegister ? "Register" : "Login"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    {/* Show "Name" field only in Registration */}
                    {isRegister && (
                        <Input
                            label="Name"
                            type="text"
                            register={register}
                            validation={{ required: "Name is required" }}
                            error={errors.name}
                        />
                    )}

                    {/* Email Input */}
                    <Input
                        label="Email"
                        type="email"
                        register={register}
                        validation={{
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format",
                            },
                        }}
                        error={errors.email}
                    />

                    {/* Password Input */}
                    <Input
                        label="Password"
                        type="password"
                        register={register}
                        validation={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        }}
                        error={errors.password}
                    />

                    <button
                        type="submit"
                        className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                    >
                        {loading ? "Processing..." : isRegister ? "Register" : "Login"}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        {isRegister ? "Already have an account? " : "New to our website? "}
                        <span
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-green-500 font-semibold cursor-pointer hover:underline"
                        >
                            {isRegister ? "Switch to Login" : "Switch to Register"}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
