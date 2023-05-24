import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './state';

import ComplaintList from './Pages/ComplaintList';
import Complaints from './Pages/Complaints';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Register from './Pages/Register';
import Summary from './Pages/Summary';
import Profile from './Pages/Profile';
import ChangePassword from './Pages/ChangePassword';
import Faqs from './Pages/Faqs';
import HodComplaint from './Pages/HodComplaint';
import ComplaintStatus from './Pages/Status';
import Reviews from './Pages/Reviews';
import Lecturer from './Pages/Lecturer';
import RegistrarPage from './Pages/Registrar';

const withAuth = <P extends object>(
    WrappedComponent: React.FunctionComponent<P>,
    path?: string
) => {
    const WithAuth: React.FunctionComponent<P> = (props) => {
        const { user, token } = useStore();

        const isAuthenticated = user && token ? true : false; // Return true if authenticated, otherwise false

        return isAuthenticated ? (
            <WrappedComponent {...props} />
        ) : (
            <Navigate to="/signin" replace={true} />
        );
    };

    return WithAuth;
};

const ProtectedComplaintList = withAuth(ComplaintList);
const ProtectedComplaints = withAuth(Complaints);
const ProtectedHome = withAuth(Home);
const ProtectedSummary = withAuth(Summary);
const ProtectedProfile = withAuth(Profile);
const ProtectedChangePassword = withAuth(ChangePassword);
const ProtectedFaqs = withAuth(Faqs);
const ProtectedHodComplaint = withAuth(HodComplaint);
const ProtectedComplaintStatus = withAuth(ComplaintStatus);
const ProtectedReviews = withAuth(Reviews);
const ProtectedLecturer = withAuth(Lecturer);
const ProtectedRegistrarPage = withAuth(RegistrarPage);

export default () => {
    return useRoutes([
        {
            path: '/',
            element: <ProtectedHome />,
        },
        {
            path: 'signin',
            element: <Signin />,
        },
        {
            path: 'reviews',
            element: <ProtectedReviews />,
        },
        {
            path: 'register',
            element: <Register />,
        },
        {
            path: 'registrar',
            element: <ProtectedRegistrarPage />,
        },
        {
            path: 'summary',
            element: <ProtectedSummary />,
        },
        {
            path: 'complaints',
            element: <ProtectedComplaints />,
        },
        {
            path: 'list',
            element: <ProtectedComplaintList />,
        },
        {
            path: 'lecturer',
            element: <ProtectedLecturer />,
        },
        {
            path: 'profile',
            element: <ProtectedProfile />,
        },
        {
            path: 'change-password',
            element: <ProtectedChangePassword />,
        },
        {
            path: 'faqs',
            element: <ProtectedFaqs />,
        },
        {
            path: 'hod',
            element: <ProtectedHodComplaint />,
        },
        {
            path: 'status',
            element: <ProtectedComplaintStatus />,
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
