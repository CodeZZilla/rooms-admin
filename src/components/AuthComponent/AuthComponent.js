import {useEffect, useState} from "react";
import AuthService from "../../services/auth.service";
import {withRouter} from "react-router-dom";

function AuthComponent(props) {

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        getUser();
    }, []);


    const getUser = () => {
        const jwt = AuthService.getCurrentUser();

        if (!jwt) {
            setUser(null);

        } else {
            setUser(jwt);
        }
    }

    if (user === undefined) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (user === null) {
        console.log(props.location)
        if (props.location.pathname !== '/login')
            props.history.push('/login');
    }

    return props.children;

}

export default withRouter(AuthComponent);