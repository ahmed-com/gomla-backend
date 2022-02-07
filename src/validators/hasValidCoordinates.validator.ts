import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Point } from 'geojson';

export function HasValidCoordinates(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'HasValidCoordinates',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: Point, _args: ValidationArguments) {
          if (
            value.coordinates[0] >= -180 &&
            value.coordinates[0] <= 180 &&
            value.coordinates[1] >= -90 &&
            value.coordinates[1] <= 90 &&
            value.coordinates.length === 2 &&
            value.bbox === undefined
          )
            return true;
          return false;
        },
      },
    });
  };
}
