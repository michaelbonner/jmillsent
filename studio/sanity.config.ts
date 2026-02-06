import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {dashboardTool} from '@sanity/dashboard'
import {vercelWidget} from 'sanity-plugin-dashboard-widget-vercel'
import {media} from 'sanity-plugin-media'
import {s3Files} from 'sanity-plugin-s3-files'
import {schemaTypes} from './schemaTypes'
import {Logo} from './components/Logo'

export default defineConfig({
  name: 'default',
  title: 'jmillsent',

  projectId: '0c7luntu',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    dashboardTool({
      widgets: [vercelWidget({layout: {width: 'full'}})],
    }),
    media(),
    s3Files({schemaPrefix: 's3-dam'}),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: Logo,
    },
  },
})
