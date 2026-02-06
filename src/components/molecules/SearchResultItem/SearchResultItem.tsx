import styles from "./SearchResultItem.module.css";

interface SearchResultItemProps {
  name: string;
  details: string;
  onClick?: () => void;
  onMouseDown?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export const SearchResultItem = ({
  name,
  details,
  onClick,
  onMouseDown,
}: SearchResultItemProps) => {
  return (
    <li className={styles.item} onClick={onClick} onMouseDown={onMouseDown}>
      <div className={styles.name}>{name}</div>
      <div className={styles.details}>{details}</div>
    </li>
  );
};
