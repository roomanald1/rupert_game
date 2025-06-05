import {TsCheckerRspackPlugin} from 'ts-checker-rspack-plugin';
import NodePolyfillPlugin from '@rspack/plugin-node-polyfill';



export default {
  target: "node",
  plugins: [new TsCheckerRspackPlugin(),new NodePolyfillPlugin()],
  resolve: {
    extensions: ['.ts', '.js', '.json'], // Add `.ts` here
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
};