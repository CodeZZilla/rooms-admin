import './news.css';
import {Link, Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import NewsService from "../../services/news.service";
import {BarWave} from "react-cssfx-loading";
import {toast, ToastContainer} from "react-toastify";
import {injectStyle} from "react-toastify/dist/inject-style";

export default function News() {
    const imageNotFound = "assets/images/bg/answer.jpg";

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [redirectLoginPage, setRedirectLoginPage] = useState(false);

    if (typeof window !== 'undefined') {
        injectStyle()
    }

    useEffect(() => {
        NewsService.getAll().then(response => {
            setNews(response.data);
            setIsLoading(false);
        }).catch(err => {
            if (err.response.status === 401)
                setRedirectLoginPage(true);
        });
    }, [])

    if (redirectLoginPage)
        return <Redirect to="/login"/>

    const deleteNews = (e, id) => {
        e.preventDefault();
        NewsService.deleteNews(id).then((response) => {
            setNews(response.data);
            toast.info("Видаленно", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        });
    }

    return (
        isLoading ? <BarWave className="loaderBar"/> : <div >

            <div className="page-heading">
                        <h3>Всі новини які є на сайті <a href="https://roomsua.me" target="_blank">roomsua.me</a></h3>
            </div>

            <div className="page-content">
                <Link to="/addNews">
                    <button type="button" className="btn btn-labeled btn-success">
                        <span className="btn-label"><i className="fa fa-plus"/></span>Додати новину
                    </button>
                </Link>


                {
                    Array.from(news).map(value => {
                        return <div className="row align-items-center event-block no-gutters margin-40px-bottom">
                            <div className="col-lg-5 col-sm-12">
                                <div className="position-relative">
                                    <img className="img-news" src={value.imageUrl === '' ? imageNotFound : value.imageUrl}
                                         alt=""/>
                                </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 d-flex flex-column">
                                <div className="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                                    <h5 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                                        <p className="text-theme-color">{value.title}</p></h5>

                                    <p>{value.text}</p>
                                </div>
                                <div className="d-flex align-self-end">
                                    <Link to={`/editNews/${value.id}`}>
                                        <button type="button" className="btn btn-labeled btn-primary m-1">
                                            <span className="btn-label"><i className="fa fa-edit"/></span>Редагувати
                                        </button>
                                    </Link>

                                    <button type="button" onClick={(e) => deleteNews(e, value.id)}
                                            className="btn btn-labeled btn-danger m-1">
                                        <span className="btn-label"><i className="fa fa-trash"/></span>Видалити
                                    </button>
                                </div>
                            </div>

                        </div>
                    })
                }
            </div>



            <ToastContainer/>
        </div>
    )
}