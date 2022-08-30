import React, { useState } from "react";
import './Signup.css';

function SignupForm() {
    return (
        <form>
            <div className="form-inner">
                <h1>Sign up</h1>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm password:</label>
                    <input type="password" name="confirm-password" id="confirm-password"/>
                </div>
                <input type="submit" value="Signup"/>
            </div>
        </form>
    )
}

export default SignupForm