import { FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface ISearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = (form.elements.namedItem('query') as HTMLInputElement).value;

    if (!query.trim().length) {
      toast.error('Input field is empty. Please provide a value.');

      return;
    }

    onSearch(query);
    form.reset();
  };

  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
