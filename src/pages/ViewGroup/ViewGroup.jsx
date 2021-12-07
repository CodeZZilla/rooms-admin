import {Redirect, useParams} from "react-router-dom";
import ActionTable from "../../components/ActionTable/ActionTable";
import {useEffect, useState} from "react";
import Select from "react-select";
import {BarWave} from "react-cssfx-loading";
import GroupService from "../../services/group.service";
import UserService from "../../services/user.service";
import {toast, ToastContainer} from "react-toastify";
import {injectStyle} from "react-toastify/dist/inject-style";
import MessageService from "../../services/message.service";

export default function ViewGroup() {
    const [selectedValues, setSelectedValues] = useState([]);
    const params = useParams();
    const idGroup = params.id;

    const [group, setGroup] = useState({});
    const [dataUserGroup, setDataUserGroup] = useState([]);
    const [options, setOptions] = useState([]);
    const [flag, setFlag] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [select, setSelect] = useState({value: options[0], options})
    const [isLoading, setIsLoading] = useState(true);

    let selectTable;

    const selectionHandler = (selected) => {
        selectTable = selected;
    };

    function forUsers(users) {
        let u = []
        if (users !== null) {
            for (let i = 0; i < users.length; i++) {
                u.push({
                    id: users[i].id,
                    idTelegram: users[i].idTelegram,
                    surname: users[i].lastName,
                    name: users[i].name,
                    lessDays: users[i].daysOfSubscription,
                    date: users[i].creationDate,
                    rooms: users[i].todayCompilation.length,
                    stage: users[i].userStatus
                })
            }
        }
        return u;
    }

    if (typeof window !== 'undefined') {
        injectStyle()
    }

    useEffect(() => {
        GroupService.getIdGroup(idGroup).then(response => {
            setDataUserGroup(forUsers(response.data.users));
            setGroup(response.data)
        });
        UserService.getUsers().then(response => {
            let select = [];
            for (let item of response.data) {
                select.push({
                    value: item.id,
                    label: `${item.idTelegram} ${item.lastName === undefined ? "" : item.lastName} ${item.name}`
                })
            }

            setAllUsers(response.data);
            setOptions(select);
            setIsLoading(false);
        });


    }, [])


    const deleteGroup = () => {
        GroupService.deleteGroup(idGroup).then(() => {
            setFlag(true);
        });

    }


    const updateGroupName = (e) => {
        e.preventDefault();
        const name = document.getElementById('newNameGroup').value;

        GroupService.updateGroup(idGroup, name, group.users).then(response => {
            setGroup(response.data);
        });

        toast.info("Назву успішно зміннено", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    const updateUsers = () => {
        let all = [];

        if (group.users !== null) {
            group.users.forEach(x => all.push(x))
        }

        selectedValues.forEach(i => {
            all.push(allUsers.find(item => item.id === i))
        })

        GroupService.updateGroup(idGroup, group.nameGroup, all).then(response => {
            setDataUserGroup(forUsers(response.data.users))
            setGroup(response.data)
            setSelect({value: null})
        });

        toast.success("Юзери додані", {
            position: toast.POSITION.BOTTOM_RIGHT
        })

    }

    const handleAddButton = (e) => {
        e.preventDefault();
        let itemsToBeRemoved = dataUserGroup.map(x => x.id)
        setOptions(options.filter(item => !itemsToBeRemoved.includes(item.value)))

    }

    const handleChange = value => {
        let selected = [];
        value.map(x => selected.push(x.value))
        setSelectedValues(selected);
        setSelect(value);
    }

    const deleteHandler = (event, selectedUsers) => {

        let temp = []
        let users = [...group.users];
        for (let s of selectedUsers) {
            temp.push(allUsers.find(el => el.id === s.id))
        }
        let itemsToBeRemoved = temp.map(x => x.id);

        let newUsers = users.filter(item => !itemsToBeRemoved.includes(item.id))
        GroupService.updateGroup(idGroup, group.nameGroup, newUsers).then(response => {
            setDataUserGroup(forUsers(response.data.users))
            setGroup(response.data)
        });
    }

    const sendButton = (e) => {
        e.preventDefault();
        const text = document.getElementById('textArea').value;
        if (selectTable === undefined || select.length === 0) {
            toast.error('Виберіть юзерів', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            MessageService.addMessage(selectTable.map(x => x.idTelegram), text).then(() => {
                document.getElementById('textArea').value = "";
                toast.info("Росилка надіслана", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            });
        }


    };


    if (flag) {
        return <Redirect to="/groups"/>;
    }

    return (
        isLoading ? <BarWave className="loaderBar"/> : <div className="page-heading">

            <div className="page-title">
                <div className="row">
                    <div className="col-12 col-md-6 order-md-1 order-last">
                        <h3>Група {group.nameGroup}</h3>
                        <p className="text-subtitle text-muted"/>
                    </div>
                </div>
            </div>
            <section className="section">
                <div className="modal-success me-1 mb-1 d-inline-block">
                    <button type="button" className="btn btn-outline-success"
                            data-bs-toggle="modal" data-bs-target="#success" onClick={handleAddButton}>
                        Додати юзерів
                    </button>

                    <div className="modal fade text-left" id="success" tabIndex="-1"
                         role="dialog" aria-labelledby="myModalLabel110"
                         aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                             role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-success">
                                    <h5 className="modal-title white" id="myModalLabel110">
                                        Виберіть юзерів яких ви хочете додати
                                    </h5>
                                    <button type="button" className="close"
                                            data-bs-dismiss="modal" aria-label="Close">
                                        <i data-feather="x"/>
                                    </button>
                                </div>
                                <form action="#">
                                    <div className="modal-body">
                                        <label>Юзери: </label>
                                        <div className="form-group  mb-24">
                                            <Select value={select.value} isMulti options={options}
                                                    onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light-secondary"
                                                data-bs-dismiss="modal">
                                            <i className="bx bx-x d-block d-sm-none"/>
                                            <span className="d-none d-sm-block">Закрити</span>
                                        </button>
                                        <button type="submit" className="btn btn-success ml-1"
                                                data-bs-dismiss="modal" onClick={updateUsers}>
                                            <i className="bx bx-check d-block d-sm-none"/>
                                            <span className="d-none d-sm-block">Додати</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-primary me-1 mb-1 d-inline-block">
                    <button type="button" className="btn btn-outline-primary"
                            data-bs-toggle="modal" data-bs-target="#primary">
                        Змінити назву групи
                    </button>

                    <div className="modal fade text-left" id="primary" tabIndex="-1"
                         role="dialog" aria-labelledby="myModalLabel160"
                         aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                             role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-primary">
                                    <h5 className="modal-title white" id="myModalLabel160">
                                        Зміна назви групи
                                    </h5>
                                    <button type="button" className="close"
                                            data-bs-dismiss="modal" aria-label="Close">
                                        <i data-feather="x"/>
                                    </button>
                                </div>
                                <form action="#">
                                    <div className="modal-body">
                                        <label>Назва: </label>
                                        <div className="form-group">
                                            <input id="newNameGroup" type="text" placeholder="Введіть назву..."
                                                   className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light-secondary"
                                                data-bs-dismiss="modal">
                                            <i className="bx bx-x d-block d-sm-none"/>
                                            <span className="d-none d-sm-block">Закрити</span>
                                        </button>
                                        <button id="buttonName" type="submit" className="btn btn-primary ml-1"
                                                data-bs-dismiss="modal" onClick={updateGroupName}>
                                            <i className="bx bx-check d-block d-sm-none"/>
                                            <span className="d-none d-sm-block">Змінити</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-danger me-1 mb-1 d-inline-block">
                    <button type="button" className="btn btn-outline-danger"
                            data-bs-toggle="modal" data-bs-target="#danger">
                        Видалити групу
                    </button>

                    <div className="modal fade text-left" id="danger" tabIndex="-1"
                         role="dialog" aria-labelledby="myModalLabel120"
                         aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                             role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-danger">
                                    <h5 className="modal-title white" id="myModalLabel120">
                                        Видалення групи
                                    </h5>
                                    <button type="button" className="close"
                                            data-bs-dismiss="modal" aria-label="Close">
                                        <i data-feather="x"/>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Ви впевнені що хочете видалити група?
                                    Відновити її буде неможливо!!!
                                </div>
                                <div className="modal-footer">
                                    <button type="button"
                                            className="btn btn-light-secondary"
                                            data-bs-dismiss="modal">
                                        <i className="bx bx-x d-block d-sm-none"/>
                                        <span className="d-none d-sm-block">Ні</span>
                                    </button>
                                    <button type="button" className="btn btn-danger ml-1"
                                            data-bs-dismiss="modal" onClick={deleteGroup}>
                                        <i className="bx bx-check d-block d-sm-none"/>
                                        <span className="d-none d-sm-block">Так</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <ActionTable onSelectionChange={selectionHandler} title="Таблиця" data={dataUserGroup} options={{selection: true}} action={[
                            {
                                tooltip: 'Видалити всіх вибраних юзерів',
                                icon: 'delete',
                                onClick: (evt, value) => {
                                    if (window.confirm("Ви впевнені що хочете видалити юзерів")){
                                        deleteHandler(evt, value);
                                        toast.error("Юзери видалені", {
                                            position: toast.POSITION.BOTTOM_RIGHT
                                        })
                                    }
                                }
                            }
                        ]}/>
                    </div>
                </div>
            </section>
            <section className="section">
                <form onSubmit={sendButton}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Росилка повідомлень</h4>
                        </div>
                        <div className="card-body">
                            {/*<p>Snow is a clean editor theme</p>*/}
                            <div>
                                {/*<ReactQuill onChange={setText}/>*/}
                                <textarea id="textArea" className="form-control"
                                          rows="3"/>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary">Надіслати</button>
                        </div>

                    </div>
                </form>

            </section>
            <ToastContainer/>
        </div>
    )
}