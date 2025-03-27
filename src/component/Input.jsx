import React from 'react'

const Input = () => {
    return (
        <div>
            <div>
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
            </div>



        </div>
    )
}

export default Input
