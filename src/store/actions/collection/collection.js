import * as actionLabels from '../../actionLabels';

export const getDashboardCollectionStart = payload => ({
  type: actionLabels.GET_DASHBOARD_COLLECTION_START,
  payload,
});

export const getDashboardCollectionSaga = payload => ({
  type: actionLabels.GET_DASHBOARD_COLLECTION_SAGA,
  payload,
});

export const getDashboardCollectionSuccess = payload => ({
  type: actionLabels.GET_DASHBOARD_COLLECTION_SUCCESS,
  payload,
});

export const getDashboardCollectionFail = payload => ({
  type: actionLabels.GET_DASHBOARD_COLLECTION_FAIL,
  payload,
});

export const setResultSearchText = payload => ({
  type: actionLabels.SET_RESULT_SEARCH_TEXT,
  payload,
});

export const getWishlistStart = payload => ({
  type: actionLabels.GET_WISHLIST_START,
  payload,
});

export const getWishlistSaga = payload => ({
  type: actionLabels.GET_WISHLIST_SAGA,
  payload,
});

export const getWishlistSuccess = payload => ({
  type: actionLabels.GET_WISHLIST_SUCCESS,
  payload,
});

export const getWishlistFail = payload => ({
  type: actionLabels.GET_WISHLIST_FAIL,
  payload,
});

export const addWishlistStart = payload => ({
  type: actionLabels.ADD_WISHLIST_START,
  payload,
});

export const addWishlistSaga = payload => ({
  type: actionLabels.ADD_WISHLIST_SAGA,
  payload,
});

export const addWishlistSuccess = payload => ({
  type: actionLabels.ADD_WISHLIST_SUCCESS,
  payload,
});

export const addWishlistFail = payload => ({
  type: actionLabels.ADD_WISHLIST_FAIL,
  payload,
});

export const resetWishList = () => ({
  type: actionLabels.RESET_WISHLIST,
});

export const deleteWishlistStart = payload => ({
  type: actionLabels.DELETE_WISHLIST_START,
  payload,
});

export const deleteWishlistSaga = payload => ({
  type: actionLabels.DELETE_WISHLIST_SAGA,
  payload,
});

export const deleteWishlistSuccess = payload => ({
  type: actionLabels.DELETE_WISHLIST_SUCCESS,
  payload,
});

export const deleteWishlistFail = payload => ({
  type: actionLabels.DELETE_WISHLIST_FAIL,
  payload,
});

export const addCoinStart = payload => ({
  type: actionLabels.ADD_COIN_START,
  payload,
});

export const addCoinSaga = payload => ({
  type: actionLabels.ADD_COIN_SAGA,
  payload,
});

export const addCoinSuccess = payload => ({
  type: actionLabels.ADD_COIN_SUCCESS,
  payload,
});

export const addCoinFail = payload => ({
  type: actionLabels.ADD_COIN_FAIL,
  payload,
});

export const sellCoinStart = payload => ({
  type: actionLabels.SELL_COIN_START,
  payload,
});

export const sellCoinSaga = payload => ({
  type: actionLabels.SELL_COIN_SAGA,
  payload,
});

export const sellCoinSuccess = payload => ({
  type: actionLabels.SELL_COIN_SUCCESS,
  payload,
});

export const sellCoinFail = payload => ({
  type: actionLabels.SELL_COIN_FAIL,
  payload,
});

export const getCoinDetailsStart = payload => ({
  type: actionLabels.GET_COIN_DETAILS_START,
  payload,
});

export const getCoinDetailsSaga = payload => ({
  type: actionLabels.GET_COIN_DETAILS_SAGA,
  payload,
});

export const getCoinDetailsSuccess = payload => ({
  type: actionLabels.GET_COIN_DETAILS_SUCCESS,
  payload,
});

export const getCoinDetailsFail = payload => ({
  type: actionLabels.GET_COIN_DETAILS_FAIL,
  payload,
});

export const resetCoinDetails = () => ({
  type: actionLabels.RESET_COIN_DETAILS,
});

export const getPortfolioStart = payload => ({
  type: actionLabels.GET_PORTFOLIO_START,
  payload,
});

export const getPortfolioSaga = payload => ({
  type: actionLabels.GET_PORTFOLIO_SAGA,
  payload,
});

export const getPortfolioSuccess = payload => ({
  type: actionLabels.GET_PORTFOLIO_SUCCESS,
  payload,
});

export const getPortfolioFail = payload => ({
  type: actionLabels.GET_PORTFOLIO_FAIL,
  payload,
});

export const resetPortfolio = payload => ({
  type: actionLabels.RESET_PORTFOLIO,
  payload,
});

export const getAuctionParticipatedListStart = payload => ({
  type: actionLabels.GET_AUCTION_PARTICIPATED_LIST_START,
  payload,
});

export const getAuctionParticipatedListSaga = payload => ({
  type: actionLabels.GET_AUCTION_PARTICIPATED_LIST_SAGA,
  payload,
});

export const getAuctionParticipatedListSuccess = payload => ({
  type: actionLabels.GET_AUCTION_PARTICIPATED_LIST_SUCCESS,
  payload,
});

export const getAuctionParticipatedListFail = payload => ({
  type: actionLabels.GET_AUCTION_PARTICIPATED_LIST_FAIL,
  payload,
});
export const getAuctionCreatedListStart = payload => ({
  type: actionLabels.GET_AUCTION_CREATED_LIST_START,
  payload,
});

export const getAuctionCreatedListSaga = payload => ({
  type: actionLabels.GET_AUCTION_CREATED_LIST_SAGA,
  payload,
});

export const getAuctionCreatedListSuccess = payload => ({
  type: actionLabels.GET_AUCTION_CREATED_LIST_SUCCESS,
  payload,
});

export const getAuctionCreatedListFail = payload => ({
  type: actionLabels.GET_AUCTION_CREATED_LIST_FAIL,
  payload,
});

export const addAuctionStart = payload => ({
  type: actionLabels.ADD_AUCTION_START,
  payload,
});

export const addAuctionSaga = payload => ({
  type: actionLabels.ADD_AUCTION_SAGA,
  payload,
});

export const addAuctionSuccess = payload => ({
  type: actionLabels.ADD_AUCTION_SUCCESS,
  payload,
});

export const addAuctionFail = payload => ({
  type: actionLabels.ADD_AUCTION_FAIL,
  payload,
});

export const addBidStart = payload => ({
  type: actionLabels.ADD_BID_START,
  payload,
});

export const addBidSaga = payload => ({
  type: actionLabels.ADD_BID_SAGA,
  payload,
});

export const addBidSuccess = payload => ({
  type: actionLabels.ADD_BID_SUCCESS,
  payload,
});

export const addBidFail = payload => ({
  type: actionLabels.ADD_BID_FAIL,
  payload,
});

export const getBidStart = payload => ({
  type: actionLabels.GET_BID_START,
  payload,
});

export const getBidSaga = payload => ({
  type: actionLabels.GET_BID_SAGA,
  payload,
});

export const getBidSuccess = payload => ({
  type: actionLabels.GET_BID_SUCCESS,
  payload,
});

export const getBidFail = payload => ({
  type: actionLabels.GET_BID_FAIL,
  payload,
});

export const resetCollection = payload => ({
  type: actionLabels.RESET_COLLECTION,
  payload,
});

export const addCoinClassifyStart = payload => ({
  type: actionLabels.ADD_COIN_CLASSIFY_START,
  payload,
});
export const addCoinClassifySaga = payload => ({
  type: actionLabels.ADD_COIN_CLASSIFY_SAGA,
  payload,
});
export const addCoinClassifySuccess = payload => ({
  type: actionLabels.ADD_COIN_CLASSIFY_SUCCESS,
  payload,
});
export const addCoinClassifyFail = payload => ({
  type: actionLabels.ADD_COIN_CLASSIFY_FAIL,
  payload,
});

export const deleteCollectionStart = payload => ({
  type: actionLabels.DELETE_COLLECTION_START,
  payload,
});

export const deleteCollectionSaga = payload => ({
  type: actionLabels.DELETE_COLLECTION_SAGA,
  payload,
});

export const deleteCollectionSuccess = payload => ({
  type: actionLabels.DELETE_COLLECTION_SUCCESS,
  payload,
});

export const deleteCollectionFail = payload => ({
  type: actionLabels.DELETE_COLLECTION_FAIL,
  payload,
});

export const coinGradeStart = payload => ({
  type: actionLabels.COIN_GRADE_START,
  payload,
});

export const coinGradeSaga = payload => ({
  type: actionLabels.COIN_GRADE_SAGA,
  payload,
});

export const coinGradeSuccess = payload => ({
  type: actionLabels.COIN_GRADE_SUCCESS,
  payload,
});

export const coinGradeFail = payload => ({
  type: actionLabels.COIN_GRADE_FAIL,
  payload,
});

export const bankNoteGradeStart = payload => ({
  type: actionLabels.BANK_NOTE_GRADE_START,
  payload,
});

export const bankNoteGradeSaga = payload => ({
  type: actionLabels.BANK_NOTE_GRADE_SAGA,
  payload,
});

export const bankNoteGradeSuccess = payload => ({
  type: actionLabels.BANK_NOTE_GRADE_SUCCESS,
  payload,
});

export const bankNoteGradeFail = payload => ({
  type: actionLabels.BANK_NOTE_GRADE_FAIL,
  payload,
});

export const gradeListStart = payload => ({
  type: actionLabels.GRADE_LIST_START,
  payload,
});

export const gradeListSaga = payload => ({
  type: actionLabels.GRADE_LIST_SAGA,
  payload,
});

export const gradeListSuccess = payload => ({
  type: actionLabels.GRADE_LIST_SUCCESS,
  payload,
});

export const gradeListFail = payload => ({
  type: actionLabels.GRADE_LIST_FAIL,
  payload,
});

export const awardAuctionStart = payload => ({
  type: actionLabels.AWARD_AUCTION_START,
  payload,
});

export const awardAuctionSaga = payload => ({
  type: actionLabels.AWARD_AUCTION_SAGA,
  payload,
});

export const awardAuctionSuccess = payload => ({
  type: actionLabels.AWARD_AUCTION_SUCCESS,
  payload,
});

export const awardAuctionFail = payload => ({
  type: actionLabels.AWARD_AUCTION_FAIL,
  payload,
});
export const getGradeReportStart = payload => ({
  type: actionLabels.GET_GRADE_REPORT_START,
  payload,
});

export const getGradeReportSaga = payload => ({
  type: actionLabels.GET_GRADE_REPORT_SAGA,
  payload,
});

export const getGradeReportSuccess = payload => ({
  type: actionLabels.GET_GRADE_REPORT_SUCCESS,
  payload,
});

export const getGradeReportFail = payload => ({
  type: actionLabels.GET_GRADE_REPORT_FAIL,
  payload,
});

export const classifyBankNoteStart = payload => ({
  type: actionLabels.CLASSIFY_BANK_NOTE_START,
  payload,
});

export const classifyBankNoteSaga = payload => ({
  type: actionLabels.CLASSIFY_BANK_NOTE_SAGA,
  payload,
});

export const classifyBankNoteSuccess = payload => ({
  type: actionLabels.CLASSIFY_BANK_NOTE_SUCCESS,
  payload,
});

export const classifyBankNoteFail = payload => ({
  type: actionLabels.CLASSIFY_BANK_NOTE_FAIL,
  payload,
});

export const createBankNoteStart = payload => ({
  type: actionLabels.CREATE_BANK_NOTE_START,
  payload,
});

export const createBankNoteSaga = payload => ({
  type: actionLabels.CREATE_BANK_NOTE_SAGA,
  payload,
});

export const createBankNoteSuccess = payload => ({
  type: actionLabels.CREATE_BANK_NOTE_SUCCESS,
  payload,
});

export const createBankNoteFail = payload => ({
  type: actionLabels.CREATE_BANK_NOTE_FAIL,
  payload,
});

export const sellBankNoteStart = payload => ({
  type: actionLabels.SELL_BANK_NOTE_START,
  payload,
});

export const sellBankNoteSaga = payload => ({
  type: actionLabels.SELL_BANK_NOTE_SAGA,
  payload,
});

export const sellBankNoteSuccess = payload => ({
  type: actionLabels.SELL_BANK_NOTE_SUCCESS,
  payload,
});

export const sellBankNoteFail = payload => ({
  type: actionLabels.SELL_BANK_NOTE_FAIL,
  payload,
});
