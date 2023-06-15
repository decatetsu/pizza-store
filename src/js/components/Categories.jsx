import React from 'react';

const Categories = React.memo(function Categories({
    activeCategory,
    items,
    onClickCategory
}) {
    return (
      <div className="categories">
          <ul>
              <li
                className={activeCategory === null ? 'active' : ''}
                onClick={() => onClickCategory(null)}
              >
                  Всі
              </li>
              {items
              && items.map((item, index) => (
                <li
                  className={activeCategory === index ? 'active' : ''}
                  onClick={() => onClickCategory(index)}
                  key={`${index}_${item}`}
                >
                    {item}
                </li>
              ))}
          </ul>
      </div>
    );
});

export default Categories;
