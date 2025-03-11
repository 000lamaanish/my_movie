import React, { useState } from 'react';
import '../css/login.css'; // Make sure the CSS file is correctly linked

const Login = () => {
    const [formType, setFormType] = useState("Sign In");

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>{formType}</h1>
                <form className="login-form">
                    {formType === "Sign Up" && (
                        <input type="text" placeholder="Your Name" className="input-field" />
                    )}
                    <input type="email" placeholder="Email" className="input-field" />
                    <input type="password" placeholder="Password" className="input-field" />

                    <button type="submit" className="submit-btn">{formType}</button>

                    <div className="extra-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember Me
                        </label>
                        <p className="help-text">Need help?</p>
                    </div>

                    <p className="toggle-text">
                        {formType === "Sign In"
                            ? "New to our website? "
                            : "Already have an account? "}
                        <span onClick={() => setFormType(formType === "Sign In" ? "Sign Up" : "Sign In")}>
                            {formType === "Sign In" ? "Sign Up" : "Sign In"}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
