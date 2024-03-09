import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signup } from '../features/user/signupSlice';
import '../stylesheets/signup.scss';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector((state) => state.signup);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      user: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    };
    dispatch(signup(payload));
  };

  return (
    <div id="signup-ctr">
      {success.length > 0 ? <span>{success}</span> : null}
      {error.length > 0 ? <span>{error}</span> : null}
      {loading ? <span>Loading...</span> : null}
      <h3 id="signup-title">Signup</h3>
      <form id="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => { setName(e.target.value); }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
          required
        />
        <input
          type="password"
          placeholder="Password confirmation"
          value={passwordConfirmation}
          onChange={(e) => { setPasswordConfirmation(e.target.value); }}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p>You already have an account?</p>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};

export default Signup;
