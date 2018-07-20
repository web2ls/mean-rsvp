import { ENV } from './../core/env.config';

interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
    NAMESPACE: string;
  };

  export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'hJMwcvC28B3F0LrbxjixbbFkQKVEgTBt',
    CLIENT_DOMAIN: 'web2ls.eu.auth0.com', // e.g., you.auth0.com
    AUDIENCE: 'https://web2ls.eu.auth0.com/api/v2/', // e.g., http://localhost:8083/api/
    REDIRECT: `${ENV.BASE_URI}/callback`,
    SCOPE: 'openid profile',
    NAMESPACE: 'http://myapp.com/roles'
  };