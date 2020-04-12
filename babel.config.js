module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    'stage-2'
  ],
  plugins: ["transform-vue-jsx", "transform-runtime"]
};
