const cleanParams = (params) => {
  const cleaned = {};
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      if (Array.isArray(params[key])) {
        if (params[key].length > 0) {
          cleaned[key] = params[key];
        }
      } else {
        cleaned[key] = params[key];
      }
    }
  }
  return cleaned;
};

const buildQueryString = (params) => {
  const cleanedParams = cleanParams(params);
  const searchParams = new URLSearchParams();

  for (const key in cleanedParams) {
    if (Array.isArray(cleanedParams[key])) {
      cleanedParams[key].forEach(val => searchParams.append(key, val));
    } else {
      searchParams.append(key, cleanedParams[key]);
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const fetchEmployeesRequest = async (params) => {
  const queryString = buildQueryString(params);
  const response = await fetch(`/api/Employee${queryString}`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

export const fetchEmployeeByIdRequest = async (id) => {
  const response = await fetch(`/api/Employee/${id}`);
  
  if (!response.ok) {
    throw new Error('Employee not found');
  }
  
  return response.json();
};