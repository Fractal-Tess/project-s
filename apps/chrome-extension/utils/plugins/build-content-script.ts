import colorLog from '../log';
import { PluginOption, build } from 'vite';
import { resolve } from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const packages = [
  {
    content: resolve(__dirname, '../../', 'src/pages/content/index.tsx'),
  },
];

const outDir = resolve(__dirname, '../../', 'build');

export default function buildContentScript(): PluginOption {
  return {
    name: 'build-content',
    async buildEnd() {
      for (const _package of packages) {
        await build({
          publicDir: false,
          plugins: [cssInjectedByJsPlugin()],
          build: {
            outDir,
            sourcemap: process.env.__DEV__ === 'true',
            emptyOutDir: false,
            rollupOptions: {
              input: _package,
              output: {
                entryFileNames: (chunk) => {
                  return `src/pages/${chunk.name}/index.js`;
                },
              },
            },
          },
          configFile: false,
        });
      }
      colorLog('Content code build successfully', 'success');
    },
  };
}
