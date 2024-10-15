export const validateCompanyProfile = (profileData) => {
  const validationFuncs = {
    address_data: (val) => val && val.trim().length > 0,
    description: (val) => val && val.trim().length > 50,
    tags: (val) => {
      const arr = val.split(',');
      if (arr.length > 0 && arr.every((str) => str.length > 0)) {
        return true;
      } else {
        return false;
      }
    },
  };

  return Object.entries(profileData).every(([key, value]) => {
    const fn = validationFuncs[key];
    return fn ? fn(value) : true;
  });
};
