import './viewUser.css';
import {Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import UserService from "../../services/user.service";
import {BarWave} from "react-cssfx-loading";
import { PhotoURL} from "../../services/PhotoURL";
import notFound from '../../bg/notFound.jpeg';

export default function ViewUser() {

    const params = useParams();
    const idUser = params.id;

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [redirectLoginPage, setRedirectLoginPage] = useState(false);
    const [photo, setPhoto] = useState("");

    const date = new Date(user.creationDate);
    const dateString = ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " "
    + date.getHours() + ":" + date.getMinutes();



    useEffect(() => {
        UserService.getUserById(idUser).then(responseUser => {
            setUser(responseUser.data);
            fetch(PhotoURL + responseUser.data.idTelegram).then(res => res.text()).then(data => {
                if (data === "notFoundImage") {
                    setPhoto(notFound);
                } else
                    setPhoto(PhotoURL + responseUser.data.idTelegram);

                setIsLoading(false);
            });

        }).catch(err => {
            if (err.response.status === 401)
                setRedirectLoginPage(true);
        });



    }, [idUser]);


    if (redirectLoginPage)
        return <Redirect to="/login"/>

    return (
       isLoading ? <BarWave className="loaderBar"/> : <div className="container bootdey flex-grow-1 container-p-y">

            <div className="media align-items-center py-3 mb-3">
                {/*<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""*/}
                {/*     className="d-block ui-w-100 rounded-circle"/>*/}
                <img src={photo} alt=""
                     className="d-block ui-w-100 rounded-circle"/>
                <div className="media-body ml-4">
                    <h4 className="font-weight-bold mb-0">{user.name} {user.lastName} <span
                        className="text-muted font-weight-normal">@{user.nickname}</span></h4>
                    <div className="text-muted mb-2">ID TELEGRAM: {user.idTelegram}</div>
                </div>
            </div>

            <div className="card mb-4">
                <div className="row no-gutters row-bordered">
                    <div className="d-flex col-md align-items-center">
                        <a href="javascript:void(0)" className="card-body d-block text-body">
                            <div className="text-muted small line-height-1">К-сть отриманих оголошень</div>
                            <div className="text-xlarge">{user.todayCompilation === undefined ? 0 : user.todayCompilation.length}</div>
                        </a>
                    </div>
                    <div className="d-flex col-md align-items-center">
                        <a href="javascript:void(0)" className="card-body d-block text-body">
                            <div className="text-muted small line-height-1">Днів до кінця підписки</div>
                            <div className="text-xlarge">{user.daysOfSubscription}</div>
                        </a>
                    </div>
                    <div className="d-flex col-md align-items-center">
                        <a href="javascript:void(0)" className="card-body d-block text-body">
                            <div className="text-muted small line-height-1">Безкоштовний пошук</div>
                            <div className="text-xlarge">{user.freeCounterSearch}</div>
                        </a>
                    </div>
                </div>
                <hr className="border-light m-0"/>
                <div className="card-body">
                    <table className="table user-view-table m-0">
                        <tbody>
                        <tr>
                            <td>Регестрація:</td>
                            <td>{dateString}</td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <td>Latest activity:</td>*/}
                        {/*    <td>01/23/2018 (14 days ago)</td>*/}
                        {/*</tr>*/}
                        <tr>
                            <td>Етап:</td>
                            <td>{user.userStatus}</td>
                        </tr>
                        <tr>
                            <td>Мова:</td>
                            <td>{user.language}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <hr className="border-light m-0"/>
                <div className="table-responsive">
                    <table className="table card-table m-0">
                        <tbody>
                        <tr>
                            <th>Параметри</th>
                            <th>Значення</th>
                        </tr>
                        <tr>
                            <td>Тип</td>
                            <td>{user.type}</td>
                        </tr>
                        <tr>
                            <td>Місто</td>
                            <td>{user.city}</td>
                        </tr>
                        <tr>
                            <td>К-сть кімнат</td>
                            <td>{user.rooms === undefined || user.rooms === null ? '' : user.rooms.map(value => `[${value}]`)}</td>
                        </tr>
                        <tr>
                            <td>Діапазон цін</td>
                            <td>{user.priceMin}-{user.priceMax}</td>
                        </tr>
                        <tr>
                            <td>Регіони</td>
                            <td>{user.region === undefined || user.region === null ? '' : user.region.map(value => `[${value}] `)}</td>
                        </tr>
                        <tr>
                            <td>Метро</td>
                            <td>{user.metroNames === undefined || user.metroNames === null ? '' : user.metroNames.map(value => `[${value}] `)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/*<div className="card">*/}

            {/*    <div className="card-body">*/}

            {/*        <table className="table user-view-table m-0">*/}
            {/*            <tbody>*/}
            {/*            <tr>*/}
            {/*                <td>Username:</td>*/}
            {/*                <td>nmaxwell</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>Name:</td>*/}
            {/*                <td>Nelle Maxwell</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>E-mail:</td>*/}
            {/*                <td>nmaxwell@mail.com</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>Company:</td>*/}
            {/*                <td>Company Ltd.</td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*        </table>*/}

            {/*        <h6 className="mt-4 mb-3">Social links</h6>*/}

            {/*        <table className="table user-view-table m-0">*/}
            {/*            <tbody>*/}
            {/*            <tr>*/}
            {/*                <td>Twitter:</td>*/}
            {/*                <td><a href="javascript:void(0)">https://twitter.com/user</a></td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>Facebook:</td>*/}
            {/*                <td><a href="javascript:void(0)">https://www.facebook.com/user</a></td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>Instagram:</td>*/}
            {/*                <td><a href="javascript:void(0)">https://www.instagram.com/user</a></td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*        </table>*/}

            {/*        <h6 className="mt-4 mb-3">Personal info</h6>*/}

            {/*        <table className="table user-view-table m-0">*/}
            {/*            <tbody>*/}
            {/*            <tr>*/}
            {/*                <td>Birthday:</td>*/}
            {/*                <td>May 3, 1995</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>Country:</td>*/}
            {/*                <td>Canada</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>Languages:</td>*/}
            {/*                <td>English</td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*        </table>*/}

            {/*        <h6 className="mt-4 mb-3">Contacts</h6>*/}

            {/*        <table className="table user-view-table m-0">*/}
            {/*            <tbody>*/}
            {/*            <tr>*/}
            {/*                <td>Phone:</td>*/}
            {/*                <td>+0 (123) 456 7891</td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*        </table>*/}

            {/*        <h6 className="mt-4 mb-3">Interests</h6>*/}

            {/*        <table className="table user-view-table m-0">*/}
            {/*            <tbody>*/}
            {/*            <tr>*/}
            {/*                <td>Favorite music:</td>*/}
            {/*                <td>*/}
            {/*                    Rock,*/}
            {/*                    Alternative,*/}
            {/*                    Electro,*/}
            {/*                    Drum &amp; Bass,*/}
            {/*                    Dance*/}
            {/*                </td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>Favorite movies:</td>*/}
            {/*                <td>*/}
            {/*                    The Green Mile,*/}
            {/*                    Pulp Fiction,*/}
            {/*                    Back to the Future,*/}
            {/*                    WALL·E,*/}
            {/*                    Django Unchained,*/}
            {/*                    The Truman Show,*/}
            {/*                    Home Alone,*/}
            {/*                    Seven Pounds*/}
            {/*                </td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*        </table>*/}

            {/*    </div>*/}
            {/*</div>*/}

        </div>
    )
}