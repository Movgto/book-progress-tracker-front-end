import { NavLink, useNavigate } from 'react-router-dom';
import '../stylesheets/header.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user/sessionsSlice';

const SideBar = ({ sidebar }) => {
  const dispath = useDispatch();

  const handleLogout = () => {
    dispath(logout());
  };

  return (
    <div className={`sidebar${sidebar ? ' collapse' : ''}`}>
      <a href="" onClick={handleLogout}>Logout</a>
    </div>
  );
};

const Header = () => {
  const [sidebar, setSideBar] = useState(false);

  function sideBarToggle() {
    setSideBar(!sidebar);
  }

  function sideBarClose() {
    setSideBar(false);
  }
  return (
    <header>
      <div id="header-ctr">
        <h1 className="Bookstore-CMS">Bookstore CMS</h1>
        <nav>
          <ul>
            <li><NavLink className="BOOKS" to="/">BOOKS</NavLink></li>
            <li><NavLink className="CATEGORIES" to="/categories">CATEGORIES</NavLink></li>
          </ul>
        </nav>
        <div className="Oval" onClick={sideBarToggle} onBlur={sideBarClose}>
          <div className="Mask" />
          <div id="body" />
          <SideBar sidebar={sidebar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
