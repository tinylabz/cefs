import { Navigate, useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Spinner } from '@chakra-ui/react';

const Loadable = (Component: any) => (props: any) =>
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
                    <Spinner size="xl" />
                </div>
            }
        >
            <Component {...props} />
        </Suspense>
    );
const Home = Loadable(lazy(() => import('./Pages/Home')));
const Login = Loadable(lazy(() => import('./Pages/Login')));
const Register = Loadable(lazy(() => import('./Pages/Register')));
const Summary = Loadable(lazy(() => import('./Pages/Summary')));
const Complaint = Loadable(lazy(() => import('./Pages/MissingMark')));
const Profile = Loadable(lazy(() => import('./Pages/Profile')));
const Remark = Loadable(lazy(() => import('./Pages/Remark')));
const ChangePassword = Loadable(lazy(() => import('./Pages/ChangePassword')));
const MissingMark = Loadable(lazy(() => import('./Pages/MissingMark')));

export default () => {
    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/summary',
            element: <Summary />,
        },
        {
            path: '/complaint',
            element: <Complaint />,
        },
        {
            path: '/profile',
            element: <Profile />,
        },
        {
            path: '/remark',
            element: <Remark />,
        },
        {
            path: '/missing-mark',
            element: <MissingMark />,
        },
        {
            path: '/change-password',
            element: <ChangePassword />,
        },
        {
            path: '404',
            element: <h1>NOT FOUND</h1>,
        },
        {
            path: '*',
            element: <Navigate to="404" />,
        },
    ]);
};
