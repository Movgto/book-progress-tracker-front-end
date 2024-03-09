import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Header';
import { getCurrentUser } from '../features/user/userSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUser()).then(({ payload }) => {
      console.log(payload);
      if (payload == 'Request failed with status code 401') {
        navigate('/login');
      }
    });
  }, []);

  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default Layout;
