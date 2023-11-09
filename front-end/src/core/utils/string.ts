/**
 * Convert a string from kebab-case or snake_case to camelCase.
 * e.g. my-component => myComponent
 *      my_component => myComponent
 **/
export const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};
