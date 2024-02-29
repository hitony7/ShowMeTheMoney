import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Implement your logic to check if the user is authenticated
  // For example, you can check if there's a token in localStorage
  const isAuthenticated = localStorage.getItem('jwtToken') !== null;

  // Return true to allow access to the route if the user is authenticated
  // Return false to prevent access to the route if the user is not authenticated
  return isAuthenticated;
};
