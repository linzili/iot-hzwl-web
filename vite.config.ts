import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    Components({
      dirs: ['src/'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
          resolveIcons: true
        }),
        IconsResolver({})
      ]
    }),
    AutoImport({
      dirs: ['./src/hooks/**', './src/utils/**', './src/api/**', './src/stores/**'],
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true
        }),
        IconsResolver({})
      ],
      dts: true
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      iconCustomizer(collection, icon, props) {
        props.width = '14px'
        props.height = '14px'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
