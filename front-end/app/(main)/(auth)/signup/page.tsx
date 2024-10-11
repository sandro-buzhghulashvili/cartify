import SignUp from '@/components/auth/SignUp';
import { Suspense } from 'react';

const SignupPage: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <SignUp />
    </Suspense>
  );
};

export default SignupPage;
