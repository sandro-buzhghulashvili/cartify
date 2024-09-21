import { ClientAuthenticationType } from '@/schemas/ClientAuthentication';
import { ClientAuthorizationType } from '@/schemas/ClientAuthorizationSchema';
import { CompanyAuthorizationType } from '@/schemas/CompanyAuthorizationSchema';
import { errorHandler } from '@/utils/errorHandler';
import axios from 'axios';
import { MutationFunction } from 'react-query';

export const registerClient: MutationFunction<
  any,
  {
    formData: ClientAuthorizationType;
  }
> = async (data) => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/client-signup',
      data.formData
    );
    return res.data;
  } catch (error: any) {
    throw errorHandler(error);
  }
};

export const registerCompany: MutationFunction<
  any,
  {
    companyData: CompanyAuthorizationType;
  }
> = async (data) => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/company-signup',
      data.companyData
    );

    return res.data;
  } catch (error: any) {
    throw errorHandler(error);
  }
};

export const login: MutationFunction<
  any,
  {
    userData: ClientAuthenticationType;
  }
> = async (data) => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/login',
      data.userData
    );
    return res.data;
  } catch (error: any) {
    throw errorHandler(error);
  }
};
