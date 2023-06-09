// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

export const initSentryLogger = () => {
  const useSentry = process.env.DISABLE_SENTRY !== 'true';
  if (!useSentry) return;

  return Sentry.init({
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 0.1, // determining the percentage chance a given trx will be sent to Sentry
  });
};
