import {AnnetteError } from 'src/common';



export function annetteErrorHandler(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  let code = error.response.data.code
  if (!code) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
    code = `annette.ui.httpError${error.response.status}`
  }
  const annetteError: AnnetteError = {
    code,
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
