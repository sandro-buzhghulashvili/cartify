import {
  IconRate,
  IconSales,
  IconWalletStroke,
} from '@/components/icons/Icons';

const DUMMY_SALES = [
  {
    text: 'New sales',
    total: '$0',
    icon: IconSales,
  },
  {
    text: 'Total icome',
    total: '$0',
    icon: IconWalletStroke,
  },
  {
    text: 'Conversion rate',
    total: '%0',
    icon: IconRate,
  },
];

interface SalesStatsProps {
  salesData: any[] | null;
}

const SalesStats: React.FC<SalesStatsProps> = ({ salesData }) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-10 mb-20">
      {DUMMY_SALES.map((element, index) => (
        <section
          key={index}
          className="flex w-[200px] justify-between items-center py-3 px-4 rounded-xl"
        >
          <div>
            <p className="text-sm text-secondary-gray font-medium">
              {element.text}
            </p>
            <h1 className="font-medium text-xl text-primary-black tex">
              {element.total}
            </h1>
          </div>
          <div className="size-[56px] flex items-center justify-center rounded-xl bg-[rgba(92,129,244,0.1)]">
            <element.icon />
          </div>
        </section>
      ))}
    </div>
  );
};

export default SalesStats;
