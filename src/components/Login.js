import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import JwtToken from "./JwtToken";

const Login = () => {
    const [authType, setAuthType] = useState("basic");

    const [form, setForm] = useState({
        username: "",
        password: "",
        jwt: ""
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const API_URL = '/data/myjwt';

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const clearMessages = () => {
        setError("");
        setResponse("");
    };

    const handleBasicLogin = async () => {
        try {
            setLoading(true);
            const token = btoa(`${form.username}:${form.password}`);

            const res = await axios.get(API_URL, {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });

            localStorage.setItem("jwt", res.data);
            setLoading(false);
            setResponse(res.data);

        } catch {
            setError("Invalid username or password");
            setLoading(false);
        }
    };

    const handleJwtLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${form.jwt}`
                }
            });

            localStorage.setItem("jwt", form.jwt);
            setLoading(false);
            setResponse(res.data);

            setTimeout(() => {
                navigate("/");
            }, 1000);
            navigate("/")
        } catch {
            setError("Invalid JWT token");
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${credentialResponse.credential}`
                }
            });

            localStorage.setItem("oauth", credentialResponse.credential);
            setLoading(false);
            setResponse(res.data);

            setTimeout(() => {
                navigate("/");
            }, 1000);
            await navigate("/")
        } catch {
            setError("Google authentication failed");
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearMessages();

        if (authType === "basic") handleBasicLogin();
        if (authType === "jwt") handleJwtLogin();
    };


    return (
        <div className="container">
            <div className="card">

                <h2 className="title">🔐 Multi Auth Login</h2>

                <div className="tabs">
                    {["basic", "jwt", "oauth"].map((type) => (
                        <button
                            key={type}
                            className={authType === type ? "active" : ""}
                            disabled={type === "oauth"}
                            onClick={() => {
                                setAuthType(type);
                                clearMessages();
                            }}
                        >
                            {type.toUpperCase()}
                        </button>
                    ))}
                </div>

                {error && <div className="error">❌ {error}</div>}


                {loading ? (
                    <div className="loading">⏳ Authenticating...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                    {authType === "basic" && (
                        <>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            <button className="btn btn-basic" disabled={loading}>
                                {loading ? "Please wait..." : "Login with Basic"}
                            </button>
                        </>
                    )}


                    {authType === "jwt" && (
                        <>
                            <input
                                type="text"
                                name="jwt"
                                placeholder="Enter JWT Token"
                                onChange={handleChange}
                                required
                            />
                            <button className="btn btn-jwt">
                                Login with JWT
                            </button>
                        </>
                    )}
                    {authType === "oauth" && (
                        <div style={{ marginTop: "10px" }}>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => setError("OAuth failed")}
                            />
                        </div>
                    )}

                </form>
                )}
                <div style={{
                    paddingTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                {response && (
                    <JwtToken />
                )}
                </div>
                {response && (<h2>Copy & Login in JWT Tab</h2>)}

            </div>
        </div>
    );
};

export default Login;