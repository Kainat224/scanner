const HeaderTitle = props => (
  // <div className="sub-header bg-light-blue">
  <div className={`sub-header ${props.screen ? 'bg-light-blue-not-auth' : 'bg-light-blue'}`}>
    <div className="container">
      <div className="row">
        <div className="py-2 col">
          <p className="txt-blue">{props.title}</p>
        </div>
      </div>
    </div>
  </div>
);

export default HeaderTitle;
