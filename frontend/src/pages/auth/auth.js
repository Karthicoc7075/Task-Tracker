import React, { useState } from 'react';
import './auth.css';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../actions/auth'; // Adjust the import path as necessary
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
    Country: '',
  });
  const dispatch = useDispatch();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ Name: '', Email: '', Password: '' });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const formDatas = {
        Email: formData.Email.toLowerCase(),
        Password: formData.Password,
      };
      dispatch(login(formDatas));
    } else {
      const formDatas = {
        Name: formData.Name,
        Email: formData.Email.toLowerCase(),
        Password: formData.Password,
        Country: formData.Country,
      };
      dispatch(signup(formDatas));
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

        {!isLogin && (
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="Name"
              placeholder="Full Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>


        )}

        <div className="input-group">
          <label>Email</label>
          <input
            type="Email"
            name="Email"
            placeholder="Email Address"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="Password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>

        {
          !isLogin && (
            <div className="input-group">
              <label>Country</label>
              <input
                type="text"
                name="Country"
                placeholder="Country"
                value={formData.Country}
                onChange={handleChange}
                required
              />
            </div>
          )
        }



        <button type="submit" className="auth-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={toggleMode} className="toggle-link">
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default AuthPage;
