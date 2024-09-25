'use client';

import { useSearchParams } from 'next/navigation';
import ChooseAccType from './ChooseAccType';
import SignupUser from './Signup/SignupUser';
import SignupCompany from './Signup/SignupCompany';
import { Suspense } from 'react';

const SignUp: React.FC = () => {
  const params = useSearchParams();
  const role = params.get('role');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {role === 'user' ? (
        <SignupUser />
      ) : role === 'company' ? (
        <SignupCompany />
      ) : (
        <ChooseAccType />
      )}
    </Suspense>
  );
};

export default SignUp;
