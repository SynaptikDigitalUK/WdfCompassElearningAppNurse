import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';


// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true
  },
  build: {
    target: 'es2016',
  },
  plugins: [
    react(), 
    viteSingleFile({ removeViteModuleLoader: true }),

    ViteImageOptimizer({/* pass your config */}),

    VitePWA({
      
      /* PW UPDATE METHOD (auto vs prompt)*/
      registerType: 'autoUpdate',

      /* ITEMS TO BE STORED BY CLIENT */
      includeAssets: ['assets/**/*', 'js/**/*', 'buildinfo.json'],

      minify:false,
     
      workbox: {
        cacheId:'compass-elearning-nurse',
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },

     onInstalled() {
        // Cache additional assets post-installation here
        console.log('onInstalled')
      },
        
      manifest:{
        theme_color:'#A72906',
        name: "COMPASS ELEARNING FOR NURSES",
        short_name: "COMPASS FOR NURSES",
        icons:[
          {
            src:'/assets/icons/android-chrome-512x512.png',
            sizes:'512x512',
            type:'image/png',
            purpose:'any maskable'
          }
        ],
        prefer_related_applications: false

      }
    })
  ]
})
