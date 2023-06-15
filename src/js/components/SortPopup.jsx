import React, { useEffect, useRef, useState } from 'react';

// React.memo делает rerender только когда ссылки пропсов меняются
const SortPopup = React.memo(function SortPopup({
    onClickPopup,
    activeSortType,
    items
}) {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const activeSortLabel = items.find(obj => obj.type === activeSortType).name;
    const sortRef = useRef();

    function togglePopup() {
        setVisiblePopup(!visiblePopup);
    }

    function handleOutsideClick(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if (!path.includes(sortRef.current)) {
            setVisiblePopup(false);
        }
    }

    function onSelectItem(type) {
        onClickPopup(type);
        setVisiblePopup(false);
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    return (
      <div className="sort" ref={sortRef}>
          <div className="sort__label">
              <svg
                className={visiblePopup ? 'rotated' : ''}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                  />
              </svg>
              <b>Сортувати за:</b>
              <span onClick={togglePopup}>{activeSortLabel}</span>
          </div>
          {visiblePopup && (
            <div className="sort__popup">
                <ul>
                    {items &&
                    items.map((item, index) => {
                        return (
                          <li
                            key={`${index}_${item.type}`}
                            className={item.type === activeSortType ? 'active' : ''}
                            onClick={() => onSelectItem({type: item.type, order: item.order})}>
                              {item.name}
                          </li>
                        );
                    })}
                </ul>
            </div>
          )}
      </div>
    );
});

export default SortPopup;
