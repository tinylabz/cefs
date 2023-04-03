import { Navigate, useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Spinner } from '@chakra-ui/react';

const Loadable = (Component: any) => (props: any) =>
(
    <Suspense fallback={<div
        style={{
            width: '100%',
            margin: '20rem auto',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
        }}
    >
        <Spinner size="xl" />
    </div>}>
        <Component {...props} />
    </Suspense>
);

// This is a code comment. It allows us to render components asynchronously, meaning they are not rendered until
// they are needed. This will make the app load faster.
// Home is the home page, Estimator is the estimator page, Signin is the Signin page, and Signup is the Signup page

const Home = Loadable(lazy(() => import('./Pages/Home')));
const Estimator = Loadable(lazy(() => import('./Pages/Estimator')));
const Login = Loadable(lazy(() => import('./Pages/Login')));
const Register = Loadable(lazy(() => import('./Pages/Register')));
export default () => {
    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/estimator',
            element: <Estimator />,
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
            path: '404',
            element: <h1>NOT FOUND</h1>,
        },
        {
            path: '*',
            element: <Navigate to="404" />,
        },
    ]);
};
