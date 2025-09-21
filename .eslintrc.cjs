/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  plugins: ['regexp'],
  rules: {
    // Forbid oversized Tailwind text/w/h classes (7xl+ or explicit px >= 48)
    'regexp/no-misleading-character-class': 'off',
    'regexp/optimal-quantifier-concatenation': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: "Literal[value=/text-(?:7|8|9)xl|w-(?:2[0-9]|[3-9]\\d)|h-(?:2[0-9]|[3-9]\\d)|fontSize:\\s*(4[1-9]|[5-9]\\d)/]",
        message: 'Icon exceeds xl (40px). Use <Icon size="xl" /> or smaller.'
      }
    ]
  }
};
