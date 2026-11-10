import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemaTypes'
import { projectId, dataset } from '@/sanity/env'
import { structure } from '@/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  
  title: 'Dietitian Platform',

  schema: {
    types: schemaTypes,
  },

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],
})
