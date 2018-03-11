/**
 * Turns error to type Object if it is a string
 * @param {String | Object} error
 */
export const errorTransformer = (error) => {
  if (typeof error === 'string') {
    throw {status: 'Error', message: error};
  }
  throw error;
};