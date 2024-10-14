import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMinPrise', async: false })
export class IsMinPrise implements ValidatorConstraintInterface {
  validate(value: string, args: any) {
    return value < args.object['price_max'];
  }

  defaultMessage(args: any) {
    return `Lower price range limit must be less than ${args.object['price_max']}`;
  }
}
