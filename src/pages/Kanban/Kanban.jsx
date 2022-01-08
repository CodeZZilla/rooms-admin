
import {useEffect, useState} from "react";
import UserService from "../../services/user.service";
import {BarWave} from "react-cssfx-loading";
import {Link, Redirect} from "react-router-dom";
import {PhotoURL} from "../../services/PhotoURL";

export default function Kanban() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [redirectLoginPage, setRedirectLoginPage] = useState(false);

    useEffect(() => {
        UserService.getUsers().then(response => {
            setUsers(response.data);
            setIsLoading(false);
        }).catch(err => {
            if (err.response.status === 401)
                setRedirectLoginPage(true);
        });
    }, []);

    if (redirectLoginPage)
        return <Redirect to="/login"/>


    return (
       isLoading ? <BarWave className="loaderBar"/> : <main className="content">
            <div className="container p-0">

                <h1 className="h3 mb-3">Канбан</h1>

                <div className="row">
                    <div className="card">
                        <div className="card-body">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home"
                                       role="tab" aria-controls="home" aria-selected="true">0-4 етапів</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile"
                                       role="tab" aria-controls="profile" aria-selected="false">4-7 етапів</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 col-xl-3">
                                            <div className="card card-border-primary">
                                                <div className="card-header">
                                                    <h5 className="card-title">0 Етап</h5>
                                                    <h6 className="card-subtitle text-muted">Етап при команді /start.</h6>
                                                </div>
                                                <div className="card-body p-3">

                                                    {
                                                        Array.from(users).filter(item => item.userStatus === 0).map((value) => {
                                                            return <div className="card mb-3 bg-light" key={value.id}>
                                                                <div className="card-body p-3">
                                                                    <div className="float-right mt-n1">
                                                                        <img
                                                                            src={PhotoURL + value.idTelegram}
                                                                            width="32" height="32"
                                                                            className="rounded-circle" alt="Avatar"/>
                                                                    </div>
                                                                    <p>{value.idTelegram}</p>
                                                                    <p>{value.nickname}</p>
                                                                    <p>{value.name} {value.lastName}</p>

                                                                    <Link
                                                                        className="btn btn-outline-primary btn-sm"
                                                                        to={"/viewUser/" + value.id}>Переглянути користувача</Link>
                                                                </div>
                                                            </div>
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-3">
                                            <div className="card card-border-primary">
                                                <div className="card-header">
                                                    <h5 className="card-title">1 Етап</h5>
                                                    <h6 className="card-subtitle text-muted">Етап початку.</h6>
                                                </div>
                                                <div className="card-body p-3">

                                                    {
                                                        Array.from(users).filter(item => item.userStatus === 1).map((value) => {
                                                            return <div className="card mb-3 bg-light" key={value.id}>
                                                                <div className="card-body p-3">
                                                                    <div className="float-right mt-n1">
                                                                        <img
                                                                            src={PhotoURL + value.idTelegram}
                                                                            width="32" height="32"
                                                                            className="rounded-circle" alt="Avatar"/>
                                                                    </div>
                                                                    <p>{value.idTelegram}</p>
                                                                    <p>{value.nickname}</p>
                                                                    <p>{value.name} {value.lastName}</p>
                                                                    <Link
                                                                        className="btn btn-outline-primary btn-sm"
                                                                        to={"/viewUser/" + value.id}>Переглянути користувача</Link>
                                                                </div>
                                                            </div>
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-3">
                                            <div className="card card-border-primary">
                                                <div className="card-header">
                                                    <h5 className="card-title">2 Етап</h5>
                                                    <h6 className="card-subtitle text-muted">Етап вибору міста.</h6>
                                                </div>
                                                <div className="card-body p-3">

                                                    {
                                                        Array.from(users).filter(item => item.userStatus === 2).map((value) => {
                                                            return <div className="card mb-3 bg-light" key={value.id}>
                                                                <div className="card-body p-3">
                                                                    <div className="float-right mt-n1">
                                                                        <img
                                                                            src={PhotoURL + value.idTelegram}
                                                                            width="32" height="32"
                                                                            className="rounded-circle" alt="Avatar"/>
                                                                    </div>
                                                                    <p>{value.idTelegram}</p>
                                                                    <p>{value.nickname}</p>
                                                                    <p>{value.name} {value.lastName}</p>
                                                                    <Link
                                                                        className="btn btn-outline-primary btn-sm"
                                                                        to={"/viewUser/" + value.id}>Переглянути користувача</Link>
                                                                </div>
                                                            </div>
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-3">
                                            <div className="card card-border-primary">
                                                <div className="card-header">
                                                    <h5 className="card-title">3 Етап</h5>
                                                    <h6 className="card-subtitle text-muted">Етап вибору житла.</h6>
                                                </div>
                                                <div className="card-body p-3">

                                                    {
                                                        Array.from(users).filter(item => item.userStatus === 3).map((value) => {
                                                            return <div className="card mb-3 bg-light" key={value.id}>
                                                                <div className="card-body p-3">
                                                                    <div className="float-right mt-n1">
                                                                        <img
                                                                            src={PhotoURL + value.idTelegram}
                                                                            width="32" height="32"
                                                                            className="rounded-circle" alt="Avatar"/>
                                                                    </div>
                                                                    <p>{value.idTelegram}</p>
                                                                    <p>{value.nickname}</p>
                                                                    <p>{value.name} {value.lastName}</p>
                                                                    <Link
                                                                        className="btn btn-outline-primary btn-sm"
                                                                        to={"/viewUser/" + value.id}>Переглянути користувача</Link>
                                                                </div>
                                                            </div>
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel"
                                     aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 col-xl-3">
                                            <div className="card card-border-primary">
                                                <div className="card-header">
                                                    <h5 className="card-title">4 Етап</h5>
                                                    <h6 className="card-subtitle text-muted">Етап вибору типа житла.</h6>
                                                </div>
                                                <div className="card-body p-3">

                                                    <div className="card mb-3 bg-light">
                                                        <div className="card-body p-3">
                                                            {
                                                                Array.from(users).filter(item => item.userStatus === 4).map((value) => {
                                                                    return <div className="card mb-3 bg-light" key={value.id}>
                                                                        <div className="card-body p-3">
                                                                            <div className="float-right mt-n1">
                                                                                <img
                                                                                    src={PhotoURL + value.idTelegram}
                                                                                    width="32" height="32"
                                                                                    className="rounded-circle" alt="Avatar"/>
                                                                            </div>
                                                                            <p>{value.idTelegram}</p>
                                                                            <p>{value.nickname}</p>
                                                                            <p>{value.name} {value.lastName}</p>
                                                                            <Link
                                                                                className="btn btn-outline-primary btn-sm"
                                                                                to={"/viewUser/" + value.id}>Переглянути користувача</Link>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-3">
                                            <div className="card card-border-primary">
                                                <div className="card-header">
                                                    <h5 className="card-title">5 Етап</h5>
                                                    <h6 className="card-subtitle text-muted">Етап вибору ціни.</h6>
                                                </div>
                                                <div className="card-body p-3">
                                                    <div className="card mb-3 bg-light">
                                                        <div className="card-body p-3">
                                                            {
                                                                Array.from(users).filter(item => item.userStatus === 5).map((value) => {
                                                                    return <div className="card mb-3 bg-light" key={value.id}>
                                                                        <div className="card-body p-3">
                                                                            <div className="float-right mt-n1">
                                                                                <img
                                                                                    src={PhotoURL + value.idTelegram}
                                                                                    width="32" height="32"
                                                                                    className="rounded-circle" alt="Avatar"/>
                                                                            </div>
                                                                            <p>{value.idTelegram}</p>
                                                                            <p>{value.nickname}</p>
                                                                            <p>{value.name} {value.lastName}</p>
                                                                            <Link
                                                                                className="btn btn-outline-primary btn-sm"
                                                                                to={"/viewUser/" + value.id}>Переглянути користувача</Link>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-3">
                                            <div className="card card-border-primary">
                                                <div className="card-header">
                                                    <h5 className="card-title">6 Етап</h5>
                                                    <h6 className="card-subtitle text-muted">Етап вибору регіона.</h6>
                                                </div>
                                                <div className="card-body p-3">

                                                    {
                                                        Array.from(users).filter(item => item.userStatus === 6).map((value) => {
                                                            return <div className="card mb-3 bg-light" key={value.id}>
                                                                <div className="card-body p-3">
                                                                    <div className="float-right mt-n1">
                                                                        <img
                                                                            src={PhotoURL + value.idTelegram}
                                                                            width="32" height="32"
                                                                            className="rounded-circle" alt="Avatar"/>
                                                                    </div>
                                                                    <p>{value.idTelegram}</p>
                                                                    <p>{value.nickname}</p>
                                                                    <p>{value.name} {value.lastName}</p>
                                                                    <Link
                                                                        className="btn btn-outline-primary btn-sm"
                                                                        to={"/viewUser/" + value.id}>Переглянути користувача</Link>
                                                                </div>
                                                            </div>
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-3">
                                            <div className="card card-border-primary">
                                                <div className="card-header">
                                                    <h5 className="card-title">7 Етап</h5>
                                                    <h6 className="card-subtitle text-muted">Етап вибору станції метро.</h6>
                                                </div>
                                                <div className="card-body p-3">

                                                    <div className="card mb-3 bg-light">
                                                        <div className="card-body p-3">
                                                            {
                                                                Array.from(users).filter(item => item.userStatus === 7).map((value) => {
                                                                    return <div className="card mb-3 bg-light" key={value.id}>
                                                                        <div className="card-body p-3">
                                                                            <div className="float-right mt-n1">
                                                                                <img
                                                                                    src={PhotoURL + value.idTelegram}
                                                                                    width="32" height="32"
                                                                                    className="rounded-circle" alt="Avatar"/>
                                                                            </div>
                                                                            <p>{value.idTelegram}</p>
                                                                            <p>{value.nickname}</p>
                                                                            <p>{value.name} {value.lastName}</p>
                                                                            <Link
                                                                                className="btn btn-outline-primary btn-sm"
                                                                                to={"/viewUser/" + value.id}>Переглянути користувача</Link>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </main>
    )
}