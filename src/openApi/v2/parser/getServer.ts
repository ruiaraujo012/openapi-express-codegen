import type { OpenApi } from '../interfaces/OpenApi';

/**
 * Get the base server url.
 * @param openApi
 */
export const getServer = (openApi: OpenApi): string => {
  const scheme = openApi.schemes?.[0] || 'http';
  const { host } = openApi;
  const basePath = openApi.basePath || '';
  const url = host ? `${scheme}://${host}${basePath}` : basePath;

  return url.replace(/\/$/g, '');
};
