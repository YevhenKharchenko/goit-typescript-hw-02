import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { requestImages } from './services/unsplash-api';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

type Image = {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  description: string;
  likes: number;
  user: {
    name: string;
  };
};

function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const lastPhotoRef = useRef<HTMLLIElement>(null);

  useEffect((): void => {
    async function fetchImages() {
      if (!query.length) return;

      try {
        setIsLoading(true);
        const fetchedImages = await requestImages(query, page);
        const totalPages = fetchedImages.total_pages;

        if (!fetchedImages.results.length) {
          setIsLoading(false);
          toast.error(
            'Sorry, there are no images matching your search query. Please, try again!'
          );

          return;
        }

        setImages(images => [...images, ...fetchedImages.results]);
        setShowBtn(totalPages > page);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  useEffect((): void => {
    if (!lastPhotoRef.current) return;

    lastPhotoRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [images]);

  const handleSearch = async (query: string) => {
    setImages([]);
    setError(false);
    setShowBtn(false);
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = async () => {
    setPage(p => p + 1);
  };

  const openModal = (url: string): void => {
    setModalUrl(url);
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && !error ? (
        <ImageGallery
          images={images}
          openModal={openModal}
          ref={lastPhotoRef}
        />
      ) : (
        error && <ErrorMessage />
      )}
      {images.length > 0 && !isLoading && showBtn && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      <ImageModal
        modalUrl={modalUrl}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
