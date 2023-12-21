// gatsby-node.js
const { useGatsbyNode } = require('gatsby-plugin-ts-config')

// All of the same usage patterns for `useGatsbyConfig` are valid for `useGatsbyNode`
// as well
//eslint-disable-next-line
module.exports = useGatsbyNode(() => require('./config/gatsby-node'), {})
