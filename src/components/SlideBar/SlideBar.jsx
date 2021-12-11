import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function SlideBar() {

    const clickHandler = () => {
        document.getElementById('sidebar').classList.toggle('active')
    }

    useEffect(() => {
        currentRoute();
    }, [])


    const currentRoute = () => {
        const sidebar = document.getElementsByClassName('sidebar-item');
        if (window.location.pathname === '/') {
            sidebar[0].classList.add('active');
            sidebar[1].classList.remove('active');
            sidebar[2].classList.remove('active');
            sidebar[3].classList.remove('active');
            sidebar[4].classList.remove('active');
        } else if (window.location.pathname === '/users') {
            sidebar[1].classList.add('active');
            sidebar[0].classList.remove('active');
            sidebar[2].classList.remove('active');
            sidebar[3].classList.remove('active');
            sidebar[4].classList.remove('active');
        } else if (window.location.pathname === '/groups') {
            sidebar[2].classList.add('active');
            sidebar[0].classList.remove('active');
            sidebar[1].classList.remove('active');
            sidebar[3].classList.remove('active');
            sidebar[4].classList.remove('active');
        } else if (window.location.pathname === '/kanban') {
            sidebar[3].classList.add('active');
            sidebar[0].classList.remove('active');
            sidebar[1].classList.remove('active');
            sidebar[2].classList.remove('active');
            sidebar[4].classList.remove('active');
        } else if (window.location.pathname === '/news') {
            sidebar[4].classList.add('active');
            sidebar[3].classList.remove('active');
            sidebar[2].classList.remove('active');
            sidebar[1].classList.remove('active');
            sidebar[0].classList.remove("active");
        }
    }

    return (
        <div id="sidebar" className="active">
            <div className="sidebar-wrapper active">
                <div className="sidebar-header">
                    <div className="d-flex justify-content-between">
                        <div className="logo">
                            <Link to="/">
                                <img src="assets/images/logo/logo.png" alt="Logo" srcSet=""/>
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
                        <li className='sidebar-item' onClick={currentRoute}>
                            <Link className='sidebar-link' to="/">
                                <i className="bi bi-grid-fill"/>
                                <span>Головна</span>
                            </Link>

                        </li>

                        <li className="sidebar-item" onClick={currentRoute}>
                            <Link to="/users" className='sidebar-link'>
                                <i className="bi bi-file-earmark-spreadsheet-fill"/>
                                <span>Користувачі</span>
                            </Link>
                        </li>

                        <li className="sidebar-item" onClick={currentRoute}>
                            <Link to="/groups" className='sidebar-link'>
                                <i className="bi bi-people-fill"/>
                                <span>Групи</span>
                            </Link>
                        </li>

                        <li className="sidebar-item" onClick={currentRoute}>
                            <Link to="/kanban" className='sidebar-link'>
                                <i className="bi bi-calendar"/>
                                <span>Канбан</span>
                            </Link>
                        </li>

                        <li className="sidebar-title">Керування сайтом</li>
                        <li className="sidebar-item" onClick={currentRoute}>
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