import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default tseslint.config(
  ...compat.extends('@rocketseat/eslint-config/node'), {
  rules: {
    '@typescript-eslint/no-useless-controller': 'off'
  },
}
);
