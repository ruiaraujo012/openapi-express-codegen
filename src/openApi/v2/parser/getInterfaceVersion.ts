/**
 * Convert the interface version to 'normal' version.
 * This basically removes any "v" prefix from the version string.
 * @param version
 */
export const getInterfaceVersion = (version = '1.0'): string => {
  return String(version).replace(/^v/gi, '');
};
