import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../features/user/sessionsSlice';
import '../stylesheets/login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.sessions);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      user: {
        email,
        password,
      },
    };
    dispatch(login(user)).then(({ payload }) => {
      if (!localStorage.getItem('token')) return;
      navigate('/');
    });
  };

  return (
    <div id="login-ctr">
      {error ? <span>{error}</span> : null}
      {loading ? <span>Loading...</span> : null}
      <h3 id="login-title">Login</h3>
      <form id="login-form" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>You don&apos;t have an account yet?</p>
      <NavLink to="/signup">Create new account</NavLink>
    </div>
  );
};

export default Login;
