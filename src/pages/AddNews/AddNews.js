import NewsService from "../../services/news.service";
import {useState} from "react";
import {Redirect} from "react-router-dom";

export default function AddNews() {
    const [redirect, setRedirect] = useState(false);
    const [redirectLoginPage, setRedirectLoginPage] = useState(false);

    let title = "";
    let imageUrl = "";
    let text = "";
    let link = "";

    const saveSubmit = (e) => {
        e.preventDefault();
        NewsService.addNews(title, link, imageUrl, text).then(() => {
            setRedirect(true);
        }).catch(err => {
            if (err.response.status === 401)
                setRedirectLoginPage(true);
        });
    }

    if (redirect) {
        return <Redirect to="/news"/>
    }

    if (redirectLoginPage)
        return <Redirect to="/login"/>

    return (
       <div>
           <div className="page-heading">
               <div className="row">
                   <div className="col-lg-12">
                       <h3 className="text-dark mt-5">Додавання новини</h3>
                   </div>
               </div>
           </div>
            <div className="page-content">
                <div className="row">
                    <section className="section">
                        <div className="card">
                            <div className="card-body">
                                <div className="col-lg-12">
                                    <div className="job-detail mt-2 p-4">
                                        <div className="custom-form">
                                            <form onSubmit={saveSubmit}>
                                                <div className="row">

                                                    <div className="col-md-4">
                                                        <div className="form-group app-label">
                                                            <label htmlFor="phone" className="text-muted">Картинка (посилання)</label>
                                                            <input id="phone" type="text" onChange={e => imageUrl = e.target.value} className="form-control resume"
                                                                   placeholder=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="form-group app-label">
                                                            <label htmlFor="phone" className="text-muted">Посилання</label>
                                                            <input id="link" type="text" onChange={e => link = e.target.value} className="form-control resume"
                                                                   placeholder=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="form-group app-label">
                                                            <label htmlFor="website" className="text-muted">Назва</label>
                                                            <input id="website" type="text" onChange={e => title = e.target.value} className="form-control resume"
                                                                   placeholder=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="form-group app-label">
                                                            <label htmlFor="address">Опис</label>
                                                            <textarea id="address" rows="4" onChange={e => text = e.target.value} className="form-control resume"
                                                                      placeholder=""/>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <button type="submit" className="btn btn-labeled btn-success">
                                                            <span className="btn-label"><i className="fa fa-save"/></span>Зберегти
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>

                </div>
            </div>


        </div>
    )
}