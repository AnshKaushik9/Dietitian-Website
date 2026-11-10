'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'

export function CalWidget({ calLink }: { calLink: string }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal('ui', {
        styles: { branding: { brandColor: '#2D3748' } },
        hideEventTypeDetails: true,
        layout: 'month_view'
      })
    })()
  }, [])

  return (
    <div className="w-full h-full min-h-[600px]">
      <Cal
        calLink={calLink}
        style={{ width: '100%', height: '100%', overflow: 'scroll', minHeight: '600px' }}
        config={{ layout: 'month_view' }}
      />
    </div>
  )
}
