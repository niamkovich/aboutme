import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**'],
  },

  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  astro.configs.recommended,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Unused args are fine when prefixed with _, which is how the codebase
      // marks positional parameters it has to accept but does not use.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  {
    // astro-eslint-parser cannot build a TypeScript program for .astro files, so
    // every type-aware rule sees `error` types and reports false positives.
    // `npm run check` (astro check → tsc) type-checks these files properly.
    files: ['**/*.astro'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: false,
      },
    },
  },

  {
    // set:html is how CV prose reaches the page. The markdown it renders is
    // escaped in src/lib/inline-markdown.ts before any tag is emitted, so the
    // blanket ban would only be noise here.
    files: ['src/components/**/*.astro'],
    rules: {
      'astro/no-set-html-directive': 'off',
    },
  },

  {
    // Config files sit outside tsconfig's include, so typed rules have no
    // program to check them against.
    files: ['**/*.js', '**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Must stay last: turns off everything Prettier already decides.
  prettier,
);
