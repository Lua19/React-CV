import React, { useState } from 'react';
import { apiClient } from './services/apiService';

interface LoginProps {
  onClose: () => void;
}

function Login({ onClose }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await apiClient.loginAuth(email, password) as any;
      sessionStorage.setItem('token', data.token);
      onClose();
    } catch (error) {
      console.error("Login attempt failed:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <section className="section login-section" id="login">
          <h2>Login</h2>
          <div className="login-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;