import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import logo from "../bg/ROOMSCUTLOGO.png";
import AuthService from "../services/auth.service";
import Redirect from "react-router-dom/es/Redirect";
import r from "../bg/ROOMS EN Logo_Small Logo White.png";
import './header.css';

const Header = (props) => {

    const [active, setActive] = useState('/');
    const location = useLocation();

    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    const [redirect, setRedirect] = useState(false);

    const clickHandler = () => {
        document.getElementById('sidebar').classList.toggle('active')
    }

    const logoutHandler = () => {
        AuthService.logout();
        setRedirect(true);
    }

    

    if (redirect) {
        return <Redirect to="/login"/>
    }

    return (
        <div id="app">
            <div id="sidebar" className="active">
                <div className="sidebar-wrapper active">
                    <div className="sidebar-header">
                        <div className="d-flex justify-content-between">
                            <div className="logo">
                                <Link to="/">
                                    <img className="logo-rooms" src={logo} alt="Logo" srcSet=""/>
                                </Link>
                            </div>
                            <div className="toggler">
                                <a href="#" className="sidebar-hide d-xl-none d-block" onClick={clickHandler}><i
                                    className="bi bi-x bi-middle"/></a>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <ul className="menu">
                            <li className="sidebar-title">Керування ботом</li>
                            <li className={'sidebar-item ' + (active === '/' ? 'active' : null)}>
                                <Link className='sidebar-link' to="/">
                                    <i className="bi bi-grid-fill"/>
                                    <span>Головна</span>
                                </Link>

                            </li>

                            <li className={'sidebar-item ' + (active === '/users' ? 'active': null)}>
                                <Link to="/users" className='sidebar-link'>
                                    <i className="bi bi-file-earmark-spreadsheet-fill"/>
                                    <span>Користувачі</span>
                                </Link>
                            </li>

                            <li className={'sidebar-item ' + (active === '/groups' || active === '/groups/add' || active === `/groupsView/${location.pathname.slice(12)}`
                                ? 'active' : null)}>
                                <Link to="/groups" className='sidebar-link'>
                                    <i className="bi bi-people-fill"/>
                                    <span>Групи</span>
                                </Link>
                            </li>

                            {/*<li className="sidebar-item" onClick={currentRoute}>*/}
                            {/*    <Link to="/chat" className='sidebar-link'>*/}
                            {/*        <i className="bi bi-people-fill"/>*/}
                            {/*        <span>Чат</span>*/}
                            {/*    </Link>*/}
                            {/*</li>*/}

                            <li className={'sidebar-item ' + (active === '/kanban' || active === `/viewUser/${location.pathname.slice(10)}` ? 'active' : null)}>
                                <Link to="/kanban" className='sidebar-link'>
                                    <i className="bi bi-calendar"/>
                                    <span>Канбан</span>
                                </Link>
                            </li>

                            <li className="sidebar-title">Керування сайтом</li>
                            <li className={'sidebar-item ' + (active === '/news' ? 'active' : null)}>
                                <Link to="/news" className='sidebar-link'>
                                    <i className="bi bi-newspaper"/>
                                    <span>Новини</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <button className="sidebar-toggler btn x"><i data-feather="x"/></button>
                </div>
            </div>
            <div id="main" className='layout-navbar'>
                <header className='mb-3'>
                    <nav className="navbar navbar-expand navbar-light">
                        <div className="container-fluid">
                            <a href="#" className="burger-btn d-block" onClick={clickHandler}>
                                <i className="bi bi-justify fs-3"/>
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <div className="dropdown navbar-nav ms-auto mb-2 mb-lg-0">
                                    <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="user-menu d-flex">
                                            <div className="user-name text-end me-3">
                                                <h6 className="mb-0 text-gray-600">ROOMS</h6>
                                                <p className="mb-0 text-sm text-gray-600">Адміністратор</p>
                                            </div>
                                            <div className="user-img d-flex align-items-center">
                                                <div className="avatar avatar-md">
                                                    <img src={r} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                        <li>
                                            <h6 className="dropdown-header">Hello, Rooms!</h6>
                                        </li>
                                        {/*<li><a className="dropdown-item" href="#"><i*/}
                                        {/*    className="icon-mid bi bi-person me-2"/> My*/}
                                        {/*    Profile</a></li>*/}
                                        {/*<li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-gear me-2"/>*/}
                                        {/*    Settings</a></li>*/}
                                        {/*<li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-wallet me-2"/>*/}
                                        {/*    Wallet</a></li>*/}
                                        {/*<li>*/}
                                        {/*    <hr className="dropdown-divider"/>*/}
                                        {/*</li>*/}
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <li><a className="dropdown-item" href="#" onClick={logoutHandler}><i
                                            className="icon-mid bi bi-box-arrow-left me-2"/> Вийти з аккаунту</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <div id="main-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Header;