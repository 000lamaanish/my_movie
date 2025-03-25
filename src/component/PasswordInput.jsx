import React from "react";

const PasswordInput = ({ register, errors }) => {
    return (
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
            {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
    );
};

export default PasswordInput;
