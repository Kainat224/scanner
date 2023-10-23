import { useRef } from 'react';


const ScanView = ({img,border,setTempImageHandler,setTempImageFrontHandler,setTempImageBackHandler
,images,handleSubmit}) => {
    const fileUploadRef = useRef();
    
  return (
   <section className="main-wrapper top-60" id="product">
    <div className="container">
      <div className="home-row-wrapper">
        <div className="row justify-content-center">
          <div className={`col-md-12 ${border ? ' col-lg-12 ' : ' col-lg-8'}`}>
            <div className="row align-items-center ">
              <div className="col-md-12 col-lg-6 text-center">
                <input
                  className="hide"
                  ref={fileUploadRef}
                  type="file"
                  accept="image/*"
                  onChange={(e)=>setTempImageHandler(e)}
                />
                <h6 className=" home-title text-center title-1">Front view</h6>
                <div className={border && 'coin-upload-section'} >
                <div className={border && 'coin-upload-box'} >
                  <img
                    src={images.front ? URL.createObjectURL(images.front) : img}
                    alt="Front"
                    style={{ maxWidth: 300 }}
                  />
                  </div>
                </div>
                <button
                  type="button"
                  className="width-200  btn btn-primary mt-4"
                  onClick={() => {
                    setTempImageFrontHandler();
                    fileUploadRef.current.click();
                  }}
                >
                  {images.front === null ? 'Upload' : 'Change'}
                </button>
              </div>
              <div className="col-md-12 col-lg-6  text-center">
                <h6 className=" home-title text-center title-1">Back view</h6>
                <div className={border && 'coin-upload-section'}>
                      <div className={border && 'coin-upload-box'}>
                <img
                  src={images.back ? URL.createObjectURL(images.back) : img}
                  style={{maxWidth: 300 }}
                  alt="Back"
                />
                </div>
                </div>
                <button
                  type="button"
                  disabled={images.front === null}
                  className="width-200  btn btn-primary mt-4"
                  onClick={() => {
                    setTempImageBackHandler();
                    fileUploadRef.current.click();
                  }}
                >
                  {images.back === null ? 'Upload' : 'Change'}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <button
              type="button"
              className=" btn btn-primary width-200 mt-4  "
              disabled={images.front === null || images.back === null}
              onClick={() => {
               handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
        
    
  )
}

export default ScanView
