import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { useEffect } from 'react';

import ComplaintList from './Pages/ComplaintList';
import Complaints from './Pages/Complaints';
import Home from './Pages/Home';
import Signin from './Pages/signin';
import Register from './Pages/Register';
import Summary from './Pages/Summary';
import Profile from './Pages/Profile';
import ChangePassword from './Pages/ChangePassword';
import Faqs from './Pages/Faqs';
import HodComplaint from './Pages/HodComplaint';
import ComplaintStatus from './Pages/Status';
import Reviews from './Pages/Reviews';
import Lecturer from './Pages/Lecturer';

export default () => {
    return useRoutes([
        {
            path: '',
            element: <Home />,
        },
        {
            path: 'signin',
            element: <Signin />,
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
                fontSize: '2em',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            404
        </div>
    );
};
