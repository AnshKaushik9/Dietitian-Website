import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables for seeding (PROJECT_ID, DATASET, or TOKEN).')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
})

async function updateNavigation() {
  console.log('Updating navigation documents...')
  try {
    const navHeader = await client.getDocument('nav-header')
    if (navHeader && navHeader.headerNav) {
      const updatedHeaderNav = navHeader.headerNav.map((link: any) => {
        if (link.href === '/about') {
          return { ...link, label: 'Home', href: '/' }
        }
        return link
      })
      
      // if Home didn't exist and we didn't replace About, ensure Home is there
      if (!updatedHeaderNav.some((link: any) => link.href === '/')) {
         updatedHeaderNav.unshift({
            _key: require('crypto').randomUUID(),
            label: 'Home',
            href: '/',
            enabled: true,
            openInNewTab: false
         })
      }
      
      await client.patch('nav-header')
        .set({ headerNav: updatedHeaderNav })
        .commit()
      console.log('Updated nav-header')
    }

    // Now update nav-footer if it has About
    const navFooter = await client.getDocument('nav-footer')
    if (navFooter) {
       const footerArrays = ['footerQuickLinks', 'footerResources', 'footerContactSupport', 'footerLegal']
       for (const arrName of footerArrays) {
           if (navFooter[arrName]) {
               const updated = navFooter[arrName].filter((link: any) => link.href !== '/about')
               if (updated.length !== navFooter[arrName].length) {
                   await client.patch('nav-footer').set({ [arrName]: updated }).commit()
                   console.log(`Removed /about from ${arrName}`)
               }
           }
       }
    }
    
    console.log('Navigation update complete.')
  } catch (err) {
    console.error('Error updating navigation:', err)
  }
}

updateNavigation()
