/**
 * Custom error classes for the KlASSIFIED Mall frontend.
 */

/**
 * Thrown when a request requires authentication but no valid token is available.
 * Components should catch this and redirect to the login page.
 */
export class AuthenticationError extends Error {
  public readonly redirectTo: string;

  constructor(message: string = 'Authentication required', redirectTo: string = '/auth/signin') {
    super(message);
    this.name = 'AuthenticationError';
    this.redirectTo = redirectTo;
  }
}
