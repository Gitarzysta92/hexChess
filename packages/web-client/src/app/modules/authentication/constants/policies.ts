import { InjectionToken } from '@angular/core';

export const policies = {
  login: 'Fusce justo orci, iaculis at ullamcorper dictum, tempus eget neque. Etiam cursus vulputate augue in pharetra <a target="_blank">Terms and conditions</a> Nullam tincidunt mollis lorem, eu porttitor leo scelerisque eget. In feugiat hendrerit rhoncus.'
};

export type AuthPolicies = typeof policies;
export const PoliciesToken = new InjectionToken<AuthPolicies>('auth.policies');
  