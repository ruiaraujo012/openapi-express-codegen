import type { Operation } from './Operation';

export interface Interface {
    name: string;
    operations: Operation[];
    imports: string[];
}
