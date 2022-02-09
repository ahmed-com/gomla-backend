import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  const maxDate = 10 * 365 * 24 * 60 * 60 * 1000; // 10 years

  export function IsValidBuyingDate(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
      registerDecorator({
        name: 'IsValidBuyingDate',
        target: object.constructor,
        propertyName,
        constraints: [],
        options: validationOptions,
        validator: {
          validate(value: string, _args: ValidationArguments) {
            const mysqlDateFormat = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
            if(!mysqlDateFormat.test(value)) return false;
            const date = new Date(value);
            if(
                (date < new Date(Date.now())) ||
                (date > new Date(Date.now() + maxDate))
            ) return false;
            return true;
          },
        },
      });
    };
  }
  