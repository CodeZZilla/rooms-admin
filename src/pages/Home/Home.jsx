import Chart from 'react-apexcharts';
import {useEffect, useState} from "react";
import {BarWave} from 'react-cssfx-loading';
import UserService from '../../services/user.service';
import {Redirect} from "react-router-dom";
import logoMini from '../../bg/ROOMS EN Logo_Small Logo White.png';


function Home() {

    const [redirectLoginPage, setRedirectLoginPage] = useState(false);

    const [dataStatistic, setDataStatistic] = useState([]);
    const [stagesStopped, setStagesStopped] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [optionsArea, setOptionsArea] = useState({
        chart: {
            id: "basic-bar"
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: []
        }
    });
    const [series, setSeries] = useState([
        {
            name: "",
            data: []
        }
    ]);
    const [seriesPolarArea, setSeriesPolarArea] = useState([])

    const optionsPolarArea = {
        chart: {
            width: 300,
            type: 'donut',
        },
        labels: ["0 етап", "1 етап", "2 етап", "3 етап", "4 етап", "5 етап", "6 етап", "7 етап"],
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: true
        },
        fill: {
            type: 'gradient',
        },
        title: {
            text: 'Графік по етапах'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    useEffect(() => {
        UserService.getDateStatistic().then(response => {
            setDataStatistic(response.data);
        }).catch(error => {
            if (error.response.status === 401) {
                setRedirectLoginPage(true);
            }
        });

        UserService.getStagesAtWhichClientsStopped().then(response => {
            setStagesStopped(response.data);
            setSeriesPolarArea([
                response.data.zeroStage,
                response.data.firstStage,
                response.data.secondStage,
                response.data.thirdStage,
                response.data.fourthStage,
                response.data.fifthStage,
                response.data.sixthStage,
                response.data.seventhStage
            ])
        }).catch(error => {
            if (error.response.status === 401)
                setRedirectLoginPage(true);
        });

        UserService.getDataForCharts().then(response => {
            setOptionsArea({
                xaxis: {
                    categories: response.data.dates
                }
            });
            setSeries([
                {
                    name: "К-сть користувачів",
                    data: response.data.users
                }
            ]);
            setIsLoading(false);
        }).catch(error => {
            if (error.response.status === 401)
                setRedirectLoginPage(true);
        });

    }, []);
    // useInterval(() => {
    //     UserService.getDateStatistic().then(response => {
    //         setDataStatistic(response.data);
    //     }).catch(error => {
    //         if (error.response.status === 401) {
    //             setRedirectLoginPage(true);
    //         }
    //     });
    // }, 1000);
    if (redirectLoginPage)
        return <Redirect to="/login"/>

    return (
        <>
            {isLoading ? <BarWave className="loaderBar"/> : <div>
                    <div className="page-heading">
                        <h3>Система керування РУМС БОТ</h3>
                    </div>

                    <div className="page-content">
                        <section className="row">
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-6 col-lg-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body px-3 py-4-5">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="stats-icon purple">
                                                            <i className="iconly-boldUser1"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h6 className="text-muted font-semibold">Всьго користувачів</h6>
                                                        <h6 className="font-extrabold mb-0">{dataStatistic.allUsers}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body px-3 py-4-5">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="stats-icon blue">
                                                            <i className="iconly-boldTime-Circle"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h6 className="text-muted font-semibold">За добу</h6>
                                                        <h6 className="font-extrabold mb-0">{dataStatistic.forDay}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body px-3 py-4-5">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="stats-icon green">
                                                            <i className="iconly-boldActivity"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h6 className="text-muted font-semibold">За тиждень</h6>
                                                        <h6 className="font-extrabold mb-0">{dataStatistic.forWeek}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body px-3 py-4-5">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="stats-icon red">
                                                            <i className="iconly-boldCalendar"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h6 className="text-muted font-semibold">За місяць</h6>
                                                        <h6 className="font-extrabold mb-0">{dataStatistic.forMonth}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4>Розмір аудиторії (Line)</h4>
                                            </div>
                                            <div className="card-body">
                                                {/*USE MY CHART*/}
                                                <Chart type="area" height="400px" options={optionsArea}
                                                       series={series}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4>Розмір аудиторії (Bar)</h4>
                                            </div>
                                            <div className="card-body">
                                                {/*USE MY CHART*/}
                                                <Chart type="bar" height="400px" options={optionsArea} series={series}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3">
                                <div className="card">
                                    <div className="card-body py-4 px-5">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-xl">
                                                <a href="https://t.me/rooms_rent_bot" target="_blank">
                                                    <img src={logoMini} alt="Face 1"/>
                                                </a>
                                            </div>
                                            <div className="ms-3 name">
                                                <h5 className="font-bold">ROOMS ADMIN</h5>
                                                <h6 className="text-muted mb-0">@rooms_rent_bot</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Етапи на яких зупинились клієнти</h4>
                                    </div>
                                    <div className="card-content p-0 pb-4">
                                        <div className="recent-message px-4 py-3">
                                            <div className="row p-0">
                                                <h3 className="col-6 mb-1 h3">Етапи</h3>
                                                <h6 className="col-6 text-muted text-end">к-сть користувачів</h6>
                                            </div>
                                            <div className="name w-100 p-3">
                                                <div className="row">
                                                    <h5 className="col-6 mb-1">0 етап</h5>
                                                    <h5 className="col-6 mb-1 text-end ">{stagesStopped.zeroStage}</h5>
                                                </div>
                                                <div className="row">
                                                    <h5 className="col-6 mb-1">1 етап</h5>
                                                    <h5 className="col-6 mb-1 text-end ">{stagesStopped.firstStage}</h5>
                                                </div>
                                                <div className="row">
                                                    <h5 className="col-6 mb-1">2 етап</h5>
                                                    <h5 className="col-6 mb-1 text-end ">{stagesStopped.secondStage}</h5>
                                                </div>
                                                <div className="row">
                                                    <h5 className="col-6 mb-1">3 етап</h5>
                                                    <h5 className="col-6 mb-1 text-end ">{stagesStopped.thirdStage}</h5>
                                                </div>
                                                <div className="row">
                                                    <h5 className="col-6 mb-1">4 етап</h5>
                                                    <h5 className="col-6 mb-1 text-end ">{stagesStopped.fourthStage}</h5>
                                                </div>
                                                <div className="row">
                                                    <h5 className="col-6 mb-1">5 етап</h5>
                                                    <h5 className="col-6 mb-1 text-end ">{stagesStopped.fifthStage}</h5>
                                                </div>
                                                <div className="row">
                                                    <h5 className="col-6 mb-1">6 етап</h5>
                                                    <h5 className="col-6 mb-1 text-end ">{stagesStopped.sixthStage}</h5>
                                                </div>
                                                <div className="row">
                                                    <h5 className="col-6 mb-1">7 етап</h5>
                                                    <h5 className="col-6 mb-1 text-end ">{stagesStopped.seventhStage}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4">
                                            <button
                                                className='btn btn-block btn-xl btn-light-primary font-bold mt-3' type="button" data-bs-toggle="modal"
                                            data-bs-target="#exampleModalCenter">
                                                Подивитись повну інформацію
                                            </button>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div
                                            className="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable"
                                            role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalCenterTitle">Повна
                                                        інформація по етапах
                                                    </h5>
                                                    <button type="button" className="close" data-bs-dismiss="modal"
                                                            aria-label="Close">
                                                        <i data-feather="x"></i>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>
                                                        (0 етап) Етап при команді /start - к-сть юзерів які зупинились на цьому етапі {stagesStopped.zeroStage}
                                                        <br/>
                                                        <br/>
                                                        (1 етап) Етап початку - к-сть юзерів які зупинились на цьому етапі {stagesStopped.firstStage}
                                                        <br/>
                                                        <br/>
                                                        (2 етап) Етап вибору міста - к-сть юзерів які зупинились на цьому етапі {stagesStopped.secondStage}
                                                        <br/>
                                                        <br/>
                                                        (3 етап) Етап вибору житла - к-сть юзерів які зупинились на цьому етапі {stagesStopped.thirdStage}
                                                        <br/>
                                                        <br/>
                                                        (4 етап) Етап вибору типа житла - к-сть юзерів які зупинились на цьому етапі {stagesStopped.fourthStage}
                                                        <br/>
                                                        <br/>
                                                        (5 етап) Етап вибору ціни - к-сть юзерів які зупинились на цьому етапі {stagesStopped.fifthStage}
                                                        <br/>
                                                        <br/>
                                                        (6 етап) Етап вибору регіона - к-сть юзерів які зупинились на цьому етапі {stagesStopped.sixthStage}
                                                        <br/>
                                                        <br/>
                                                        (7 етап) Етап вибору станції метро - к-сть юзерів які зупинились на цьому етапі {stagesStopped.seventhStage}
                                                    </p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-dark"
                                                            data-bs-dismiss="modal">
                                                        <i className="bx bx-x d-block d-sm-none"></i>
                                                        <span className="d-none d-sm-block">Закрити</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Профіль відвідувачів</h4>
                                    </div>
                                    <div className="card-body">
                                        <Chart options={optionsPolarArea} series={seriesPolarArea} width={300}
                                               type="donut"/>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>}
        </>

    )
}

export default Home;