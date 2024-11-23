import  { useState, useEffect } from "react";
import ProductBox from "../components/Product/ProductBox";
import CategoryBox from "../components/Category/CategoryBox";

const Home = ({ baseURL, products, categories }) => {
  const [categorySize, setCategorySize] = useState(0);
  const [productSize, setProductSize] = useState(0);

  useEffect(() => {
    // Limit the number of categories and products to display
    setCategorySize(Math.min(categories.length, 6));
    setProductSize(Math.min(products.length, 8));
  }, [categories.length, products.length]);

  return (
    <div id="home">
      {/* Page Wrapper */}
      <div id="background-div" className="page-holder bg-cover">
        <div className="container py-5">
          <header className="text-left text-white py-5">
            <h3 className="mb-4 rounded">
              <a href="#start-shopping" className="bg-white px-2 py-2 rounded" id="heading">
                Start Shopping
              </a>
            </h3>
            <p id="content" className="lead mb-0 bg-dark p-1 rounded">
              Simple Coding Market is for educational purposes only. It can be used by developers to learn
              about developing an eCommerce application complete with backend and frontend for Web and Android.
            </p>
          </header>
        </div>
      </div>

      <div id="start-shopping" className="container">
        <div className="row">
          <div className="col-12 text-left">
            <h2 className="pt-3">Top Categories</h2>
          </div>
        </div>
        <div className="row">
          {categories.slice(0, categorySize).map((category, index) => (
            <div key={category.id} className="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
              <CategoryBox category={category} />
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="container">
        <div className="row">
          <div className="col-12 text-left">
            <h2 className="pt-3">Top Products</h2>
          </div>
        </div>
        <div className="row">
          {products.slice(0, productSize).map((product, index) => (
            <div key={product.id} className="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
              <ProductBox product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
