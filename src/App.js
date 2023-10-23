import { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { authenticationValidator } from './store/actions';
// import { Spinner } from './components';
import { guestRoutes } from './routes';

import './assets/js/custom';
import 'bootstrap/dist/js/bootstrap';
import './assets/js/fontawesome.min';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/stylep.css';
import './assets/css/bootstrap-datetimepicker.css';
import './assets/css/cvStyle.css';
import './assets/css/responsive.css';
import './assets/css/animate.css';
import './assets/css/svg-icons-animate.css';
import './assets/css/dev.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';
import { Spinner } from './components';
// import AlertMessageModal from './components/UI/Model/AlertMessageModal';

function App() {
  const tokenPresent = !!useSelector(state => state.auth.authToken);
  // const role = !!useSelector(state => state.auth.userRole);
  const pathname = window.location.pathname.split('/')[1];
  const dispatch = useDispatch();

  // const { open } = useSelector(state => state.modal);

  const googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en' },
      'google_translate_element',
    );
  };

  useEffect(() => {
    dispatch(authenticationValidator());
    const addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, [dispatch]);

  const redirectHandler = () => {
    const guestRoute = guestRoutes
      .filter(item => item.redirectRoute === undefined)
      .map(item => item.path);
    return !guestRoute.includes(`/${pathname}`) && !localStorage.getItem('authToken') ? (
      <Redirect to="/signin" />
    ) : null;
    // return !guestRoute.includes(`/${pathname}`);
  };

  let mainContent = (
    <>
      {guestRoutes.map(
        route =>
          route.redirectRoute === undefined && (
            <Route key={route.name} path={route.path} exact={route.exact} name={route.name}>
              <route.component />
            </Route>
          ),
      )}
      {redirectHandler()}
    </>
  );
  if (tokenPresent) {
    mainContent = (
      <>
        <Route path="/" component={lazy(() => import('./views/MainContainer/MainContainer'))} />
        {/* {open && <AlertMessageModal />} */}
      </>
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Switch>
          {mainContent}
          {/* {pathname !== 'bid-detail' && open && <AlertMessageModal />} */}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
