"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import "./reset.css"; // 👈 CSS file import
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


export default function ResetPasswordTokenPage() {
    const { token } = useParams();   // URL से token मिलेगा
    const [resetLoading, setResetLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setResetLoading(false);

        axios.post('http://localhost:8001/api/website/users/reset-password', event.target, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((result) => {
                if (result.data._status == true) {
                    toast.success(result.data._message)
                    setResetLoading(false);
                    Cookies.set("resetTokenUsed", "true", { path: "/reset-password", expires: 1 }); // 1 day

                    router.push('/')
                } else {
                    toast.error(result.data._message);
                    setResetLoading(false);
                }
            })
            .catch(() => {
                toast.error('Something went wrong !');
            })



    };

    return (
        <div className="reset-container">
            <div className="reset-card">
                <h1 className="reset-title">🔒 Reset Your Password</h1>

                <form onSubmit={handleSubmit} className="reset-form">
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            name="new_password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            name="confirm_password"
                            required
                        />
                    </div>

                    <button type="submit" className="reset-btn">
                        {resetLoading ? "Loading..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
