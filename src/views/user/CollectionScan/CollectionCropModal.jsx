import { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Model from '../../../components/UI/Model/Model';

const CollectionCropModal = props => {
  const { imageData, setImageHandler } = props;
  const [upImg, setUpImg] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setUpImg(reader.result));
    reader.readAsDataURL(imageData.image);
  }, []);

  const getBlobFromCanvas = (canvas, file) =>
    new Promise(resolve => {
      canvas.toBlob(blob => {
        const Blob = blob;
        if (blob) {
          Blob.name = file.name;
          Blob.lastModified = file.lastModified;
          resolve(
            new File([Blob], file.name, {
              type: file.type,
              lastModified: new Date(),
            }),
          );
        } else {
          resolve(file);
        }
      }, file.type); // "image/jpeg");
    });

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop1 = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop1.width * pixelRatio;
    canvas.height = crop1.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop1.x * scaleX,
      crop1.y * scaleY,
      crop1.width * scaleX,
      crop1.height * scaleY,
      0,
      0,
      crop1.width,
      crop1.height,
    );
    getBlobFromCanvas(canvas, imageData.image).then(result => setCropImage(result));
  }, [completedCrop]);

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      <button
        type="button"
        onClick={() => {
          closeModel();
          setImageHandler({ type: imageData.type, image: cropImage });
        }}
        className="btn btn-primary width-342"
      >
        Submit
      </button>
    </>
  );

  return (
    <Model
      headerTitle={`Crop ${imageData.type} image`}
      closeModel={closeModel}
      FooterComponent={FooterComponent}
    >
      <div className="row justify-content-center">
        {upImg ? (
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={c => {
              setCrop(c);
            }}
            onComplete={c => setCompletedCrop(c)}
          />
        ) : (
          <div className="m-4">Loading...</div>
        )}
        <canvas
          className="hide"
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>
    </Model>
  );
};

export default CollectionCropModal;
