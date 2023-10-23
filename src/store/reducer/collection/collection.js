/* eslint-disable no-param-reassign */
/* eslint-disable import/no-anonymous-default-export */
import * as actionLabels from '../../actionLabels';

export const initialState = {
  collectionDetails: null,
  myCollections: null,
  dashboardCollections: null,
  resultSearchText: '',
  wishlist: null,
  auctionList: null,
  auctionCreatedList: null,
  bidListing: null,
  errMsg: '',
  graderResult: '',
  gradeList: [],
  isLoading: false,
  myCollectionsLoding: false,
  scanResult: null,
  addCoinData: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.GET_DASHBOARD_COLLECTION_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_DASHBOARD_COLLECTION_SUCCESS: {
      const { dashboardCollections } = state;
      return {
        ...state,
        dashboardCollections: payload.isNew
          ? payload.data
          : {
              list: [...dashboardCollections.list, ...payload.data.list],
              totalItems: payload.data.totalItems,
            },
        isLoading: false,
      };
    }
    case actionLabels.GET_DASHBOARD_COLLECTION_FAIL:
      return {
        ...state,
        errMsg: payload,
        dashboardCollections: [],
        isLoading: false,
      };
    case actionLabels.SET_RESULT_SEARCH_TEXT:
      return {
        ...state,
        resultSearchText: payload,
        isLoading: false,
      };
    case actionLabels.GET_WISHLIST_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_WISHLIST_SUCCESS: {
      const { wishlist } = state;
      return {
        ...state,
        wishlist: payload.isNew
          ? payload.data
          : {
              list: [...wishlist.list, ...payload.data.list],
              totalRecords: payload.data.totalRecords,
            },
        isLoading: false,
      };
    }
    case actionLabels.GET_WISHLIST_FAIL:
      return {
        ...state,
        errMsg: payload,
        wishlist: [],
        isLoading: false,
      };
    case actionLabels.RESET_WISHLIST:
      return {
        ...state,
        wishlist: null,
        isLoading: false,
      };
    case actionLabels.ADD_WISHLIST_START:
      return { ...state, isLoading: true };
    case actionLabels.ADD_WISHLIST_SUCCESS: {
      const { dashboardCollections, collectionDetails } = state;
      if (dashboardCollections && dashboardCollections.list) {
        const index = dashboardCollections.list.findIndex(item => item._id === payload.coinId);
        if (index !== -1 && dashboardCollections.list.length > index) {
          dashboardCollections.list[index].isWishlist = true;
        }
      }
      if (collectionDetails && collectionDetails._id === payload.coinId) {
        collectionDetails.inWishList = true;
      }
      return {
        ...state,
        // wishlist: payload,
        isLoading: false,
      };
    }
    case actionLabels.ADD_WISHLIST_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.DELETE_WISHLIST_START:
      return { ...state, isLoading: true };
    case actionLabels.DELETE_WISHLIST_SUCCESS: {
      // const newWishList = state.wishlist.list.filter(data => data.coinId !== payload.id);

      // const totalRecords = newWishList.length - 1;
      // return {
      //   ...state,
      //   wishlist: {
      //     list: newWishList,
      //     totalRecords,
      //   },
      // };
      const { dashboardCollections, collectionDetails, wishlist } = state;
      if (dashboardCollections && dashboardCollections.list) {
        const index = dashboardCollections.list.findIndex(item => item._id === payload.id);
        if (index !== -1 && dashboardCollections.list.length > index) {
          dashboardCollections.list[index].isWishlist = false;
        }
      }
      if (collectionDetails && collectionDetails._id === payload.id) {
        collectionDetails.inWishList = false;
      }
      const newWishList = wishlist && wishlist.list.filter(data => data.coinId !== payload.id);
      const totalRecords = wishlist && wishlist.totalRecords - 1;

      return {
        ...state,
        wishlist: {
          list: newWishList,
          totalRecords,
        },
        isLoading: false,
      };
    }
    case actionLabels.DELETE_WISHLIST_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.ADD_COIN_START:
      return { ...state, isLoading: true };
    case actionLabels.ADD_COIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addCoinData: payload,
      };
    case actionLabels.ADD_COIN_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.SELL_COIN_START:
      return { ...state, isLoading: true };
    case actionLabels.SELL_COIN_SUCCESS:
      if (payload.screen === 'MY_COLLECTIONS') {
        return {
          ...state,
          isLoading: false,
          myCollections: {
            ...state.myCollections,
            list: state.myCollections.list.map(item => {
              if (item._id === payload.coinID) {
                item.isPostedforSale = true;
                item.marketPlaceState = 'ON_SALE';
                item.price = payload.price;
              }
              return item;
            }),
          },
        };
      }
      if (payload.screen === 'COLLLECTION_DETAILS') {
        return {
          ...state,
          isLoading: false,
          collectionDetails: {
            ...state.collectionDetails,
            isPostedforSale: true,
            marketPlaceState: 'ON_SALE',
            price: payload.price,
          },
        };
      }
      return {
        ...state,
        isLoading: false,
      };
    case actionLabels.SELL_COIN_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.GET_COIN_DETAILS_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_COIN_DETAILS_SUCCESS:
      return {
        ...state,
        collectionDetails: payload,
        isLoading: false,
      };
    case actionLabels.GET_COIN_DETAILS_FAIL:
      return {
        ...state,
        collectionDetails: { isSold: true },
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.RESET_COIN_DETAILS:
      return {
        ...state,
        collectionDetails: null,
      };
    case actionLabels.GET_PORTFOLIO_START:
      return { ...state, myCollectionsLoding: true };
    case actionLabels.GET_PORTFOLIO_SUCCESS: {
      const { myCollections } = state;
      return {
        ...state,
        myCollections: payload.isNew
          ? payload.data
          : {
              list: [...myCollections.list, ...payload.data.list],
              totalRecords: payload.data.totalRecords,
            },
        myCollectionsLoding: false,
      };
    }
    case actionLabels.GET_PORTFOLIO_FAIL:
      return {
        ...state,
        myCollections: [],
        errMsg: payload,
        myCollectionsLoding: false,
      };
    case actionLabels.RESET_PORTFOLIO:
      return {
        ...state,
        myCollections: null,
      };
    case actionLabels.GET_AUCTION_PARTICIPATED_LIST_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_AUCTION_PARTICIPATED_LIST_SUCCESS:
      return {
        ...state,
        auctionList: payload,
        isLoading: false,
      };
    case actionLabels.GET_AUCTION_PARTICIPATED_LIST_FAIL:
      return {
        ...state,
        auctionList: [],
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.GET_AUCTION_CREATED_LIST_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_AUCTION_CREATED_LIST_SUCCESS:
      return {
        ...state,
        auctionCreatedList: payload,
        isLoading: false,
      };
    case actionLabels.GET_AUCTION_CREATED_LIST_FAIL:
      return {
        ...state,
        auctionCreatedList: [],
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.ADD_AUCTION_START:
      return { ...state, isLoading: true };
    case actionLabels.ADD_AUCTION_SUCCESS:
      if (payload.screen === 'MY_COLLECTIONS') {
        return {
          ...state,
          isLoading: false,
          myCollections: {
            ...state.myCollections,
            list: state.myCollections.list.map(item => {
              if (item._id === payload.coinId) {
                item.isPostedforSale = true;
                item.marketPlaceState = 'ON_AUCTION';
                item.isAuctioned = true;
                item._auction = {
                  amount: payload.price,
                };
              }
              return item;
            }),
          },
        };
      }
      if (payload.screen === 'COLLLECTION_DETAILS' || payload.screen === 'GRADING_DETAILS') {
        return {
          ...state,
          isLoading: false,
          collectionDetails: {
            ...state.collectionDetails,
            isPostedforSale: true,
            isAuctioned: true,
            marketPlaceState: 'ON_AUCTION',
            _auction: {
              amount: payload.price,
            },
          },
        };
      }
      return {
        ...state,
        isLoading: false,
      };
    case actionLabels.ADD_AUCTION_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.ADD_BID_START:
      return { ...state, isLoading: true };
    case actionLabels.ADD_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionLabels.ADD_BID_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.GET_BID_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_BID_SUCCESS:
      return {
        ...state,
        bidListing: { ...payload },
        isLoading: false,
      };
    case actionLabels.GET_BID_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.RESET_COLLECTION:
      return {
        ...state,
        collectionDetails: null,
        dashboardCollections: null,
        auctionList: null,
        resultSearchText: '',
      };
    case actionLabels.ADD_COIN_CLASSIFY_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionLabels.ADD_COIN_CLASSIFY_SUCCESS: {
      return {
        ...state,
        // scanResult: payload.data,
        scanResult: { ...payload.response.data, priceRange: payload.range },
        isLoading: false,
      };
    }
    case actionLabels.ADD_COIN_CLASSIFY_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    case actionLabels.DELETE_COLLECTION_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionLabels.DELETE_COLLECTION_SUCCESS: {
      const { id } = payload;
      const { myCollections } = state;
      const newCollection =
        myCollections && myCollections.list.filter(collection => collection._id !== id);
      const totalRecords = myCollections && myCollections.totalRecords - 1;
      return {
        ...state,
        isLoading: false,
        myCollections: {
          list: newCollection,
          totalRecords,
        },
      };
    }
    case actionLabels.DELETE_COLLECTION_FAIL: {
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    }
    case actionLabels.COIN_GRADE_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionLabels.COIN_GRADE_SUCCESS: {
      return {
        ...state,
        graderResult: payload,
        isLoading: false,
      };
    }
    case actionLabels.COIN_GRADE_FAIL: {
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    }

    case actionLabels.BANK_NOTE_GRADE_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionLabels.BANK_NOTE_GRADE_SUCCESS: {
      return {
        ...state,
        graderResult: payload,
        isLoading: false,
      };
    }
    case actionLabels.BANK_NOTE_GRADE_FAIL: {
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    }
    case actionLabels.GRADE_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionLabels.GRADE_LIST_SUCCESS: {
      return {
        ...state,
        gradeList: payload,
        isLoading: false,
      };
    }
    case actionLabels.GRADE_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    }

    case actionLabels.AWARD_AUCTION_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionLabels.AWARD_AUCTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case actionLabels.AWARD_AUCTION_FAIL: {
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    }
    case actionLabels.GET_GRADE_REPORT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionLabels.GET_GRADE_REPORT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case actionLabels.GET_GRADE_REPORT_FAIL: {
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    }
    case actionLabels.CLASSIFY_BANK_NOTE_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionLabels.CLASSIFY_BANK_NOTE_SUCCESS: {
      return {
        ...state,
        scanResult: { ...payload.response.data, priceRange: payload.range },
        isLoading: false,
      };
    }
    case actionLabels.CLASSIFY_BANK_NOTE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    case actionLabels.CREATE_BANK_NOTE_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionLabels.CREATE_BANK_NOTE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        addCoinData: payload,
      };
    }
    case actionLabels.CREATE_BANK_NOTE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    case actionLabels.SELL_BANK_NOTE_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionLabels.SELL_BANK_NOTE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case actionLabels.SELL_BANK_NOTE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    default:
      return state;
  }
};
