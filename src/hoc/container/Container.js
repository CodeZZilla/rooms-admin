import SlideBar from "../../components/SlideBar/SlideBar";
import NavBar from "../../components/NavBar/NavBar";

export default function Container(props) {
    return (
        <div id="app">
                <SlideBar/>
            <div id="main">
                <NavBar/>
                <div id="main-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}