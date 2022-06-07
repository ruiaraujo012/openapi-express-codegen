import type { Interface } from './Interface';
import type { Model } from './Model';

export interface Client {
    version: string;
    server: string;
    models: Model[];
    interfaces: Interface[];
}
