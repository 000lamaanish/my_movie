import React from "react";

const EmailInput = ({ register, errors }) => {
    return (
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
    );
};

export default EmailInput;
