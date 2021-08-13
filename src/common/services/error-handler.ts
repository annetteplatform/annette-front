import {AnnetteError } from 'src/common';



export function annetteErrorHandler(error: any) {
  const annetteError: AnnetteError = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    code: error.response.data.code || '',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    errorCode: error.response.data.errorCode || error.response.status,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    messageType: error.response.data.messageType || 'E',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    params: error.response.data.params || {},
    originError: error
  }

  return Promise.reject(annetteError);
}
