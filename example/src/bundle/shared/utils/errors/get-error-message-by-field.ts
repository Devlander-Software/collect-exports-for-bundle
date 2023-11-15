import isEmpty from 'lodash.isempty';

import { logError } from '../logger/logger';
import { getErrorMessageFromErrorObject } from './get-error-from-errors-object';
import { getErrorMessageFromErrorMessages } from './get-error-message-from-errors-messages';

// ... Sentry setup code ...

export interface ErrorMessages {
  [key: string]: any;
  message?: string[];
}

export const getErrorMessageByField = (
  fieldsToCheck: string | string[],
  errors: ErrorMessages
): string | undefined => {
  const getMessageForField = (field: string): string | undefined => {
    if (!isEmpty(errors) && getErrorMessageFromErrorObject(field, errors)) {
      const errorMessage = getErrorMessageFromErrorObject(field, errors);
      logError(`Error for field ${field}: ${errorMessage}`);
      return errorMessage;
    } else if (
      !isEmpty(errors) &&
      getErrorMessageFromErrorMessages(field, errors)
    ) {
      const errorMessage = getErrorMessageFromErrorMessages(field, errors);
      logError(`Error for field ${field}: ${errorMessage}`);
      return errorMessage as any;
    }
    return undefined; // Ensure this returns undefined rather than null
  };

  if (typeof fieldsToCheck === 'string') {
    return getMessageForField(fieldsToCheck);
  } else if (Array.isArray(fieldsToCheck)) {
    let messageToReturn: string | undefined = undefined;
    fieldsToCheck.forEach((f) => {
      if (getMessageForField(f)) {
        messageToReturn = getMessageForField(f);
      }
    });

    return messageToReturn;
  } else {
    return undefined;
  }
};
