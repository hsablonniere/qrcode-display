import rollupCommonjs from '@rollup/plugin-commonjs';
import { fromRollup } from '@web/dev-server-rollup';

const commonjs = fromRollup(rollupCommonjs);

export default {
  port: 8080,
  nodeResolve: true,
  watch: true,
  plugins: [
    // commonjs({
      // include: 'node_modules/jsqr/**',
    // }),
  ],
};
