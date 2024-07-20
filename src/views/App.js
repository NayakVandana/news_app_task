import React, { useEffect, useState } from 'react';
import useArticleStore from './useArticleStore';
import Pagination from '../components/common/Pagination.js';

const App = () => {
  const { articles,totalRecords,perPage,isLoading,error, getData,} = useArticleStore();

  const [currentPage, setCurrentPage] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); 
  const [visibleColumns, setVisibleColumns] = useState({
    index: true, 
    title: true,
    source: true,
    publishedAt: true,
    author: true,
    description: true,
  });

  useEffect(() => {
    getData({
      per_page: perPage,
      current_page: currentPage + 1,
      search: keywords,
    });
  }, [currentPage, keywords]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchClick = () => {
    const searchValue = document.getElementById('search-input').value;
    setKeywords(searchValue);
    setCurrentPage(0); 
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortArticles = (articles, field, order) => {
    return [...articles].sort((a, b) => {
      if (!a[field] || !b[field]) return 0;
      const fieldA = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
      const fieldB = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];
      if (fieldA < fieldB) return order === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderSortArrow = (field) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
    return ' ▼';
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const sortedArticles = sortField ? sortArticles(articles, sortField, sortOrder) : articles;

  return (
    <div className="container mx-auto px-4">
      <h1 className='text-2xl text-blue-500 font-bold mt-10 mb-5'>News app task</h1>
      <hr className="border-t-4 border-black-200" />

      <div className="flex mb-4 mt-4">
        <input
          type="text"
          id="search-input"
          className="border p-2 mr-2"
          placeholder="Search articles"
        />
        <button onClick={handleSearchClick} className="bg-blue-500 text-white p-2">
          Search
        </button>
      </div>

      <div className="mb-4">
        <h4 className="font-bold mb-2">Customize Columns:</h4>
        {Object.keys(visibleColumns).map((column) => (
          <label key={column} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={visibleColumns[column]}
              onChange={() => toggleColumn(column)}
              className="mr-2"
            />
            {column.charAt(0).toUpperCase() + column.slice(1)}
          </label>
        ))}
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {visibleColumns.index && (
              <th className="py-2 px-4 border-b text-center bg-gray-200">Index</th>
            )}
            {visibleColumns.title && (
              <th className="py-2 px-4 border-b cursor-pointer text-center bg-gray-200" onClick={() => handleSort('title')}>
                Title
                {renderSortArrow('title')}
              </th>
            )}
            {visibleColumns.source && (
              <th className="py-2 px-4 border-b cursor-pointer text-center bg-gray-200" onClick={() => handleSort('source.name')}>
                Source
                {renderSortArrow('source.name')}
              </th>
            )}
            {visibleColumns.publishedAt && (
              <th className="py-2 px-4 border-b cursor-pointer text-center bg-gray-200" onClick={() => handleSort('publishedAt')}>
                Published At
                {renderSortArrow('publishedAt')}
              </th>
            )}
            {visibleColumns.author && (
              <th className="py-2 px-4 border-b cursor-pointer text-center bg-gray-200" onClick={() => handleSort('author')}>
                Author
                {renderSortArrow('author')}
              </th>
            )}
            {visibleColumns.description && (
              <th className="py-2 px-4 border-b cursor-pointer text-center bg-gray-200" onClick={() => handleSort('description')}>
                Description
                {renderSortArrow('description')}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedArticles.map((article, index) => (
            <tr key={article.id}>
              {visibleColumns.index && (
                <td className="py-2 px-4 border-b text-center">{index + 1 + currentPage * perPage}</td>
              )}
              {visibleColumns.title && <td className="py-2 px-4 border-b text-center">{truncateText(article.title, 20)}</td>}
              {visibleColumns.source && <td className="py-2 px-4 border-b text-center">{article.source.name}</td>}
              {visibleColumns.publishedAt && <td className="py-2 px-4 border-b text-center">{article.publishedAt}</td>}
              {visibleColumns.author && <td className="py-2 px-4 border-b text-center">{article.author}</td>}
              {visibleColumns.description && <td className="py-2 px-4 border-b text-center">{truncateText(article.description, 50)}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        handlePageClick={handlePageClick}
        totalPages={Math.ceil(totalRecords / perPage)}
      />
    </div>
  );
};

export default App;
