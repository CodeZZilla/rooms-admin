import {useEffect, useRef, useState} from "react";
import {BarWave} from "react-cssfx-loading";
import ActionTable from "../../components/ActionTable/ActionTable";
import UserService from "../../services/user.service";
import TelegramService from '../../services/telegram.service';
import {toast, ToastContainer} from "react-toastify";
import {injectStyle} from "react-toastify/dist/inject-style";
import {Redirect} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import MessageService from "../../services/message.service";

export default function Users() {

    const [isLoading, setIsLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [redirectLoginPage, setRedirectLoginPage] = useState(false);
    const [date, setDate] = useState(new Date().getTime());
    const [disabledDatePicker, setDisabledDatePicker] = useState(true);

    const checkBox = useRef();

    // let select;
    const [select, setSelect] = useState(null);

    if (typeof window !== 'undefined') {
        injectStyle()
    }

    useEffect(() => {
        UserService.getUsers().then(response => {
            let u = [];
            for (let i = 0; i < response.data.length; i++) {
                let date = new Date(response.data[i].creationDate);
                let dateString = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." +
                    date.getFullYear();

                u.push({
                    id: response.data[i].id,
                    idTelegram: response.data[i].idTelegram,
                    nickname: response.data[i].nickname,
                    surname: response.data[i].lastName,
                    name: response.data[i].name,
                    phoneNumber: response.data[i].phoneNumber,
                    lessDays: response.data[i].daysOfSubscription,
                    date: dateString,
                    rooms: response.data[i].todayCompilation.length,
                    stage: response.data[i].userStatus
                })
            }
            setDataUser(u)
            setIsLoading(false)
        }).catch(err => {
            if (err.response.status === 401)
                setRedirectLoginPage(true);
        });

    }, []);

    const deleteUsers = async (id) => {
        await UserService.deleteUser(id).catch(err => {
            if (err.response.status === 401)
                setRedirectLoginPage(true);
        });
    };

    const sendButton = (e) => {
        e.preventDefault();
        const text = document.getElementById('textArea').value;

        if (select === undefined || select.length === 0) {
            toast.error('Виберіть юзерів', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            // console.log(checkBox.current.checked)
            if (checkBox.current.checked) {
                MessageService.addMessage(select.map(item => item.idTelegram), text, date).then(() => {
                    document.getElementById('textArea').value = "";
                    toast.info("Росилка надіслана", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                });

            } else {

                for (let item of select) {
                    TelegramService.sendMessage(item.idTelegram, text).catch(err => {
                        console.log("enter text")
                        // if (err.response.status === 400) {
                        //     toast.error("Введите текст", {
                        //         position: toast.POSITION.BOTTOM_RIGHT
                        //     });
                        // }

                    });

                }
                document.getElementById('textArea').value = "";
                toast.info("Росилка надіслана", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

            }


        }
    };

    const selectionHandler =  (selected) => {
        // select = selected;
        setSelect(selected);
        // console.log(selected)
    };



    const changeCheckBoxHandler = e => {
        if (e.target.checked) {
            setDisabledDatePicker(false);
        } else
            setDisabledDatePicker(true);
    }

    if (redirectLoginPage)
        return <Redirect to="/login"/>

    return (

        isLoading ? <BarWave className="loaderBar"/> :
            <div className="page-heading">
                <div className="page-title">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>Таблиця даних</h3>
                            <p className="text-subtitle text-muted"/>
                        </div>
                    </div>
                </div>
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <ActionTable onSelectionChange={selectionHandler} title="Таблиця" data={dataUser}
                                         options={{selection: true, actionsColumnIndex: -1}}
                                         editable={{
                                             onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {

                                                 const dataUpdate = [...dataUser];
                                                 const index = oldData.tableData.id;
                                                 dataUpdate[index] = newData;
                                                 UserService.getUserById(dataUpdate[index].id).then(response => {
                                                     let user = response.data;
                                                     user.idTelegram = dataUpdate[index].idTelegram;
                                                     user.lastName = dataUpdate[index].surname;
                                                     user.name = dataUpdate[index].name;
                                                     user.daysOfSubscription = dataUpdate[index].lessDays;

                                                     UserService.updateUserById(user.id, user).then(() => {
                                                         setDataUser([...dataUpdate]);
                                                     });
                                                 });
                                                 resolve();
                                             }),
                                         }}
                                         action={[
                                             {
                                                 tooltip: 'Видалити всіх вибраних юзерів',
                                                 icon: 'delete',
                                                 onClick: async (evt, selectedUsers) => {
                                                     if (window.confirm("Ви впевнені що хочете видалити юзерів")) {
                                                         await deleteUsers(selectedUsers.map(x => x.id))
                                                         let newUsers = [];
                                                         Array.from(dataUser).map(item => {
                                                             let findUser = selectedUsers.find(el => el === item)
                                                             if (findUser === undefined) {
                                                                 newUsers.push(item)
                                                             }
                                                         })
                                                         setDataUser(newUsers);
                                                         toast.error("Юзери видалені", {
                                                             position: toast.POSITION.BOTTOM_RIGHT
                                                         });
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
                                <div className="form-check">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" ref={checkBox} onChange={changeCheckBoxHandler}
                                               className="form-check-input form-check-primary"
                                               name="customCheck" id="customColorCheck1"/>
                                        <label className="form-check-label"
                                               htmlFor="customColorCheck1">Запланувати росилку</label>
                                    </div>
                                </div>
                                <DatePicker showTimeInput
                                            selected={date} locale={ru}
                                            onChange={date => setDate(date.getTime())}
                                            timeInputLabel="Time:"
                                            timeFormat="p"
                                            dateFormat="Pp"
                                            disabled={disabledDatePicker}
                                />
                            </div>

                        </div>
                    </form>

                </section>
                <ToastContainer/>
            </div>


    )
}