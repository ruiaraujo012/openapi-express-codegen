/* eslint-disable id-length */
import type { Interface } from '../client/interfaces/Interface';

export const sortInterfacesByName = (interfaces: Interface[]): Interface[] => {
  return interfaces.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    return nameA.localeCompare(nameB, 'en');
  });
};
