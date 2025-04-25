/**
 * Options for role‑based access control.
 */
export interface AuthorizationOptions {
    /** Which roles are allowed */
    hasRole: Array<"admin" | "manager" | "teamMember">;
    /** Whether a user can act on their own resource when IDs match */
    allowSameUser?: boolean;
  }
  