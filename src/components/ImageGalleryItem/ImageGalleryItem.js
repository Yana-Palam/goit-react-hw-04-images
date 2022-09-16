import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ src, name, onClick }) => {
  return (
    <Item onClick={onClick}>
      <Image src={src} alt={name} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
