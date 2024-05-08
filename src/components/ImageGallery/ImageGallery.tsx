import { forwardRef, Ref } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { IImage } from '../../types';
import css from './ImageGallery.module.css';

interface IImageGalleryProps {
  images: IImage[];
  openModal: (url: string) => void;
}

const ImageGallery = forwardRef(
  ({ images, openModal }: IImageGalleryProps, ref: Ref<HTMLLIElement>) => {
    return (
      <ul className={css.list}>
        {images.map((el, idx) => {
          const isLastImage = idx === images.length - 1;
          return (
            <li
              ref={isLastImage ? ref : null}
              className={css.listItem}
              key={el.id}
              onClick={() => {
                openModal(el.urls.regular);
              }}
            >
              <ImageCard
                url={el.urls.small}
                description={el.description}
                author={el.user.name}
                likes={el.likes}
              />
            </li>
          );
        })}
      </ul>
    );
  }
);

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
