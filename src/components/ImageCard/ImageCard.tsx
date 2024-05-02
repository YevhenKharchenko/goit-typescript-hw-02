import css from './ImageCard.module.css';

type Card = {
  url: string;
  description: string;
  author: string;
  likes: number;
};

const ImageCard = ({ url, description, author, likes }: Card) => {
  return (
    <div className={css.imageCard}>
      <img
        className={css.image}
        src={url}
        alt={description}
        width={360}
        height={200}
      />
      <div className={css.descriptionWrapper}>
        <p className={css.author}>Author: {author}</p>
        <p className={css.likes}>Likes: {likes}</p>
        {description && (
          <p className={css.description}>Description: {description}</p>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
