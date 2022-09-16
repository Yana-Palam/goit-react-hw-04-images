import PropTypes from 'prop-types';

import { List } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, showModal }) => {
  return (
    <List>
      {images.map(image => {
        const { webformatURL, tags, id } = image;
        return (
          <ImageGalleryItem
            onClick={() => {
              showModal(image);
            }}
            src={webformatURL}
            name={tags}
            key={id}
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGallery;
