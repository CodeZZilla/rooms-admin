import Select from 'react-select'
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {BarWave} from "react-cssfx-loading";
import UserService from "../../services/user.service";
import GroupService from "../../services/group.service";

export default function AddGroup() {
    const [options, setOptions] = useState([]);
    const [flag, setFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [redirectLoginPage, setRedirectLoginPage] = useState(false);
    let selectedValues;

    useEffect(() => {
        let u = []
        UserService.getUsers().then(response => {
            for (let user of response.data) {
                u.push({
                    value: user,
                    label: `${user.idTelegram} ${user.lastName === undefined ? "" : user.lastName} ${user.name}`
                })
            }
            setIsLoading(false);
        }).catch(err => {
            if (err.response.status === 401)
                setRedirectLoginPage(true);
        });
        setOptions(u)
    }, [])

    const handlerClick = (e) => {
        e.preventDefault();

        const name = document.getElementById('first-name').value;

        GroupService.addGroup(name, selectedValues).then(function () {
            setFlag(true);
        }).catch(err => {
            if (err.response.status === 401)
                setRedirectLoginPage(true);
        });
    }

    if (flag) {
        return <Redirect to="/groups"/>
    }

    if (redirectLoginPage)
        return <Redirect to="/login"/>

    return (
           isLoading ? <BarWave className="loaderBar"/> : <div>
               <div className="page-content">
                   <div className="row match-height">
                       <div className="col-md-12 col-12">
                           <div className="card">
                               <div className="card-header">
                                   <h4 className="card-title">Створення групи</h4>
                               </div>
                               <div className="card-content">
                                   <div className="card-body">
                                       <form className="form form-horizontal">
                                           <div className="form-body">
                                               <div className="row">
                                                   <div className="col-md-4">
                                                       <label>Назва групи</label>
                                                   </div>
                                                   <div className="col-md-8 form-group">
                                                       <input type="text" id="first-name" className="form-control"
                                                              name="fname" placeholder="Назва групи"/>
                                                   </div>
                                                   <div className="col-md-4">
                                                       <label>Користувачі</label>
                                                   </div>
                                                   <div className="col-md-8 form-group">
                                                       <Select options={options} isMulti onChange={e => {
                                                           let selected = [];
                                                           e.map(x => selected.push(x.value))
                                                           selectedValues = selected;
                                                       }}/>
                                                   </div>

                                                   <div className="col-sm-12 d-flex justify-content-end">
                                                       <button type="submit"
                                                               className="btn btn-primary me-1 mb-1"
                                                               onClick={handlerClick}>Зберегти
                                                       </button>
                                                   </div>
                                               </div>
                                           </div>
                                       </form>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>

            </div>
    )
}