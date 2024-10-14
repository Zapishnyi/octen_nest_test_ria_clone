// import {
//   ValidationArguments,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
//
// import { CarBaseReqDto } from '../../modules/cars/dto/req/car-base.req.dto';
//
//
// @ValidatorConstraint({ async: false }) // Set to true if you want async logic
// export class IsInDynamicArray implements ValidatorConstraintInterface {
//   validate(value: string, args: ValidationArguments) {
//     const brands = CarBaseReqDto.brands; // Get the updated brands array dynamically
//     return brands.includes(value); // Check if the value exists in the brands array
//   }
//
//   defaultMessage(args: ValidationArguments) {
//     return `The brand ${args.value} is not in the list of allowed brands:${CarBaseReqDto.brands}.`;
//   }
// }
