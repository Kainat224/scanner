/* eslint-disable max-len */
// import { forwardRef } from 'react';
// import { CalendarContainer } from 'react-datepicker';
// import Slider from 'rc-slider';
import { DOWN_ARROW_SVG } from '../../../assets/images';
// import { date } from 'yup/lib/locale';

const FilterComponent = props => {
  // eslint-disable-next-line no-debugger
  // debugger;
  const { sortObj, setSortObj, initSortObj, showAll, option, setOption } = props;
  // const currentDate = new Date();

  // const CustomInput = forwardRef(({ value, onClick, defaultLabel }, ref) => {
  //   return (
  //     <button
  //       type="button"
  //       className="link-button"
  //       onClick={onClick}
  //       ref={ref}
  //       style={{ marginRight: '12px' }}
  //     >
  //       {value || defaultLabel}
  //       {/* <img src={DOWN_ARROW_SVG} alt="" width={15} /> */}
  //     </button>
  //   );
  // });

  // const CustomHeader = ({ className, children, defaultLabel }) => (
  //   <div>
  //     <CalendarContainer className={className}>
  //       <div
  //         style={{
  //           background: '#01095e',
  //           color: '#fff',
  //           borderRadius: '4px 4px 0px 0px',
  //           textAlign: 'center',
  //           padding: 5,
  //         }}
  //       >
  //         {defaultLabel}
  //       </div>
  //       <div style={{ position: 'relative' }}>{children}</div>
  //     </CalendarContainer>
  //   </div>
  // );

  // const CustomYearHeader = ({
  //   date,
  //   decreaseYear,
  //   increaseYear,
  //   prevMonthButtonDisabled,
  //   nextMonthButtonDisabled,
  // }) => (
  //   <div className="pb-2">
  //     <button
  //       type="button"
  //       // eslint-disable-next-line max-len
  //       className="react-datepicker__navigation react-datepicker__navigation--previous"
  //       onClick={decreaseYear}
  //       disabled={prevMonthButtonDisabled}
  //     >
  //       {'<'}
  //     </button>
  //     {typeof date.getFullYear === 'function' && date.getFullYear()}
  //     <button
  //       type="button"
  //       // eslint-disable-next-line max-len
  //       className="react-datepicker__navigation react-datepicker__navigation--next"
  //       onClick={increaseYear}
  //       disabled={nextMonthButtonDisabled}
  //     >
  //       {'>'}
  //     </button>
  //   </div>
  // );
  return (
    <section className="main-wrapper mini-nav mini-navA filter-mini-nav">
      <div className="container pt-2">
        <div className="row">
          <div className="col-lg-12">
            <div className="row align-items-center flex-reverse1">
              <div className="">
                <div className="header-top-panel pl-0">
                  <ul>
                    {option && (
                      <>
                        <li>
                          <div className="ml-4">
                            <input
                              type="checkbox"
                              className="form-check-input mt-2"
                              id="exampleCheck1"
                              key={option && option.isCoinSelected}
                              checked={option && option.isCoinSelected}
                              onChange={() =>
                                setOption({
                                  ...option,
                                  isCoinSelected: !option.isCoinSelected,
                                })
                              }
                            />
                            <label
                              htmlFor="vehicle1"
                              className="ml-3"
                              style={{ marginBottom: '0px !important' }}
                            >
                              Coins
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="ml-4">
                            <input
                              type="checkbox"
                              className="form-check-input mt-2"
                              id="exampleCheck1"
                              key={option && option.isNoteSelected}
                              checked={option && option.isNoteSelected}
                              onChange={() =>
                                setOption({
                                  ...option,
                                  isNoteSelected: !option.isNoteSelected,
                                })
                              }
                            />
                            <label
                              htmlFor="vehicle1"
                              className="ml-3"
                              style={{ marginBottom: '0px !important' }}
                            >
                              Banknote
                            </label>
                          </div>
                        </li>{' '}
                        <li>
                          <div className="top-custom-select">
                            <select
                              onChange={e =>
                                setSortObj({ ...sortObj, marketPlaceState: e.target.value })
                              }
                              value={sortObj.marketPlaceState}
                            >
                              <option value="ON_SALE">ON SALE</option>
                              <option value="ON_AUCTION">ON AUCTION</option>
                            </select>
                          </div>
                        </li>
                      </>
                    )}
                    {showAll && (
                      <>
                        <li>
                          <div className="top-custom-select">
                            <select
                              onChange={e => setSortObj({ ...sortObj, country: e.target.value })}
                              value={sortObj.country}
                            >
                              <option value="">Select Country</option>
                              <option>India</option>
                              <option>US</option>
                              <option>UK</option>
                              <option>France</option>
                              <option>Egypt</option>
                              <option>Austrailia</option>
                              <option>UAE</option>
                              <option>Iraq</option>
                              <option>Germany</option>
                            </select>
                          </div>
                        </li>
                        <li>
                          <div className="top-custom-select">
                            <select
                              onChange={e => setSortObj({ ...sortObj, grading: e.target.value })}
                              value={sortObj.grading}
                            >
                              <option value="">Select Grading</option>
                              <option value="gradedOnly">Graded only</option>
                              <option value="ncg">NCG</option>
                              <option value="pcgs">PCGS</option>
                              <option value="nonGraded">Non graded</option>
                            </select>
                          </div>
                        </li>
                        <li>
                          <div className="top-custom-select">
                            <select
                              onChange={e => setSortObj({ ...sortObj, shape: e.target.value })}
                              value={sortObj.shape}
                            >
                              <option value="">Select Shape</option>
                              {option.isCoinSelected && (
                                <>
                                  <option>Circle</option>
                                  <option>Triangular</option>
                                  <option>Squares</option>
                                  <option>Diamond</option>
                                  <option>Pentagonal</option>
                                  <option>Hexagonal</option>
                                  <option>Heptagonal</option>
                                  <option>Octagonal</option>
                                  <option>Decagonal</option>
                                  <option>Nonagonal</option>
                                  <option>Dodecagonal</option>
                                  <option>Tridecagonal</option>
                                  <option>Holed</option>
                                </>
                              )}
                              {option.isNoteSelected && (
                                <>
                                  <option>Verticle</option>
                                  <option>Horizontal</option>
                                </>
                              )}
                            </select>
                          </div>
                        </li>
                        <li>
                          <div className="top-custom-select">
                            <select
                              onChange={e => setSortObj({ ...sortObj, material: e.target.value })}
                              value={sortObj.material}
                            >
                              <option value="">Select Material</option>
                              {option.isCoinSelected && (
                                <>
                                  <option>Copper</option>
                                  <option>Gold</option>
                                  <option>Silver</option>
                                  <option>Metal</option>
                                  <option>Brass</option>
                                  <option>Bronze</option>
                                  <option>Electrum</option>
                                  <option>Aluminum</option>
                                </>
                              )}
                              {option.isNoteSelected && (
                                <>
                                  <option>Paper</option>
                                  <option>Polymer</option>
                                </>
                              )}
                            </select>
                          </div>
                        </li>
                        <li>
                          {/* <div className="top-custom-select mb-1">
                            <div className="top-custom-select">
                              <div className="dropdown">
                                <button
                                  className="dropdown-toggle link-button p-0"
                                  type="button"
                                  id="dropdownMenu2"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  ={' '}
                                  {sortObj.fromYear === null && sortObj.toYear === null
                                    ? 'Select Year'
                                    : `${(sortObj.fromYear && sortObj.fromYear) || '-'} to ${
                                        (sortObj.toYear && sortObj.toYear) || '-'
                                      }`}
                                  <img src={DOWN_ARROW_SVG} alt="" width={15} />
                                </button>
                                <div className="dropdown-menu p-2" aria-labelledby="dropdownMenu2">
                                  <div className="d-flex">
                                    <div className="mr-2 select-date"> */}
                          {/* <ReactDatePicker
                                        selected={sortObj.fromYear}
                                        onChange={date =>
                                          typeof date.getFullYear === 'function' &&
                                          setSortObj({
                                            ...sortObj,
                                            fromYear: date.getFullYear(),
                                          })
                                        }
                                        showYearPicker
                                        dateFormat="yyyy"
                                        maxDate={new Date(currentDate.getFullYear() - 1, 1, 1)}
                                        isClearable
                                        renderCustomHeader={CustomYearHeader}
                                        onFocus={e => e.target.blur()}
                                        placeholderText="Select From Year"
                                        calendarContainer={e =>
                                          CustomHeader({ ...e, defaultLabel: 'Select from year' })
                                        }
                                      />
                                    </div>
                                    <div className="mr-2 select-date">
                                      <ReactDatePicker
                                        selected={sortObj.toYear}
                                        onChange={date =>
                                          typeof date.getFullYear === 'function' &&
                                          setSortObj({ ...sortObj, toYear: date.getFullYear() })
                                        }
                                        showYearPicker
                                        dateFormat="yyyy"
                                        maxDate={currentDate}
                                        isClearable
                                        placeholderText="Select to Year"
                                        renderCustomHeader={CustomYearHeader}
                                        calendarContainer={e =>
                                          CustomHeader({ ...e, defaultLabel: 'Select to year' })
                                        }
                                      /> */}
                          {/* </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          {/* updated code */}
                          {/* <li>
                            <div className="top-custom-select">
                              <ReactDatePicker
                                selected={sortObj.fromYear}
                                onChange={date =>
                                  setSortObj({ ...sortObj, fromYear: date && date.getFullYear() })
                                }
                                showYearPicker
                                dateFormat="yyyy"
                                maxDate={new Date(currentDate.getFullYear() - 1, 1, 1)}
                                isClearable
                                customInput={
                                  <CustomInput
                                    defaultLabel="Select from year"
                                    value={
                                      date &&
                                      typeof date.getFullYear === 'function' &&
                                      "hel"
                                    }
                                  />
                                }
                                renderCustomHeader={CustomYearHeader}
                                onFocus={e => e.target.blur()}
                                calendarContainer={e =>
                                  CustomHeader({ ...e, defaultLabel: 'Select from year' })
                                }
                              />
                            </div>
                          </li>
                          <li>
                            <div className="top-custom-select">
                              <ReactDatePicker
                                selected={sortObj.toYear}
                                onChange={date =>
                                  setSortObj({ ...sortObj, toYear: date && date.getFullYear() })
                                }
                                showYearPicker
                                dateFormat="yyyy"
                                maxDate={currentDate}
                                isClearable
                                customInput={
                                  <CustomInput
                                    defaultLabel="Select to year"
                                    value={
                                      date && typeof date.getFullYear === 'function' && 'hello'
                                    }
                                  />
                                }
                                renderCustomHeader={CustomYearHeader}
                                onFocus={e => e.target.blur()}
                                calendarContainer={e =>
                                  CustomHeader({ ...e, defaultLabel: 'Select to year' })
                                }
                              />
                            </div>
                          </li> */}
                        </li>
                        <li>
                          <div className="top-custom-select">
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle link-button p-0"
                                type="button"
                                id="dropdownMenu2"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {/* {sortObj.fromPrice || 'Select from price'} */}
                                {sortObj.fromPrice === 0 && sortObj.toPrice === 0
                                  ? 'Select Price'
                                  : `${sortObj.fromPrice}-${sortObj.toPrice}`}
                                {/* Select Price */}
                                <img src={DOWN_ARROW_SVG} alt="" width={15} />
                              </button>
                              <div className="dropdown-menu p-3" aria-labelledby="dropdownMenu2">
                                <div className="d-flex">
                                  <label htmlFor="">From</label>
                                  {/* <div className="selected-price-from-text">
                                    {sortObj.fromPrice || 0}
                                  </div> */}
                                </div>
                                <input
                                  type="number"
                                  placeholder="$"
                                  value={sortObj.fromPrice}
                                  style={{ backgroundColor: '#F5F5F5', border: '1px solid black' }}
                                  onChange={e =>
                                    setSortObj({ ...sortObj, fromPrice: e.target.value })
                                  }
                                />
                                {/* <Slider
                                  value={sortObj.fromPrice}
                                  min={1}
                                  max={500}
                                  onChange={val => setSortObj({ ...sortObj, fromPrice: val })}
                                /> */}
                                <div className="d-flex">
                                  <label htmlFor="">To</label>
                                </div>
                                <input
                                  type="number"
                                  placeholder="$"
                                  value={sortObj.toPrice}
                                  style={{ backgroundColor: '#F5F5F5', border: '1px solid black' }}
                                  onChange={e =>
                                    setSortObj({ ...sortObj, toPrice: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        {/* <li>
                          <div className="top-custom-select">
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle link-button p-0"
                                type="button"
                                id="dropdownMenu2"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {sortObj.toPrice || 'Select to price'}
                                <img src={DOWN_ARROW_SVG} alt="" width={15} />
                              </button>
                              <div className="dropdown-menu p-2" aria-labelledby="dropdownMenu2">
                                <Slider
                                  value={sortObj.toPrice}
                                  min={1}
                                  max={500}
                                  onChange={val => setSortObj({ ...sortObj, toPrice: val })}
                                />
                              </div>
                            </div>
                          </div>
                        </li> */}
                        <li>
                          <div className="top-custom-select">
                            <select
                              onChange={e => setSortObj({ ...sortObj, sortPrice: e.target.value })}
                              value={sortObj.sortPrice}
                            >
                              <option value="1">Price Low To High</option>
                              <option value="-1">Price High To Low</option>
                            </select>
                          </div>
                        </li>
                        <li style={{ position: 'absolute', right: 0 }}>
                          <button
                            className="link-button r-0"
                            type="button"
                            style={{
                              background: '#01095e',
                              color: '#fff',
                            }}
                            onClick={() => {
                              setSortObj({ ...initSortObj });
                            }}
                          >
                            Reset filter
                          </button>
                        </li>
                        <div className="top-custom-select" />
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAll && (
          <div className="row">
            <div className="col-lg-12" style={{ textAlign: 'right' }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterComponent;
