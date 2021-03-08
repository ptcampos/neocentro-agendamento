export const setUser = user => {
  localStorage['d-neoc-user'] = JSON.stringify(user);
  return JSON.parse(localStorage['d-neoc-user']);
};

export const getUser = () => {
  if (localStorage['d-neoc-user']) {
    return JSON.parse(localStorage['d-neoc-user']);
  }
  return null;
};

export const getUserPlan = () => {
  if (localStorage['d-neoc-user-plan']) {
    return JSON.parse(localStorage['d-neoc-user-plan']);
  }
  return null;
};

export const setUserPlan = plan => {
  localStorage['d-neoc-user-plan'] = plan;
  return JSON.parse(localStorage['d-neoc-user-plan']);
};

export const removeUser = () => {
  localStorage.removeItem('d-neoc-user');
  localStorage.removeItem('d-neoc-user-plan');
};
