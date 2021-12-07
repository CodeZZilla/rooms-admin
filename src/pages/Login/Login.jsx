import './login.css'
import {useState} from "react";
import AuthService from "../../services/auth.service";


export default function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // const [redirect, setRedirect] = useState(null);


    function onChangeUsername(e) {
        setUsername(e.target.value.trim());
    }

    function onChangePassword(e) {
        setPassword(e.target.value.trim());
    }

    function submit(e) {
        e.preventDefault();

        AuthService.login(username, password).then(() => {
            props.history.push('/');
        }, () => {
            setMessage('Невірні дані для входу у систему');
        });

    }


    return (
        <div id="auth">
            <div className="row h-100">
                <div className="col-lg-5 col-12">
                    <div id="auth-left">
                        <div className="auth-logo">
                            <img src="assets/images/logo/logo.png" alt="Logo" />
                        </div>
                        <h1 className="auth-title">Система керуванням Rooms Bot.</h1>
                        <p className="auth-subtitle mb-5">Увійдіть у свій обліковий запис.</p>
                        {message && (<div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>)}
                        <form onSubmit={submit}>
                            <div className="form-group position-relative has-icon-left mb-4">
                                <input type="text" className="form-control form-control-xl" placeholder="Логін"
                                       onChange={onChangeUsername} value={username}/>
                                <div className="form-control-icon">
                                    <i className="bi bi-person"/>
                                </div>
                            </div>
                            <div className="form-group position-relative has-icon-left mb-4">
                                <input type="password" className="form-control form-control-xl" placeholder="Пароль"
                                       onChange={onChangePassword} value={password}/>
                                <div className="form-control-icon">
                                    <i className="bi bi-shield-lock"/>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5">Увійти</button>
                        </form>

                    </div>
                </div>
                <div className="col-lg-7 d-none d-lg-block">
                    <div id="auth-right">

                    </div>
                </div>
            </div>
        </div>
    )
}