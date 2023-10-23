/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  useEffect,
  // useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  LOGO_IMG,
  SMALL_LOGO_IMG,
  NOTIFICATION_IMG,
  // MESSEGE_IMG,
  PROFILE_SVG,
  SEARCH_IMG,
  VIP_ICON_PNG,
  // LANGUAGE_WHITE_SVG,
} from '../../assets/images';
import { setResultSearchText } from '../../store/actions';
import NewCoinNoteModal from './NewCoinNoteModal';

const Layout = props => {
  const { children } = props;
  const location = useLocation();
  const [openNewCoinNoteModal, setOpenNewCoinNoteModal] = useState(false);
  // const [showLang, setShowLang] = useState(false);
  const [tempSearchText, setTempSearchText] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [TIMEOUT, setTIMEOUT] = useState('');
  const { userData } = useSelector(state => state.auth);
  // const googleTranslateRef = useRef();

  const dispatch = useDispatch();
  const history = useHistory();
  const isDashboard =
    history.location.pathname === '/dashboard' || history.location.pathname === '/search-result';

  useEffect(() => {
    setTempSearchText('');
  }, [history.location.pathname]);
  useEffect(() => {
    clearTimeout(TIMEOUT);
    setTIMEOUT(
      setTimeout(() => {
        dispatch(setResultSearchText(tempSearchText));
      }, 500),
    );
  }, [tempSearchText]);
  return (
    <>
      <header className="nav-wrapper header-white" id="dashboard">
        {/* <div className="language-chnage-section">
          <button className="link-button p-0" type="button" onClick={() => setShowLang(!showLang)}>
            <i className={showLang ? 'fa fa-angle-right' : 'fa fa-angle-left'} aria-hidden="true" />
          </button>
          <div className="google_lng_box" style={showLang ? {} : { display: 'none' }}>
            <div id="google_translate_element" ref={googleTranslateRef} />
            {googleTranslateRef.current && googleTranslateRef.current.childNodes.length === 0 && (
              <div style={{ width: 150 }}>Can&apos;t load Google translate, please reload.</div>
            )}
          </div>
          {!showLang && <img className="right-part-img" src={LANGUAGE_WHITE_SVG} alt="" />}
        </div> */}

        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand mob-logo-hide" to="/dashboard">
            <img src={LOGO_IMG} alt="" />
          </Link>
          <Link className="navbar-brand mob-logo" to="/dashboard">
            <img src={SMALL_LOGO_IMG} alt="" />
          </Link>

          <ul className="mob-device-show">
            <li className="notifications">
              <Link to="/notification">
                <img src={NOTIFICATION_IMG} className="" alt="" />
              </Link>
            </li>
            {/* <li>
              <Link to="/message">
                <img src={MESSEGE_IMG} className="msg" alt="" />
              </Link>
            </li> */}
            <li style={{ position: 'relative' }}>
              <Link to="/profile">
                <img
                  src={(userData.profilePic && userData.profilePic.url) || PROFILE_SVG}
                  className="profile"
                  alt=""
                />
                {userData.isVIPMemeber && (
                  <img src={VIP_ICON_PNG} className="vip-header-icon" alt="" />
                )}
              </Link>
            </li>
            <li>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-bars" />
              </button>
            </li>
          </ul>
          <div className="lcheader collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto" id="mob-nav">
              <li className="nav-item hide-search" id="search">
                <form className="navbar-form-custom">
                  <div className="form-group">
                    <i>
                      <img src={SEARCH_IMG} width="15" alt="" />
                    </i>
                    <input
                      type="text"
                      value={tempSearchText}
                      placeholder="Search"
                      className="form-control"
                      name="top-search"
                      autoComplete="off"
                      onFocus={() => {
                        if (history.location.pathname !== '/search-result') {
                          history.push('/search-result');
                        }
                      }}
                      // onKeyDown={e => {
                      //   if (e.key === 'Enter') {
                      //     if (history.location.pathname !== '/search-result') {
                      //       history.push('/search-result');
                      //     }
                      //   }
                      // }}
                      onChange={e => setTempSearchText(e.target.value)}
                    />
                  </div>
                </form>
              </li>
              <li className="nav-item hover-txt left1">
                <Link to="/dashboard">Dashboard</Link>
                {location.pathname === '/dashboard' && (
                  <hr className="active-hr active-hr-dashboard" />
                )}
              </li>
              <li className="nav-item hover-txt left2">
                <Link to="/wishlist">Wishlist</Link>
                {location.pathname === '/wishlist' && (
                  <hr className="active-hr active-hr-wishlist" />
                )}
              </li>
              <li className="nav-item hover-txt left3">
                <Link to="/my-collection">My Collections</Link>
                {location.pathname === '/my-collection' && (
                  <hr className="active-hr active-hr-mycollection" />
                )}
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn-defualt btn"
                  onClick={() => setOpenNewCoinNoteModal(true)}
                >
                  + New Coin / Note
                </button>
              </li>
              <li className="nav-item mob-device-hide">
                <ul className="mob-device-hide">
                  <li className="notifications">
                    {/* <Link to="/notification"> */}
                    <Link to="/notification">
                      <img src={NOTIFICATION_IMG} className="" alt="" />
                    </Link>
                  </li>
                  {/* <li>
                    <Link>
                      <img src={MESSEGE_IMG} className="msg" alt="" />
                    </Link>
                  </li> */}
                  <li style={{ position: 'relative' }}>
                    <Link to="/profile">
                      <img
                        src={(userData.profilePic && userData.profilePic.url) || PROFILE_SVG}
                        className="profile"
                        alt=""
                      />
                      {userData.isVIPMemeber && (
                        <img src={VIP_ICON_PNG} className="vip-header-icon" alt="" />
                      )}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <nav className="mob-device" id="search">
          <form className="navbar-form-custom">
            <div className="form-group">
              <i style={{ top: 3 }}>
                <img src={SEARCH_IMG} width="15" alt="" />
              </i>
              <input
                type="text"
                value={tempSearchText}
                placeholder="Search"
                className="form-control"
                name="top-search"
                onFocus={() => {
                  if (history.location.pathname !== '/search-result') {
                    history.push('/search-result');
                  }
                }}
                onChange={e => setTempSearchText(e.target.value)}
              />
            </div>
          </form>
        </nav>
      </header>
      <section
        className={isDashboard ? 'main-wrapper top-60a coinnav' : 'main-wrapper top-90'}
        id="product"
      >
        {children}
      </section>
      {openNewCoinNoteModal && <NewCoinNoteModal modalOpenClose={setOpenNewCoinNoteModal} />}
    </>
  );
};

export default Layout;
