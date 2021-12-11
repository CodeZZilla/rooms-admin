import './news.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import NewsService from "../../services/news.service";
import {BarWave} from "react-cssfx-loading";
import {toast, ToastContainer} from "react-toastify";
import {injectStyle} from "react-toastify/dist/inject-style";

export default function News() {
    const imageNotFound = "assets/images/bg/answer.jpg";

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    if (typeof window !== 'undefined') {
        injectStyle()
    }

    useEffect(() => {
        NewsService.getAll().then(response => {
            setNews(response.data);
            setIsLoading(false);
        });
    }, [])

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
        isLoading ? <BarWave className="loaderBar"/> : <div className="container">

            <div className="page-title">
                <div className="row">
                    <div className="col-12 col-md-6 order-md-1 order-last">
                        <h3>Всі новини які є на сайті <a href="https://roomsua.me" target="_blank">roomsua.me</a></h3>
                        <p className="text-subtitle text-muted"/>
                    </div>
                </div>
            </div>

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

            {/*<div className="row align-items-center event-block no-gutters margin-40px-bottom">*/}
            {/*    <div className="col-lg-5 col-sm-12">*/}
            {/*        <div className="position-relative">*/}
            {/*            <img className="img-news" src={imageNotFound} alt=""/>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="col-lg-7 col-sm-12">*/}
            {/*        <div className="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">*/}
            {/*            <h5 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">*/}
            {/*                <a href="event-details.html" className="text-theme-color">Mentorship Program</a></h5>*/}
            {/*            <ul className="event-time margin-10px-bottom md-margin-5px-bottom">*/}
            {/*                <li><i className="far fa-clock margin-10px-right"/> 09:20 AM - 12:00 AM</li>*/}
            {/*                <li><i className="fas fa-user margin-5px-right"/> Speaker : Avil Mex</li>*/}
            {/*            </ul>*/}
            {/*            <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel*/}
            {/*                illum dolore</p>*/}
            {/*            <a className="butn small margin-10px-top md-no-margin-top" href="event-details.html">Read*/}
            {/*                More <i className="fas fa-long-arrow-alt-right margin-10px-left"/></a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="row align-items-center event-block no-gutters">*/}
            {/*    <div className="col-lg-5 col-sm-12">*/}
            {/*        <div className="position-relative">*/}
            {/*            <img className="img-news" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZlf5lc5tX-0gY-y94pGS0mQdL-D0lCH2OQ&usqp=CAU" alt=""/>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="col-lg-7 col-sm-12">*/}
            {/*        <div className="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">*/}
            {/*            <h5 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">*/}
            {/*                <a href="event-details.html" className="text-theme-color">Startup Events</a></h5>*/}
            {/*            <ul className="event-time margin-10px-bottom md-margin-5px-bottom">*/}
            {/*                <li><i className="far fa-clock margin-10px-right"/> 11:00 AM - 09:00 PM</li>*/}
            {/*                <li><i className="fas fa-map-marker-alt margin-5px-right"/> Speaker : Mavil Aven</li>*/}
            {/*            </ul>*/}
            {/*            <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel*/}
            {/*                illum dolore</p>*/}
            {/*            <a className="butn small margin-10px-top md-no-margin-top" href="event-details.html">Read*/}
            {/*                More <i className="fas fa-long-arrow-alt-right margin-10px-left"/></a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <ToastContainer/>
        </div>
    )
}