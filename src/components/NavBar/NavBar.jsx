import AuthService from "../../services/auth.service";
import Redirect from "react-router-dom/es/Redirect";
import {useState} from "react";
import r from '../../bg/1.jpg';

export default function NavBar() {

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
                                            <img src={r}/>
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
    )
}