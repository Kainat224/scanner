import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { Spinner } from '../../../components';
import HeaderTitle from '../../../components/UI/HeaderTitle/HeaderTitle';
import { getCmsSaga, resetCms } from '../../../store/actions';

const AboutUs = () => {
  const { cms } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const { pageType } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pageType === 'about-us') {
      dispatch(getCmsSaga({ screen: 'About Us' }));
    } else if (pageType === 'terms-and-conditions' || pathname === '/terms-and-conditions') {
      dispatch(getCmsSaga({ screen: 'Terms of Services' }));
    } else {
      dispatch(getCmsSaga({ screen: 'Privacy Policy' }));
    }
    return () => dispatch(resetCms());
  }, [pageType]);

  if (!cms) return <Spinner />;

  return (
    <>
      <HeaderTitle title={`${cms.pageTitle}`} screen={pathname === '/terms-and-conditions'} />
      {/* <section className="main-wrapper top-90 cms_section" id="about_us"> */}
      <section
        className={`main-wrapper ${
          pathname !== '/terms-and-conditions' ? 'top-90' : 'top-90-not-auth'
        } cms_section`}
        id="about_us"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="txt-black f-18">{ReactHtmlParser(cms.pageDescription)}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutUs;
