import './groups.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {BarWave} from "react-cssfx-loading";
import GroupService from "../../services/group.service";

export default function Groups() {

    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GroupService.getGroups().then(response => {
            setGroups(response.data)
            setIsLoading(false)
        });

    }, [])

    return (
       isLoading ? <BarWave className="loaderBar"/> : <div className="container">
            <div className="row">
                <div className="col-lg-3 col-sm-6">
                    <div className="card-box bg-orange">
                        <div className="inner">
                            <h3>Всього груп: {groups.length}</h3>
                            <p>Створити нову групу</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-user-plus" aria-hidden="true"/>
                        </div>
                        <Link to="/groups/add" className="card-box-footer">Додати <i className="fa fa-arrow-circle-right"/>
                        </Link>
                    </div>
                </div>
                {
                    Array.from(groups).map((value) => {
                        return <div className="col-lg-3 col-sm-6">
                            <div className="card-box bg-red">
                                <div className="inner">
                                    <h3>Користувачів: {value.users === null ? 0 : value.users.length} </h3>
                                    <p> {value.nameGroup === undefined ? '' : value.nameGroup} </p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-users"/>
                                </div>
                                <Link to={'/groupsView/' + value.id} className="card-box-footer">Переглянути <i
                                    className="fa fa-arrow-circle-right"/></Link>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    )
}