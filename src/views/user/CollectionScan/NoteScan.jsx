import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderTitle from '../../../components/UI/HeaderTitle/HeaderTitle';
import CollectionGradedModal from './CollectionGradedModal';
import NoteSacnImg from '../../../assets/images/img-note.jpg';
import CollectionCropModal from './CollectionCropModal';
import { classifyBankNoteSaga } from '../../../store/actions';
import { Spinner } from '../../../components';
import ScanView from '../../../components/UI/ScanView/ScanView';

const NoteScan = () => {
  const [openModelOnSubmit, setOpenModelOnSubmit] = useState(false);
  const [openCollectionCropModal, setOpenCollectionCropModal] = useState(false);

  const [images, setImage] = useState({
    front: null,
    back: null,
  });
  const dispatch = useDispatch();
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
    dispatch(classifyBankNoteSaga({ data: formData, setOpenModelOnSubmit }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <HeaderTitle title="Add Note" />
      <ScanView
        img={NoteSacnImg}
        border={false}
        setTempImageHandler={setTempImageHandler}
        setTempImageFrontHandler={setTempImageFrontHandler}
        setTempImageBackHandler={setTempImageBackHandler}
        images={images}
        handleSubmit={handleSubmit}
      />
      {openModelOnSubmit && (
        <CollectionGradedModal modalOpenClose={setOpenModelOnSubmit} title="bank note" isBankNote />
      )}
      {openCollectionCropModal && (
        <CollectionCropModal
          modalOpenClose={setOpenCollectionCropModal}
          imageData={tempImages}
          setImageHandler={setImageHandler}
        />
      )}
    </>
  );
};

export default NoteScan;
