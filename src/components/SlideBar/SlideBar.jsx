import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import logo from '../../bg/ROOMSCUTLOGO.png';
import './sideBar.css';

export default function SlideBar() {

    const clickHandler = () => {
        document.getElementById('sidebar').classList.toggle('active')
    }

    const [active, setActive] = useState('/');
    const location = useLocation();

    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    return (
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
    )
}