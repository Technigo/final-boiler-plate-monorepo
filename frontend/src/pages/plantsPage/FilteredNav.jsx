import { Link } from "react-router-dom";

export const FilteredNav = () => {
  return (
    <nav className="options-container">
      <ul className="category-options">
        <li>
          <Link to="/plants/all-plants/shady">Shade-loveing</Link>
        </li>
        <li>
          <Link to="/plants/all-plants/easy">Easy</Link>
        </li>
        <li>
          <Link to="/plants/all-plants/pets">Pet friendly</Link>
        </li>
        <li>
          <Link to="/plants/all-plants/climbing">Climbing</Link>
        </li>
        <li>
          <Link to="/plants/all-plants/popular">Popular</Link>
        </li>
      </ul>
      <Link to="/plants/all-plants">
        <button>Clear filters</button>
      </Link>
    </nav>
  );
};
