export const getErrorMessageFromErrorObject = (
  field: string,
  errors: { [key: string]: any }
) => {
  if (errors && errors[`${field}`]) {
    return errors[`${field}`];
  } else {
    return null;
  }
};
