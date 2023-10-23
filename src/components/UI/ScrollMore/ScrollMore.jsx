import { useEffect, useRef, useState } from 'react';
// import ReactDOM from 'react-dom';
import Spinner from '../Spinner/Spinner';

const ScrollMore = props => {
  const { listLength, apiCallBack, totalRecords = 0, loader } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [waitForResponse, setWaitForResponse] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const element = useRef(null);

  const isInViewport = () => {
    const offset = 0;
    if (!element.current) return false;
    const { top } = element.current.getBoundingClientRect();
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    return top + offset >= 0 && top - offset <= window.innerHeight;
  };

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('scroll', isInViewport);
    }, 1000);
    return () => {
      window.removeEventListener('scroll', isInViewport);
    };
  }, []);

  useEffect(() => {
    if (listLength) {
      if (totalRecords === listLength) {
        setLoadMore(false);
      } else {
        setLoadMore(true);
      }
    } else {
      setLoadMore(false);
    }
    setWaitForResponse(false);
  }, [listLength, totalRecords]);

  useEffect(() => {
    if (isVisible === true) {
      if (waitForResponse === false) {
        apiCallBack({ skip: listLength });
        setWaitForResponse(true);
      }
    }
  }, [isVisible, apiCallBack, listLength, waitForResponse]);

  return (
    <>
      {listLength !== undefined && loadMore && (
        <div ref={element}>{loader || <Spinner withoutMargin />}</div>
      )}
    </>
  );
};

export default ScrollMore;
