import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            setToken(response.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;