import { SetMetadata } from '@nestjs/common';
// custom decorator to create metadata "SKIP_AUTH" if endpoint must be skipped
export const SkipAuth = () => SetMetadata('SKIP_AUTH', true);
