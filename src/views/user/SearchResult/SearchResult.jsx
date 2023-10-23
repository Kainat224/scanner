import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactEasyInfiniteScroll from 'react-easy-infinite-scroll';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import { getDashboardCollectionSaga, resetCollection } from '../../../store/actions';
import { NoDataFound, Spinner, ViewCard } from '../../../components';
import FilterComponent from '../Dashboard/FilterComponent';

const INIT_SORT_OBJ = {
  country: '',
  grading: '',
  shape: '',
  material: '',
  fromYear: null,
  toYear: null,
  fromPrice: 0,
  toPrice: 0,
  sortPrice: 1,
  isCoin: null,
};

const SearchResult = () => {
  const [option, setOption] = useState({
    isCoinSelected: true,
    isNoteSelected: true,
  });
  const [sortObj, setSortObj] = useState({
    ...INIT_SORT_OBJ,
  });

  const { dashboardCollections, resultSearchText } = useSelector(state => state.collection);

  const dispatch = useDispatch();

  const generateURL = payload => {
    const payloadObj = {};
    let url = '';

    // Choosing selected type (note, coin, both)
    let selected = '';
    const { isCoinSelected, isNoteSelected } = option;
    if ((isCoinSelected && isNoteSelected) || (!isNoteSelected && !isCoinSelected)) {
      selected = null;
    } else if (isCoinSelected) {
      selected = 'true';
    } else {
      selected = 'false';
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(payload)) {
      if (key !== 'isNew') {
        url += `&${key}=${value}`;
      } else {
        payloadObj[key] = value;
      }
    }
    // eslint-disable-next-line no-restricted-syntax
    if (sortObj.isCoin === null) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries({ ...sortObj, isCoin: selected })) {
        if (value) {
          url += `&${key}=${value}`;
        }
      }
    }
    if (resultSearchText) {
      url += `&search=${resultSearchText}`;
    }
    return { URL: url, ...payloadObj };
  };

  const getData = payload => {
    dispatch(getDashboardCollectionSaga(generateURL(payload)));
  };

  useEffect(() => {
    getData({ isNew: true, skip: 0 });
    return () => resetCollection();
  }, [sortObj, resultSearchText, option]);

  return (
    <div className="container" id="searchresult">
      <FilterComponent
        sortObj={sortObj}
        setSortObj={setSortObj}
        initSortObj={INIT_SORT_OBJ}
        option={option}
        setOption={setOption}
        showAll
      />
      <div className="">
        <div className="row ">
          <div className="col-lg-12 ">
            <div className="row  mt-3 align-items-center">
              <div className="col-lg-6 ">
                <div className="home-title ">Search</div>
              </div>
            </div>

            <div className="w-100">
              <hr className="mt-1 mb-2" />
            </div>
            <div id="my-coin ">
              <div className="tab-content w-100 " id="pills-tabContent">
                {dashboardCollections === null ? (
                  <Spinner />
                ) : dashboardCollections.list && dashboardCollections.list.length !== 0 ? (
                  dashboardCollections.list.map(item => (
                    <Link to={`/collection-detail/${item._id}`}>
                      <ViewCard item={item} key={item._id} />
                    </Link>
                  ))
                ) : (
                  <NoDataFound data="No Result Found" />
                )}
                <ReactEasyInfiniteScroll
                  listLength={
                    dashboardCollections &&
                    dashboardCollections.list &&
                    dashboardCollections.list.length
                  }
                  totalRecords={dashboardCollections && dashboardCollections.totalItems}
                  apiCallBack={getData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetTokenHeader(SearchResult, axios);
