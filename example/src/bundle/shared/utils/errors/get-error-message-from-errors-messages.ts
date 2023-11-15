import isEmpty from 'lodash.isempty';

export const getErrorMessageFromErrorMessages = (
  field: any,
  errors: { [key: string]: any }
): string | null => {
  if (!isEmpty(errors) && errors.hasOwnProperty('message')) {
    const { message } = errors;
    if (message && Array.isArray(message)) {
      const messages = message || [];
      const messageToBeFound = messages.find((msg) => msg.includes(field));
      if (messageToBeFound) {
        return messageToBeFound;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};
