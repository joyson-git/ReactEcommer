import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductBox from '../../components/Product/ProductBox';

const ListProducts = ({ baseURL, categories }) => {
  const { id } = useParams(); // Extracting category ID from route params

  const [category, setCategory] = useState({});
  const [msg, setMsg] = useState('');
  const [len, setLen] = useState(0);

  useEffect(() => {
    // Finding the category based on ID
    const categoryIndex = categories.findIndex(category => category.id === parseInt(id));
    if (categoryIndex !== -1) {
      const selectedCategory = categories[categoryIndex];
      setCategory(selectedCategory);

      // Setting length of products and the appropriate message
      const productCount = selectedCategory.products?.length || 0;
      setLen(productCount);

      if (productCount === 0) {
        setMsg("Sorry, no products found");
      } else if (productCount === 1) {
        setMsg("Only 1 product found");
      } else {
        setMsg(`${productCount} products found`);
      }
    }
  }, [id, categories]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">{category.categoryName}</h4>
          <h5>{msg}</h5>
        </div>
      </div>

      <div className="row">
        {len === 0 && (
          <img
            className="img-fluid"
            src="../../assets/sorry.jpg"
            alt="Sorry"
          />
        )}
        {category.products?.map(product => (
          <div
            key={product.id}
            className="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
          >
            <ProductBox product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
