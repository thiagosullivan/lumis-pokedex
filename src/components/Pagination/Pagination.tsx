import React, { memo } from "react";
import styles from "./Pagination.module.scss";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination: React.FC<Props> = memo(
  ({ currentPage, totalPages, onPageChange, isLoading = false }) => {
    if (totalPages <= 1 || isLoading) {
      return null;
    }

    const handlePageClick = (page: number) => {
      if (page < 1 || page > totalPages) return;
      onPageChange(page);
    };

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (end - start + 1 < maxVisible) {
        if (start === 1) {
          end = Math.min(totalPages, maxVisible);
        } else if (end === totalPages) {
          start = Math.max(1, totalPages - maxVisible + 1);
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
      <div
        className={styles.paginationContainer}
        role="navigation"
        aria-label="Paginação"
      >
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
          className={styles.prevBtn}
        >
          <IoMdArrowBack />
          <span>Anterior</span>
        </button>

        <div className={styles.pageNumbers}>
          {!pageNumbers.includes(1) && (
            <>
              <button
                onClick={() => handlePageClick(1)}
                className={`${styles.pageButton} ${
                  1 === currentPage ? styles.active : ""
                }`}
                aria-label="Ir para página 1"
                data-testid="page-1"
              >
                1
              </button>
              {!pageNumbers.includes(2) && (
                <span className={styles.ellipsis}>...</span>
              )}
            </>
          )}

          {pageNumbers.map((page) => {
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`${styles.pageButton} ${
                  isActive ? styles.active : ""
                }`}
                aria-label={`Ir para página ${page}`}
                aria-current={isActive ? "page" : undefined}
                data-active={isActive}
                data-testid={`page-${page}`}
              >
                {page}
              </button>
            );
          })}

          {!pageNumbers.includes(totalPages) && totalPages > 0 && (
            <>
              {!pageNumbers.includes(totalPages - 1) && (
                <span className={styles.ellipsis}>...</span>
              )}
              <button
                onClick={() => handlePageClick(totalPages)}
                className={`${styles.pageButton} ${
                  totalPages === currentPage ? styles.active : ""
                }`}
                aria-label={`Ir para página ${totalPages}`}
                data-testid={`page-${totalPages}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
          className={styles.nextBtn}
        >
          <span>Próxima</span>
          <IoMdArrowForward />
        </button>
      </div>
    );
  },
);

Pagination.displayName = "Pagination";

export default Pagination;
