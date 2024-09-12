'use client';

import { useSearchParams } from 'next/navigation';
import ChooseAccType from './ChooseAccType';
import SignupUser from './Signup/SignupUser';
import SignupCompany from './Signup/SignupCompany';

const SignUp: React.FC = () => {
  const params = useSearchParams();
  const role = params.get('role');

  console.log(role);
  return (
    <div>
      {role === 'user' ? (
        <SignupUser />
      ) : role === 'company' ? (
        <SignupCompany />
      ) : (
        <ChooseAccType />
      )}
    </div>
  );
};

export default SignUp;
