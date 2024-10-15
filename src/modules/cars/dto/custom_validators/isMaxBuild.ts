import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMaxPrise', async: false })
export class IsMaxBuild implements ValidatorConstraintInterface {
  validate(value: string, args: any) {
    return value > args.object['build_min'];
  }

  defaultMessage(args: any) {
    return `Upper price range limit must be greater than ${args.object['build_min']}`;
  }
}
