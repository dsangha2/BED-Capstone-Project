/**
 * Error thrown when authentication fails.
 */
export class AuthenticationError extends Error {
    public code: string;
    constructor(message: string, code: string) {
      super(message);
      this.name = "AuthenticationError";
      this.code = code;
    }
  }
  
  /**
   * Error thrown when authorization fails.
   */
  export class AuthorizationError extends Error {
    public code: string;
    constructor(message: string, code: string) {
      super(message);
      this.name = "AuthorizationError";
      this.code = code;
    }
  }