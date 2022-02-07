import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export class ArrayTransformer implements ValueTransformer {
  to(arr: string[]): string {
    return JSON.stringify(arr);
  }

  from(str: string): Record<string, any> | undefined {
    if (!str) return;

    return JSON.parse(str);
  }
}
