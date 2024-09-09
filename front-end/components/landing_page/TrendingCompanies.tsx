import { DUMMY_TRENDING_COMPANIES } from '@/helpers/DUMMY_DATA';
import InfiniteSlider from '../shared/infinite_slider/InfiniteSlider';

const TrendingCompanies: React.FC = () => {
  return (
    <InfiniteSlider sliderData={DUMMY_TRENDING_COMPANIES}></InfiniteSlider>
  );
};

export default TrendingCompanies;
