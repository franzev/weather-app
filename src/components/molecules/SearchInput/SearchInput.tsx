import clsx from "clsx";
import { Icon } from "../../atoms";
import styles from "./SearchInput.module.css";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = ({ className, ...props }: SearchInputProps) => {
  return (
    <div className={styles.wrapper} role="search">
      <Icon
        src="/images/icon-search.svg"
        alt=""
        aria-hidden="true"
        className={styles.icon}
      />
      <input
        id="search-input"
        type="text"
        className={clsx(styles.input, className)}
        {...props}
      />
    </div>
  );
};
