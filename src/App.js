import './App.css';
import Home from "./pages/Home/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Users from "./pages/Users/Users";
import Groups from "./pages/Groups/Groups";
import AddGroup from "./pages/AddGroup/AddGroup";
import ViewGroup from "./pages/ViewGroup/ViewGroup";
import Kanban from "./pages/Kanban/Kanban";
import Login from "./pages/Login/Login";
import AuthComponent from "./components/AuthComponent/AuthComponent";
import Container from "./hoc/container/Container";
import News from "./pages/News/News";
import AddNews from "./pages/AddNews/AddNews";
import EditNews from "./pages/EditNews/EditNews";
import ViewUser from "./pages/ViewUser/ViewUser";

function App() {


    return (
        <Router>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <AuthComponent>
                    <Container>
                        <Route exact path="/" component={Home}/>
                        <Route path="/users" component={Users}/>
                        <Route exact path="/groups" component={Groups}/>
                        <Route path="/groups/add" component={AddGroup}/>
                        <Route path="/groupsView/:id" component={ViewGroup}/>
                        <Route path="/kanban" component={Kanban}/>
                        <Route path="/viewUser/:id" component={ViewUser}/>
                        <Route path="/news" component={News}/>
                        <Route path="/addNews" component={AddNews}/>
                        <Route path="/editNews/:id" component={EditNews}/>
                        {/*<Route path="/chat" component={Chat}/>*/}

                    </Container>
                </AuthComponent>
            </Switch>
        </Router>


    );
}

export default App;
