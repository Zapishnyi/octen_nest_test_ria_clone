import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMaxPrise', async: false })
export class IsMaxPrise implements ValidatorConstraintInterface {
  validate(value: string, args: any) {
    return value > args.object['price_min'];
  }

  defaultMessage(args: any) {
    return `Upper price range limit must be greater than ${args.object['price_min']}`;
  }
}
