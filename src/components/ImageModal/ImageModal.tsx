import css from './ImageModal.module.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement(document.getElementById('root') as HTMLElement);

interface IImageModalProps {
  modalUrl: string;
  modalIsOpen: boolean;
  closeModal: () => void;
}

const ImageModal = ({ modalUrl, modalIsOpen, closeModal }: IImageModalProps) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={css.content}
      overlayClassName={css.overlay}
      contentLabel="Image Modal"
    >
      <img src={modalUrl} alt="Image" />
    </ReactModal>
  );
};

export default ImageModal;
