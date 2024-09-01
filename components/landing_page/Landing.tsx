import FlashSales from './FlashSales';
import Hero from './Hero';
import Services from './Services';

const Landing: React.FC = () => {
  return (
    <div className="px-[10%]">
      <Hero />
      <Services />
      <FlashSales />
    </div>
  );
};

export default Landing;
