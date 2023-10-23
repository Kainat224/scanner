import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actionLabels from '../actionLabels';
import {
  loginSaga,
  logoutSaga,
  authenticationValidatorSaga,
  otpVerifySaga,
  forgotPasswordSaga,
  signupSaga,
  otpResendSaga,
  getUserDetailSaga,
  createPasswordSaga,
  editUserDetailSaga,
  updateProfilePicSaga,
  changePasswordSaga,
  postQuerySaga,
  buyVIPMembershipSaga,
  uploadKycSaga,
} from './auth/auth';
import {
  getWishlistSaga,
  getCoinDetailsSaga,
  getPortfolioSaga,
  addAuctionSaga,
  getDashboardCollectionSaga,
  addWishlistSaga,
  deleteWishlistSaga,
  addBidSaga,
  getBidSaga,
  addCoinClassifySaga,
  addCoinSaga,
  deleteCollectionSaga,
  coinGradeSaga,
  bankNoteGradeSaga,
  gradeListSaga,
  awardAuctionSaga,
  getGradeReportSaga,
  sellCoinSaga,
  classifyBankNoteSaga,
  createBankNoteSaga,
  sellBankNoteSaga,
  getAuctionParticipatedListSaga,
  getAuctionCreatedListSaga,
} from './collection/collection';
import {
  giveReviewRatingSaga,
  getOrderBoughtSaga,
  getOrderSoldSaga,
  getOrderDetailSaga,
  postTrackingDetailSaga,
} from './order/order';
import {
  addAddressSaga,
  deleteAddressSaga,
  editAddressSaga,
  getAddressSaga,
  getCountrySaga,
  setPrimaryAddressSaga,
  getNotificationSaga,
  getCmsSaga,
} from './profile/profile';

import {
  getConversationSaga,
  getConversationMessageSaga,
  createConversationSaga,
  createConversationMessageSaga,
  addNotificationSaga,
} from './conversation/conversation';

import {
  buyCreditSaga,
  buyCollectionSaga,
  validatePaymentSaga,
  paymentHistorySaga,
} from './payment/payment';

export function* watchAuthentication() {
  yield all([
    takeLatest(actionLabels.LOGIN_SAGA, loginSaga),
    takeLatest(actionLabels.SIGNUP_SAGA, signupSaga),
    takeLatest(actionLabels.OTP_VERIFY_SAGA, otpVerifySaga),
    takeLatest(actionLabels.OTP_RESEND_SAGA, otpResendSaga),
    takeLatest(actionLabels.FORGOT_PASSWORD_SAGA, forgotPasswordSaga),
    takeLatest(actionLabels.LOGOUT_SAGA, logoutSaga),
    takeLatest(actionLabels.AUTHENTICATION_VALIDATOR, authenticationValidatorSaga),
    takeLatest(actionLabels.GET_USER_DETAIL_SAGA, getUserDetailSaga),
    takeLatest(actionLabels.EDIT_USER_DETAIL_SAGA, editUserDetailSaga),
    takeLatest(actionLabels.CREATE_PASSWORD_SAGA, createPasswordSaga),
    takeLatest(actionLabels.UPDATE_PROFILE_PIC_SAGA, updateProfilePicSaga),
    takeLatest(actionLabels.CHANGE_PASSWORD_SAGA, changePasswordSaga),
    takeLatest(actionLabels.GET_ADDRESS_SAGA, getAddressSaga),
    takeLatest(actionLabels.POST_QUERY_SAGA, postQuerySaga),
    takeLatest(actionLabels.BUY_VIP_MEMBERSHIP_SAGA, buyVIPMembershipSaga),
    takeLatest(actionLabels.UPLOAD_KYC_SAGA, uploadKycSaga),
  ]);
}

export function* watchCollection() {
  yield all([
    takeLatest(actionLabels.GET_DASHBOARD_COLLECTION_SAGA, getDashboardCollectionSaga),
    takeLatest(actionLabels.GET_WISHLIST_SAGA, getWishlistSaga),
    takeEvery(actionLabels.ADD_WISHLIST_SAGA, addWishlistSaga),
    takeEvery(actionLabels.DELETE_WISHLIST_SAGA, deleteWishlistSaga),
    takeLatest(actionLabels.GET_COIN_DETAILS_SAGA, getCoinDetailsSaga),
    takeLatest(actionLabels.GET_PORTFOLIO_SAGA, getPortfolioSaga),
    takeLatest(actionLabels.GET_AUCTION_PARTICIPATED_LIST_SAGA, getAuctionParticipatedListSaga),
    takeLatest(actionLabels.GET_AUCTION_CREATED_LIST_SAGA, getAuctionCreatedListSaga),
    takeLatest(actionLabels.ADD_AUCTION_SAGA, addAuctionSaga),
    takeLatest(actionLabels.ADD_BID_SAGA, addBidSaga),
    takeLatest(actionLabels.GET_BID_SAGA, getBidSaga),
    takeLatest(actionLabels.ADD_COIN_CLASSIFY_SAGA, addCoinClassifySaga),
    takeLatest(actionLabels.ADD_COIN_SAGA, addCoinSaga),
    takeLatest(actionLabels.SELL_COIN_SAGA, sellCoinSaga),
    takeLatest(actionLabels.DELETE_COLLECTION_SAGA, deleteCollectionSaga),
    takeLatest(actionLabels.COIN_GRADE_SAGA, coinGradeSaga),
    takeLatest(actionLabels.BANK_NOTE_GRADE_SAGA, bankNoteGradeSaga),
    takeLatest(actionLabels.GRADE_LIST_SAGA, gradeListSaga),
    takeLatest(actionLabels.AWARD_AUCTION_SAGA, awardAuctionSaga),
    takeLatest(actionLabels.GET_GRADE_REPORT_SAGA, getGradeReportSaga),
    takeLatest(actionLabels.CLASSIFY_BANK_NOTE_SAGA, classifyBankNoteSaga),
    takeLatest(actionLabels.CREATE_BANK_NOTE_SAGA, createBankNoteSaga),
    takeLatest(actionLabels.SELL_BANK_NOTE_SAGA, sellBankNoteSaga),
  ]);
}

export function* watchProfile() {
  yield all([
    // takeLatest(actionLabels.GET_ADDRESS_SAGA, getAddressSaga),
    takeLatest(actionLabels.ADD_ADDRESS_SAGA, addAddressSaga),
    takeLatest(actionLabels.EDIT_ADDRESS_SAGA, editAddressSaga),
    takeLatest(actionLabels.DELETE_ADDRESS_SAGA, deleteAddressSaga),
    takeLatest(actionLabels.GET_COUNTRY_SAGA, getCountrySaga),
    takeLatest(actionLabels.SET_PRIMARY_ADDRESS_SAGA, setPrimaryAddressSaga),
    takeLatest(actionLabels.GET_NOTIFICATION_SAGA, getNotificationSaga),
    takeLatest(actionLabels.GET_CMS_SAGA, getCmsSaga),
  ]);
}

export function* watchOrder() {
  yield all([
    takeLatest(actionLabels.GIVE_REVIEW_AND_RATING_SAGA, giveReviewRatingSaga),
    takeLatest(actionLabels.GET_ORDER_SOLD_SAGA, getOrderSoldSaga),
    takeLatest(actionLabels.GET_ORDER_BOUGHT_SAGA, getOrderBoughtSaga),
    takeLatest(actionLabels.GET_ORDER_DETAIL_SAGA, getOrderDetailSaga),
    takeLatest(actionLabels.POST_TRACKING_DETAILS_SAGA, postTrackingDetailSaga),
  ]);
}

export function* watchConversation() {
  yield all([
    takeLatest(actionLabels.GET_CONVERSATION_SAGA, getConversationSaga),
    takeLatest(actionLabels.GET_CONVERSATION_MESSAGE_SAGA, getConversationMessageSaga),
    takeLatest(actionLabels.CREATE_CONVERSATION_SAGA, createConversationSaga),
    takeLatest(actionLabels.CREATE_CONVERSATION_MESSAGE_SAGA, createConversationMessageSaga),
    takeLatest(actionLabels.CREATE_NOTIFICATION_SAGA, addNotificationSaga),
  ]);
}

export function* watchCredit() {
  yield all([
    takeLatest(actionLabels.BUY_CREDIT_SAGA, buyCreditSaga),
    takeLatest(actionLabels.BUY_COLLECTION_SAGA, buyCollectionSaga),
    takeLatest(actionLabels.VALIDATE_PAYMENT_SAGA, validatePaymentSaga),
    takeLatest(actionLabels.PAYMENT_HISTORY_SAGA, paymentHistorySaga),
    // takeLatest(actionLabels.APPLY_GRADING_SAGA, applyGradingSaga),
  ]);
}
