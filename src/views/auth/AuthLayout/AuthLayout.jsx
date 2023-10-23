import { LOGO_GIF, LOGO_SVG } from '../../../assets/images';

const AuthLayout = props => {
  const { children, isLogin } = props;
  return (
    <div className={!isLogin && 'p-5'}>
      <div className="container content-center">
        <div className="row mid-box ">
          <div className="col col-sm-12 col-md-12 col-lg-7 p-0 ">
            <div className="post" style={{ position: 'fixed', top: 1 }}>
              <div className="">
                <img
                  src={LOGO_GIF}
                  className={isLogin ? 'img-width-login' : 'img-width-signUp'}
                  alt=""
                />
                <div className={isLogin ? 'login-logo' : 'signUp-logo'}>
                  <img className="img-fluid" src={LOGO_SVG} alt="" />
                  <h3 className="login-title">
                    Welcome To Collection
                    <br /> Scanner App
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
