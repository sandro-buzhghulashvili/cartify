import InfiniteSlider from '../shared/infinite_slider/InfiniteSlider';
import BestSellers from './BestSellers';
import Categories from './Categories';
import FlashSales from './FlashSales';
import Hero from './Hero';
import ProductsList from './ProductsList';
import Services from './Services';
import TrendingCompanies from './TrendingCompanies';

const Landing: React.FC = () => {
  return (
    <div>
      <section className="px-[10%]">
        <Hero />
        <Services />
        <BestSellers />
      </section>
      <FlashSales />
      <section className="px-[10%]">
        <Categories />
        <ProductsList />
        <TrendingCompanies />
      </section>
    </div>
  );
};

export default Landing;
