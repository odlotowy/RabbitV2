import Hero from '../components/Layout/Hero'
import GenderCollectionSelection from '../components/Products/GenderCollectionSelection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from "../components/Products/ProductGrid.jsx";
import FeaturedCollection from "../components/Products/FeaturedCollection.jsx";
import FeaturesSection from "../components/Products/FeaturesSection.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { fetchProductsByFilters } from '../redux/slices/productsSlice.js';
import axios from "axios"

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8
      })
    );
    // fetch bestseller product
    const fetchBestSeller = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/bestseller`
            );
            setBestSellerProduct(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSelection />
      <NewArrivals />

      {/* Bestseller */}
      <h2 className="text-3xl text-center font-bold mb-4">Bestseller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading bestseller product...</p>
      )}

      <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-4">
              Top Wears for Women
          </h2>
          <ProductGrid products={products} loading={loading} error={error} />
      </div>

        <FeaturedCollection />
        <FeaturesSection />
    </div>
  )
}

export default Home