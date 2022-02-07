import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsLettersOnly(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
      registerDecorator({
        name: 'IsLettersOnly',
        target: object.constructor,
        propertyName,
        constraints: [],
        options: validationOptions,
        validator: {
          validate(value: string, _args: ValidationArguments) {
            const validCharacters =
              /^[\sa-zA-Z\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF]*$/;
            return validCharacters.test(value);
          },
        },
      });
    };
  }
  