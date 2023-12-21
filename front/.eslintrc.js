module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: ['teacode'],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
  },
  ignorePatterns: ['gatsby-graphql.ts'],
}
