import React, { FC } from 'react';
import './imageBox.scss';

type ImageBoxProps = {
  imageSrc: string
}

const ImageBox:FC<ImageBoxProps> = ({ imageSrc }) => (
  <div>
    <img className="imageBox__image" src={imageSrc} alt="Product" />
  </div>
);

export default ImageBox;
