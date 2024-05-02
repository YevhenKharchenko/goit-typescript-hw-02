import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={css.btn} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
