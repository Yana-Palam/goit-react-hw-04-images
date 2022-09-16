import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { fetchImages, PER_PAGE } from 'services/api-pixabay';
import imageMapper from 'utils/mapper';
import { useState, useEffect } from 'react';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [total, setTotal] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleData = async (page, query) => {
    setStatus(STATUS.PENDING);
    try {
      const fetchData = await fetchImages(query, page);
      const { totalHits: total } = fetchData;
      const data = imageMapper(fetchData.hits);
      if (data.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setStatus(STATUS.REJECTED);
        return;
      }

      setImages(prevState => [...prevState, ...data]);
      setTotal(total);
      page === 1 && toast(` Hooray! We found ${total} images.`);
      setStatus(STATUS.RESOLVED);
    } catch (error) {
      toast.error(error.message);
      setStatus(STATUS.REJECTED);
    }
  };

  useEffect(() => {
    if (query !== '') {
      handleData(page, query);
    }
  }, [page, query]);

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = searchQuery => {
    if (query === searchQuery) return;
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const onCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} showModal={setSelectedImage} />
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.REJECTED && <></>}
      {status === STATUS.RESOLVED && (
        <>
          {page < Math.floor(total / PER_PAGE) && (
            <Button onClick={handleClick} text="Load more"></Button>
          )}
          {selectedImage && (
            <Modal
              onCloseModal={onCloseModal}
              src={selectedImage.largeImageURL}
              name={selectedImage.tags}
            />
          )}
        </>
      )}
      <ToastContainer style={{ fontSize: '20px' }} />
    </div>
  );
};
