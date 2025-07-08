// import { ClassConstructor, plainToClass } from "class-transformer";
// import { ValidationError, validate } from "class-validator";
// const validationError = async (
//   input: any
// ): Promise<ValidationError[] | false> => {
//   const errors = await validate(input, {
//     validationError: { target: true },
//   });
//   if (errors.length) {
//     return errors;
//   }
//   return false;
// };
// export const RequestValidator = async <T>(
//   type: ClassConstructor<T>,
//   body: any
// ): Promise<{ errors: boolean | string; input: T }> => {
//   const input = plainToClass(type, body);
//   const errors = await validationError(input);
//   if (errors) {
//     const errorMessage = errors
//       .map((error: ValidationError) => {
//         return (Object as any).values(error.constraints);
//       })
//       .join(", ");
//     return { errors: errorMessage, input };
//   }
//   return { errors: false, input };
// };

import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";

const validationError = async (
  input: any
): Promise<ValidationError[] | false> => {
  const errors = await validate(input, {
    validationError: { target: true },
  });
  return errors.length ? errors : false;
};

export const RequestValidator = async <T>(
  type: ClassConstructor<T>,
  body: any
): Promise<{ errors: false | string; input: T }> => {
  if (!body || typeof body !== 'object') {
    throw new Error("Invalid request body: expected a JSON object.");
  }

  const input = plainToInstance(type, body);
  const errors = await validationError(input);

  if (errors) {
    const errorMessage = errors
      .map((error: ValidationError) => {
        return Object.values(error.constraints || {}).join(", ");
      })
      .join(", ");
    return { errors: errorMessage, input };
  }

  return { errors: false, input };
};
