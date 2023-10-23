/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderTitle from '../../../components/UI/HeaderTitle/HeaderTitle';
import { COIN_IMG } from '../../../assets/images';
import CollectionGradedModal from './CollectionGradedModal';
import CollectionCropModal from './CollectionCropModal';
import { addCoinClassifySaga } from '../../../store/actions';
import { Spinner } from '../../../components';
import CollectionInformationModal from './CollectionInformationModal';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import ScanView from '../../../components/UI/ScanView/ScanView';
import { axios } from '../../../http';

const CoinScan = () => {
  const [openModalOnSubmit, setOpenModalOnSubmit] = useState(false);
  const [openCollectionCropModal, setOpenCollectionCropModal] = useState(false);
  const dispatch = useDispatch();
  const [images, setImage] = useState({
    front: null,
    back: null,
  });
  const [tempImages, setTempImage] = useState({
    image: null,
    type: '',
  });
  const setTempImageHandler = e => {
    setTempImage({ ...tempImages, image: e.target.files[0] });
    e.target.value = '';
    setOpenCollectionCropModal(true);
  };

  const setTempImageFrontHandler = () => {
    setTempImage({ ...tempImages, type: 'front' });
  };

  const setTempImageBackHandler = () => {
    setTempImage({ ...tempImages, type: 'back' });
  };
  const { isLoading } = useSelector(state => state.collection);

  const setImageHandler = payload => {
    setImage({ ...images, [`${payload.type}`]: payload.image });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('frontSideImage', images.front);
    formData.append('backSideSideImage', images.back);
    dispatch(addCoinClassifySaga({ data: formData }));
    setOpenModalOnSubmit(true);
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <HeaderTitle title="Add Coin" />
      <ScanView
        img={COIN_IMG}
        border
        setTempImageHandler={setTempImageHandler}
        setTempImageFrontHandler={setTempImageFrontHandler}
        setTempImageBackHandler={setTempImageBackHandler}
        images={images}
        handleSubmit={handleSubmit}
      />
      {openModalOnSubmit && (
        <CollectionGradedModal modalOpenClose={setOpenModalOnSubmit} title="coin" />
      )}
      {openCollectionCropModal && (
        <CollectionCropModal
          modalOpenClose={setOpenCollectionCropModal}
          imageData={tempImages}
          setImageHandler={setImageHandler}
        />
      )}
      {/* {openModalOnSubmit && (
        <CollectionInformationModal modalOpenClose={setOpenModalOnSubmit} title="coin" />
      )} */}
    </>
  );
};

export default SetTokenHeader(CoinScan, axios);
