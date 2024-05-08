import css from './LoadMoreBtn.module.css';

interface ILoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<ILoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button className={css.btn} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
