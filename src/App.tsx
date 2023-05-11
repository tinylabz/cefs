import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';

import { Spinner } from '@chakra-ui/react';
import ComplaintList from './Pages/ComplaintList';
import Complaints from './Pages/Complaints';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Summary from './Pages/Summary';
import Profile from './Pages/Profile';
import ChangePassword from './Pages/ChangePassword';
import Faqs from './Pages/Faqs';
import HodComplaint from './Pages/HodComplaint';
import ComplaintStatus from './Pages/Status';
import Reviews from './Pages/Reviews';
import Lecturer from './Pages/Lecturer';

const Loadable = (Component: React.FC) => (props: any) =>
    (
        <Suspense
            fallback={
                <div
                    style={{
                        width: '100%',
                        margin: '20rem auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <Spinner size="xs" />
                </div>
            }
        >
            <Component {...props} />
        </Suspense>
    );
// const Home = Loadable(lazy(() => import('./Pages/Home')));
// const Login = Loadable(lazy(() => import('./Pages/Login')));
// const Register = Loadable(lazy(() => import('./Pages/Register')));
// const Summary = Loadable(lazy(() => import('./Pages/Summary')));
// const Complaint = Loadable(lazy(() => import('./Pages/Complaint')));
// const Profile = Loadable(lazy(() => import('./Pages/Profile')));
// const ChangePassword = Loadable(lazy(() => import('./Pages/ChangePassword')));
// const Faqs = Loadable(lazy(() => import('./Pages/Faqs')));
// const HodComplaint = Loadable(lazy(() => import('./Pages/HodComplaint')));
// const ComplaintStatus = Loadable(lazy(() => import('./Pages/Status')));

export default () => {
    return useRoutes([
        {
            path: '',
            element: <Home />,
        },
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: 'reviews',
            element: <Reviews />,
        },
        {
            path: 'register',
            element: <Register />,
        },
        {
            path: 'summary',
            element: <Summary />,
        },
        {
            path: 'complaints',
            element: <Complaints />,
        },
        {
            path: 'list',
            element: <ComplaintList />,
        },
        {
            path: 'lecturer',
            element: <Lecturer />,
        },
        {
            path: 'profile',
            element: <Profile />,
        },
        {
            path: 'change-password',
            element: <ChangePassword />,
        },
        {
            path: 'faqs',
            element: <Faqs />,
        },
        {
            path: 'hod',
            element: <HodComplaint />,
        },
        {
            path: 'status',
            element: <ComplaintStatus />,
        },
        {
            path: '404',
            element: <NotFound />,
        },
        {
            path: '*',
            element: <Navigate to="404" />,
        },
    ]);
};

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }, []);
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            Page Not Found
        </div>
    );
};
