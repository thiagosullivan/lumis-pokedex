import React from "react";
import styles from "./Search.module.scss";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

interface serchProps {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

export const Search: React.FC<serchProps> = ({
  search,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Pesquise o Pokemon por nome ou tipo"
        />

        <div className={styles.searchIcon}>
          {search ? (
            <button onClick={onClearSearch} aria-label="Limpar busca">
              <IoMdClose />
            </button>
          ) : (
            <IoSearch />
          )}
        </div>
      </div>
    </>
  );
};
