import {Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NewsService from "../../services/news.service";
import {BarWave} from "react-cssfx-loading";

export default function EditNews() {
    const params = useParams();
    const id = params.id;

    const [isLoading, setIsLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [redirectLoginPage, setRedirectLoginPage] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        NewsService.getOne(id).then(response => {
            setTitle(response.data.title);
            setText(response.data.text);
            setLink(response.data.link);
            setImageUrl(response.data.imageUrl);

            setIsLoading(false);
        }).catch(err => {
            if (err.response.status === 401)
                setRedirectLoginPage(true);
        });
    },[id])


    const saveSubmit = (e) => {
        e.preventDefault();
        NewsService.updateNews(id, title, link, imageUrl, text).then(() => {
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
        return <Redirect to='/login'/>

    return (
        isLoading ? <BarWave className="loaderBar"/> : <div>
            <div className="page-heading">
                <div className="row">
                    <div className="col-lg-12">
                        <h3 className="text-dark mt-5">Редагування новини</h3>
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
                                                            <input id="phone" type="text" onChange={e => setImageUrl(e.target.value)}
                                                                   value={imageUrl} className="form-control resume"
                                                                   placeholder=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="form-group app-label">
                                                            <label htmlFor="phone" className="text-muted">Посилання</label>
                                                            <input id="link" type="text" onChange={e => setLink(e.target.value)}
                                                                   value={link} className="form-control resume"
                                                                   placeholder=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="form-group app-label">
                                                            <label htmlFor="website" className="text-muted">Назва</label>
                                                            <input id="website" type="text" onChange={e => setTitle(e.target.value)}
                                                                   value={title} className="form-control resume"
                                                                   placeholder=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="form-group app-label">
                                                            <label htmlFor="address">Опис</label>
                                                            <textarea id="address" rows="4" onChange={e => setText(e.target.value)}
                                                                      value={text} className="form-control resume"
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