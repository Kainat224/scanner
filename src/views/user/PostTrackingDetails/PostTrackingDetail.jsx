const PostTrackingDetail = props => {
  const { modalOpenClose } = props;
  return (
    <>
      <div className="col-lg-12 pl-4 mt-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            modalOpenClose(true);
          }}
        >
          Post Tracking details
        </button>
      </div>
    </>
  );
};

export default PostTrackingDetail;
