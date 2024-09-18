export const errorHandler = (error: any): Error => {
  if (error.response && error.response.data) {
    return new Error(error.response.data.message || 'An error occurred');
  } else {
    return new Error(error.message || 'An unknown error occurred');
  }
};
