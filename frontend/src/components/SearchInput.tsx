import type { InputProps } from "../studenttypes";
import styles from "./SearchInput.module.css";

function SearchInput({ handleOnChange, searchtext }:InputProps) {
  return (
    <input
      className={styles.searchInput}
      type="text"
      value={searchtext}
      placeholder="Search by name here"
      onChange={handleOnChange}
    />
  );
}

export default SearchInput;
