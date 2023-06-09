import { isDevEnvironment } from '../../../utils/isDevEnvironment';

import type { CreateLeadRequest } from './create-lead';
import type { PostalCodesRequest } from './postal-codes';
import type { SendMailRequest } from './send-mail';

export const NextAPI = {
  createLead: (data: CreateLeadRequest['body']) => {
    if (!data.domain) return Promise.reject();

    const API_ROUTE = `/api/create-lead?API_ROUTE=${
      process.env.NEXT_PUBLIC_API_ROUTE ?? ''
    }`;

    const API = isDevEnvironment(data.domain)
      ? `http://${data.domain}${API_ROUTE}`
      : `https://${data.domain}${API_ROUTE}`;

    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  getPostalCodeDetails: (data: PostalCodesRequest['body']) => {
    if (!data.code) return Promise.reject();

    const API_ROUTE = `/api/postal-codes?API_ROUTE=${
      process.env.NEXT_PUBLIC_API_ROUTE ?? ''
    }`;

    const API = isDevEnvironment(data.domain)
      ? `http://${data.domain}${API_ROUTE}`
      : `https://${data.domain}${API_ROUTE}`;

    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  sendMail: (data: SendMailRequest['body']) => {
    if (!data.domain) return Promise.reject();

    const API_ROUTE = `/api/send-mail?PRIVATE_API_ROUTE=${
      process.env.PRIVATE_API_ROUTE ?? ''
    }`;

    const API = isDevEnvironment(data.domain)
      ? `http://${data.domain}${API_ROUTE}`
      : `https://${data.domain}${API_ROUTE}`;

    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};
