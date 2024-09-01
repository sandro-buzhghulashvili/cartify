import BestSellers from './BestSellers';
import FlashSales from './FlashSales';
import Hero from './Hero';
import Services from './Services';

const Landing: React.FC = () => {
  return (
    <div className="px-[10%]">
      <Hero />
      <Services />
      <BestSellers />
      {/* <FlashSales /> */}
    </div>
  );
};

export default Landing;
