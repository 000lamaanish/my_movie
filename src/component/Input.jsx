import React from "react";

const Input = ({ label, type, register, validation, error }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium">{label}</label>
            <input
                type={type}
                {...register(label.toLowerCase(), validation)}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 
                    ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"}
                `}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default Input;
