import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof localStorage !== 'undefined') {
    // Implement your logic to check if the user is authenticated
    // For example, you can check if there's a token in localStorage
    const isAuthenticated = localStorage.getItem('jwtToken') !== null;

    // If the user is authenticated, return true to allow access to the route
    if (isAuthenticated) {
      return true;
    } else {
      // If the user is not authenticated, redirect them to the login page and return false
      window.location.href = '/login'; // Redirect to the login page
      return false;
    }
  } else {
    // Handle the case where localStorage is not available (e.g., server-side rendering)
    console.error('localStorage is not available');
    return false;
  }
};
