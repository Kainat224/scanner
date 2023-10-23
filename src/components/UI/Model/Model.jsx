import React from 'react';

const Model = props => {
  const {
    headerTitle,
    children,
    // submitBtnText,
    // submitBtnHandler,
    // cancelBtnText,
    // cancelBtnHandler,
    closeModel,
    modalId,
    modalClass,
    errorMsg,
    successMsg,
    isDisable,
    FooterComponent,
    footerModalClass,
  } = props;

  return (
    <>
      <div
        className="modal fade show"
        id={modalId || ''}
        tabIndex="-1"
        role="dialog"
        aria-labelledby=""
        aria-hidden="true"
        style={{ display: 'block', paddingRight: 5, zIndex: 1041 }}
      >
        <div className={`modal-dialog ${modalClass || ''} modal-dialog-centered`} role="document">
          <div className="modal-content animated fadeInDownBig p-4">
            <div className="modal-header">
              {(headerTitle !== undefined || headerTitle != null || headerTitle !== '') && (
                <h5 className="modal-title text-center w-100" id="">
                  {headerTitle}
                </h5>
              )}
              <button type="button" className="close" disabled={isDisable} onClick={closeModel}>
                <span aria-hidden="true" style={{ color: '#fff' }}>
                  &times;
                </span>
              </button>
            </div>
            {children}
            <div className={`modal-footer d-flex flex-column ${footerModalClass || ''}`}>
              {FooterComponent && <FooterComponent />}
            </div>
            <div className="error-message text-center">{errorMsg}</div>
            <div className="success-message text-center">{successMsg}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

export default Model;
