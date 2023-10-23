import fileDownload from 'js-file-download';
import { put } from 'redux-saga/effects';
import { errorHandler, priceRange } from '../../../utils';
import * as actions from '../../actions';
import axiosMain from '../../../http/axios/axios_main';

export function* getDashboardCollectionSaga(action) {
  yield put(actions.getDashboardCollectionStart());
  const { URL } = action.payload;

  yield errorHandler({
    endpoint: `/coin/list?itemsPerPage=10${URL}`,
    successHandler: yield function* (response) {
      yield put(actions.getDashboardCollectionSuccess({ data: response.data, ...action.payload }));
    },
    failHandler: actions.getDashboardCollectionFail,
    apiType: 'get',
  });
}

export function* getWishlistSaga(action) {
  yield put(actions.getWishlistStart());
  const { URL } = action.payload;
  yield errorHandler({
    endpoint: `/coin/wish-list?${URL}`,
    successHandler: yield function* (response) {
      yield put(actions.getWishlistSuccess({ data: response.data, ...action.payload }));
    },
    failHandler: actions.getWishlistFail,
    apiType: 'get',
  });
}

export function* addWishlistSaga(action) {
  yield put(actions.addWishlistStart());
  const { coinId, selectedCoin } = action.payload;
  yield errorHandler({
    endpoint: '/coin/wish-list',
    successHandler: yield function* (response) {
      yield put(actions.addWishlistSuccess(response.data));
    },
    failHandler: actions.addWishlistFail,
    apiType: 'post',
    payload: action.payload,
  });
  if (selectedCoin && coinId) {
    selectedCoin(coinId, 'REMOVE');
  }
}

export function* deleteWishlistSaga(action) {
  yield put(actions.deleteWishlistStart());
  const { data, selectedCoin } = action.payload;
  yield errorHandler({
    endpoint: `/coin/wish-list/${data.id}`,
    successHandler: yield function* () {
      yield put(actions.deleteWishlistSuccess(data));
    },
    failHandler: actions.deleteWishlistFail,
    apiType: 'delete',
  });
  if (selectedCoin) {
    selectedCoin(data.id, 'REMOVE');
  }
}

export function* addCoinSaga(action) {
  yield put(actions.addCoinStart());
  const { data, closeModel, history } = action.payload;
  yield errorHandler({
    endpoint: `/coin`,
    successHandler: yield function* (response) {
      yield put(actions.addCoinSuccess(response.data));
      if (history) {
        history.push(`/scan-result/${response.data._id}`);
      }
      if (closeModel) {
        closeModel();
      }
    },
    failHandler: actions.addCoinFail,
    apiType: 'post',
    payload: data,
  });
}
export function* sellCoinSaga(action) {
  yield put(actions.sellCoinStart());
  const { coinID, history, screen = '', price, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/coin/postForSale/${coinID}`,
    successHandler: yield function* (response) {
      yield put(actions.sellCoinSuccess({ ...response.data, screen, coinID, price }));
      if (history) {
        history.push(`/my-collection`);
      }
      // if (screen === 'MY_COLLECTIONS') {
      //   getData({ isNew: true, skip: 0 });
      // }
      yield put(
        actions.showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
    },
    failHandler: actions.sellCoinFail,
    apiType: 'post',
    payload: { price },
  });
  if (closeModel) {
    closeModel();
  }
}

export function* getCoinDetailsSaga(action) {
  yield put(actions.getCoinDetailsStart());
  yield errorHandler({
    endpoint: `/coin/coin-details/${action.payload}`,
    successHandler: yield function* (response) {
      yield put(actions.getCoinDetailsSuccess(response.data));
    },
    failHandler: actions.getCoinDetailsFail,
    apiType: 'get',
  });
}

// eslint-disable-next-line no-unused-vars
export function* getPortfolioSaga(action) {
  yield put(actions.getPortfolioStart());
  const { URL } = action.payload;
  yield errorHandler({
    endpoint: `/coin/my-portfolio?${URL}`,
    successHandler: yield function* (response) {
      yield put(actions.getPortfolioSuccess({ data: response.data, ...action.payload }));
    },
    failHandler: actions.getPortfolioFail,
    apiType: 'get',
  });
}

export function* getAuctionParticipatedListSaga() {
  yield put(actions.getAuctionParticipatedListStart());

  yield errorHandler({
    endpoint: `/auction/participated`,
    successHandler: yield function* (response) {
      yield put(actions.getAuctionParticipatedListSuccess(response.data));
    },
    failHandler: actions.getAuctionParticipatedListFail,
    apiType: 'get',
  });
}
export function* getAuctionCreatedListSaga() {
  yield put(actions.getAuctionCreatedListStart());

  yield errorHandler({
    endpoint: `/auction/listing`,
    successHandler: yield function* (response) {
      yield put(actions.getAuctionCreatedListSuccess(response.data));
    },
    failHandler: actions.getAuctionCreatedListFail,
    apiType: 'get',
  });
}

export function* addAuctionSaga(action) {
  yield put(actions.addAuctionStart());
  const { data, closeModel, screen, history } = action.payload;
  yield errorHandler({
    endpoint: `/auction/create`,
    successHandler: yield function* (response) {
      if (screen === 'GRADED_COLLECTION') {
        yield put(actions.gradeListSaga());
      }
      yield put(
        actions.addAuctionSuccess({
          ...response.data,
          screen,
          coinId: data.coinId,
          price: data.amount,
        }),
      );
      closeModel();
      if (history) {
        history.push('/my-collection');
      }
      yield put(
        actions.showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
    },
    failHandler: yield function* (response) {
      yield put(actions.addAuctionFail(response));
      closeModel();
      yield put(
        actions.showModal({
          open: true,
          notifyType: 1,
          message: response,
        }),
      );
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
    payload: data,
  });
}

export function* addBidSaga(action) {
  yield put(actions.addBidStart());
  const { data, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/auction/bid-on-coin`,
    successHandler: yield function* (response) {
      yield put(actions.addBidSuccess(response.data));

      yield put(
        actions.showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
    },
    failHandler: actions.addBidFail,
    apiType: 'post',
    payload: data,
  });
  closeModel();
}

export function* getBidSaga(action) {
  yield put(actions.getBidStart());
  const { actionId, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/auction/${actionId}/bid-listing`,
    successHandler: yield function* (response) {
      yield put(actions.getBidSuccess(response.data));
      closeModel();
    },
    failHandler: actions.getBidFail,
    apiType: 'get',
  });
}

export function* addCoinClassifySaga(action) {
  yield put(actions.addCoinClassifyStart());
  const { data, setOpenModelOnSubmit } = action.payload;
  yield errorHandler({
    endpoint: `/coin/classify-coin`,
    successHandler: yield function* (response) {
      const range = priceRange(
        response.data.mlMetadata.mlResponse.Price.split('$').join('') || '0',
      );
      yield put(actions.addCoinClassifySuccess({ response, range }));
      if (setOpenModelOnSubmit) {
        setOpenModelOnSubmit(true);
      }
    },
    failHandler: actions.addCoinClassifyFail,
    apiType: 'post',
    payload: data,
  });
}

export function* deleteCollectionSaga(action) {
  yield put(actions.deleteCollectionStart());
  const { data } = action.payload;
  yield errorHandler({
    endpoint: `/coin/delete/${data.id}`,
    successHandler: yield function* (response) {
      yield put(actions.deleteCollectionSuccess(data));
      yield put(
        actions.showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
    },
    failHandler: actions.deleteCollectionFail,
    apiType: 'delete',
  });
}

export function* coinGradeSaga(action) {
  yield put(actions.coinGradeStart());
  const { history, coinId, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/coin/coin-grade`,
    successHandler: yield function* (response) {
      yield put(actions.coinGradeSuccess(response.data));
      if (closeModel) {
        closeModel();
      }
      history.push(`/grading-details/${coinId}`);
    },
    failHandler: yield function* (response) {
      yield put(actions.coinGradeFail(response));
      yield put(
        actions.showModal({
          open: true,
          notifyType: 1,
          message: response,
        }),
      );
    },
    apiType: 'post',
    payload: { coinId },
  });
}

export function* bankNoteGradeSaga(action) {
  yield put(actions.bankNoteGradeStart());
  const { history, coinId, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/banknote/grade`,
    successHandler: yield function* (response) {
      yield put(actions.bankNoteGradeSuccess(response.data));
      if (closeModel) {
        closeModel();
      }
      history.push(`/grading-details/${coinId}`);
    },
    failHandler: yield function* (response) {
      yield put(actions.bankNoteGradeFail(response));
      yield put(
        actions.showModal({
          open: true,
          notifyType: 1,
          message: response,
        }),
      );
    },
    apiType: 'post',
    payload: { noteId: coinId },
  });
}

export function* gradeListSaga() {
  yield put(actions.gradeListStart());
  yield errorHandler({
    endpoint: `/coin/getGradeCoinList`,
    successHandler: yield function* (response) {
      yield put(actions.gradeListSuccess(response.data));
    },
    failHandler: actions.gradeListFail,
    apiType: 'get',
  });
}

export function* awardAuctionSaga(action) {
  yield put(actions.awardAuctionStart());
  yield errorHandler({
    endpoint: `/auction/award-buyer`,
    successHandler: yield function* (response) {
      yield put(actions.awardAuctionSuccess(response.data));
      yield put(
        actions.showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
          redirectURL: '/dashboard',
        }),
      );
    },
    failHandler: actions.awardAuctionFail,
    apiType: 'post',
    payload: action.payload,
  });
}

export function* getGradeReportSaga(action) {
  yield put(actions.getGradeReportStart());
  const { coinId } = action.payload;
  const response = yield axiosMain.get(`/coin/generateGradingReport/${coinId}`, {
    responseType: 'blob',
  });
  if (response && response.status === 200 && response.data) {
    fileDownload(response.data, 'gradingReport.pdf');
    yield put(actions.getGradeReportSuccess());
  } else {
    yield put(actions.getGradeReportFail());
  }
  // yield errorHandler({
  //   endpoint: `/coin/generateGradingReport/${coinId}`,
  //   successHandler: yield function* (response) {
  //     fileDownload(response.data, 'gradingReport.pdf');
  //     yield put(actions.getGradeReportSuccess());
  //   },
  //   failHandler: actions.getGradeReportFail,
  //   responseType: 'blob',
  //   apiType: 'get',
  // });
}
export function* classifyBankNoteSaga(action) {
  yield put(actions.classifyBankNoteStart());
  const { data, setOpenModelOnSubmit } = action.payload;
  yield errorHandler({
    endpoint: `/banknote/classify`,
    successHandler: yield function* (response) {
      const range = priceRange(
        response.data.mlMetadata.mlResponse.Price.split('$').join('') || '0',
      );
      yield put(actions.classifyBankNoteSuccess({ response, range }));
      if (setOpenModelOnSubmit) {
        setOpenModelOnSubmit(true);
      }
    },
    failHandler: actions.classifyBankNoteFail,
    apiType: 'post',
    payload: data,
  });
}

export function* createBankNoteSaga(action) {
  yield put(actions.createBankNoteStart());
  const { data, closeModel, history } = action.payload;
  yield errorHandler({
    endpoint: `/banknote`,
    successHandler: yield function* (response) {
      yield put(actions.createBankNoteSuccess(response.data));
      if (history) {
        history.push(`/scan-result/${response.data._id}`);
      }
      if (closeModel) {
        closeModel();
      }
    },
    failHandler: actions.createBankNoteFail,
    apiType: 'post',
    payload: data,
  });
}

export function* sellBankNoteSaga(action) {
  yield put(actions.sellBankNoteStart());
  const { coinID, history, screen = '' } = action.payload;
  yield errorHandler({
    endpoint: `/coin/postForSale/${coinID}`,
    successHandler: yield function* (response) {
      yield put(actions.sellBankNoteSuccess({ ...response.data, screen, coinID }));
      if (history) {
        history.push(`/my-collection`);
      }
      yield put(
        actions.showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
    },
    failHandler: actions.sellBankNoteFail,
    apiType: 'post',
    payload: {},
  });
}
