import { IconTruck, IconWallet, IconHeadset, IconCard } from '../icons/Icons';

const DUMMY_SERVICES = [
  {
    title: 'Free Shipping',
    description: 'Free delivery for all orders',
    icon: IconTruck,
  },
  {
    title: 'Money Guarantee',
    description: '30 days money back',
    icon: IconWallet,
  },
  {
    title: '24/7 Support',
    description: 'Friendly 24/7 support',
    icon: IconHeadset,
  },
  {
    title: 'Secure Payment',
    description: 'All cards accepted',
    icon: IconCard,
  },
];

const Services: React.FC = () => {
  return (
    <div className="py-20">
      <ul className="flex items-center justify-between gap-10 flex-wrap">
        {DUMMY_SERVICES.map((service, index) => (
          <li key={index} className="flex items-center gap-5">
            <service.icon />
            <div>
              <h1 className="text-lg font-semibold text-primary-black">
                {service.title}
              </h1>
              <p className="text-base text-teritary-gray">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
