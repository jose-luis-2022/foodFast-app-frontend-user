function ProductsFilter({ filters, filter: filterName, setFilter }) {
  function handleFilter(filter) {
    setFilter(filter);
  }

  const filtersRender = filters.map((filter) => {
    return (
      <button
        key={filter.id}
        className={`${filter.filter === filterName ? "bg-yellow-200" : "bg-gray-100"} mx-1 px-5 py-0 md:px-3 md:py-1 mb-3 rounded-md shadow text-xs md:text-sm bg-gray-100 hover:scale-105 hover:shadow-sm focus:bg-yellow-200 duration-700`}
        onClick={() => handleFilter(filter.filter)}
      >
        {filter.filter}
      </button>
    );
  });

  return filtersRender;
}

export default ProductsFilter;
