import { UnitOfMeasurementNative, UnitOfMeasurementWeb, UnitPropsHandler } from "../types/unit-props.types";

export const unitPropsHandler: UnitPropsHandler = (
  units?: any,
  unitOfMeasurement?: UnitOfMeasurementNative | UnitOfMeasurementWeb
): any => {
  if (!unitOfMeasurement) {
    unitOfMeasurement = UnitOfMeasurementWeb.PX;
  }
  if (units && units === 'auto') {
    return units;
  }

  if (
    !units ||
    units === undefined ||
    units === 0 ||
    typeof units === 'undefined'
  ) {
    units = '0px';
  }

  const hasPercentage =
    units && units.toString().includes('%')
      ? units.toString().includes('%')
      : false;

  if (units && typeof units === 'number') {
    if (hasPercentage) {
      units = units.toString();
    } else {
      units = `${units}${unitOfMeasurement}`;
    }
  }

  return units.toString() as any;
};

