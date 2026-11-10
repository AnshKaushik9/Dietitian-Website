import type { Metadata } from "next";
import { SupportForm } from "@/components/shared/SupportForm";
import { sanityFetch } from '@/sanity/lib/client'
import { settingsQuery, supportPageQuery } from '@/sanity/lib/queries'
export const metadata: Metadata = {
  title: "Technical Support",
  description: "Get technical support for the website.",
};

export default async function SupportPage() {
  const settings = await sanityFetch<any>({ query: settingsQuery })
  const pageData = await sanityFetch<any>({ query: supportPageQuery })
  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
          {pageData?.heroHeading || "Technical Support"}
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          {pageData?.heroDescription || "If you are experiencing any technical issues with our website or application, please let us know. This support channel is strictly for website technical issues, not for nutrition consultation."}
        </p>

        <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
          <h2 className="font-heading text-2xl font-semibold mb-6">{pageData?.formHeading || "Report an Issue"}</h2>
          {pageData?.formDescription && <p className="text-muted-foreground mb-6">{pageData.formDescription}</p>}
          
          <SupportForm 
            accessKey={process.env.WEB3FORMS_ACCESS_KEY || ''} 
            submitButtonText={pageData?.submitButtonText}
            successMessage={pageData?.successMessage}
            errorMessage={pageData?.errorMessage}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-2">{pageData?.helpSectionHeading1 || "Direct Contact"}</h3>
            <p className="text-muted-foreground">
              Email us directly at:<br />
              <a href={`mailto:${settings?.supportEmail || "support@example.com"}`} className="text-primary hover:underline">{settings?.supportEmail || "support@example.com"}</a>
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold mb-2">{pageData?.helpSectionHeading2 || "Response Time"}</h3>
            <p className="text-muted-foreground">
              {settings?.expectedResponseTime || "We typically respond to technical support inquiries within 24-48 business hours."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
