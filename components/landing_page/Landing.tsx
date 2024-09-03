import BestSellers from './BestSellers';
import FlashSales from './FlashSales';
import Hero from './Hero';
import Services from './Services';

const Landing: React.FC = () => {
  return (
    <div>
      <section className="px-[10%]">
        <Hero />
        <Services />
        <BestSellers />
      </section>
      <FlashSales />
    </div>
  );
};

export default Landing;
