import React from "react";
import { useForm } from "react-hook-form";
import './login.css'
const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Submitted:", data);
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Registration Form</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    {/* Username Field */}
                    <div className="form-field">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            {...register("username", { required: "Username is required" })}
                            className={`form-input ${errors.username ? "error" : ""}`}
                        />
                        {errors.username && (
                            <p className="form-error">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="form-field">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format",
                                },
                            })}
                            className={`form-input ${errors.email ? "error" : ""}`}
                        />
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="form-field">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className={`form-input ${errors.password ? "error" : ""}`}
                        />
                        {errors.password && (
                            <p className="form-error">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
