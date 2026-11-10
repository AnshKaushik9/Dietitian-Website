import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing required environment variables for seeding (PROJECT_ID, DATASET, or TOKEN)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log("Seeding comprehensive initial data...");
  try {
    // -------------------------------------------------------------------------
    // 1. Site Settings
    // -------------------------------------------------------------------------
    const settings = await client.createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      title: "BRAND NAME | Clinical Dietitian",
      description:
        "Expert, condition-based nutrition therapy for sustainable health and wellness.",
      medicalDisclaimer:
        "The information provided on this website is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
    });
    console.log(`Created Site Settings: ${settings._id}`);

    // -------------------------------------------------------------------------
    // 2. Navigation Menus (Header & Footer)
    // -------------------------------------------------------------------------
    const headerNav = await client.createOrReplace({
      _id: "nav-header",
      _type: "navigation",
      title: "Header Navigation",
      links: [
        { _key: uuidv4(), label: "Home", href: "/" },
        { _key: uuidv4(), label: "Services", href: "/services" },
        { _key: uuidv4(), label: "Blog", href: "/blog" },
        { _key: uuidv4(), label: "Contact", href: "/contact" },
      ],
    });
    console.log(`Created Header Nav: ${headerNav._id}`);

    const footerNav = await client.createOrReplace({
      _id: "nav-footer",
      _type: "navigation",
      title: "Footer Navigation",
      links: [
        { _key: uuidv4(), label: "Services", href: "/services" },
        { _key: uuidv4(), label: "Success Stories", href: "/success-stories" },
        {
          _key: uuidv4(),
          label: "Book your Consultation",
          href: "/book-consultation",
        },
        { _key: uuidv4(), label: "Privacy Policy", href: "/privacy-policy" },
        { _key: uuidv4(), label: "Terms of Service", href: "/terms" },
      ],
    });
    console.log(`Created Footer Nav: ${footerNav._id}`);

    // -------------------------------------------------------------------------
    // 3. Conditions (8-10)
    // -------------------------------------------------------------------------
    const conditionsData = [
      {
        title: "Irritable Bowel Syndrome (IBS)",
        slug: "ibs",
        desc: "Comprehensive management of IBS symptoms through targeted dietary protocols and lifestyle changes.",
      },
      {
        title: "Polycystic Ovary Syndrome (PCOS)",
        slug: "pcos",
        desc: "Nutritional strategies to manage hormonal imbalances, insulin resistance, and PCOS symptoms.",
      },
      {
        title: "Type 2 Diabetes",
        slug: "type-2-diabetes",
        desc: "Evidence-based blood sugar management and insulin sensitivity improvement plans.",
      },
      {
        title: "Thyroid Disorders",
        slug: "thyroid-disorders",
        desc: "Support for Hashimoto’s and Hypothyroidism through anti-inflammatory nutrition.",
      },
      {
        title: "Gut Dysbiosis & SIBO",
        slug: "sibo",
        desc: "Gut microbiome restoration protocols to alleviate bloating and digestive discomfort.",
      },
      {
        title: "High Cholesterol",
        slug: "high-cholesterol",
        desc: "Heart-healthy dietary interventions to naturally lower LDL and improve cardiovascular health.",
      },
      {
        title: "Autoimmune Conditions",
        slug: "autoimmune",
        desc: "Nutrition therapy designed to reduce systemic inflammation and support immune regulation.",
      },
      {
        title: "Fatty Liver Disease",
        slug: "fatty-liver",
        desc: "Hepatoprotective diets focused on reversing non-alcoholic fatty liver disease (NAFLD).",
      },
      {
        title: "Perimenopause & Menopause",
        slug: "menopause",
        desc: "Nutritional support for hormonal transitions, bone health, and metabolic changes.",
      },
    ];

    const conditionDocs = await Promise.all(
      conditionsData.map(async (cond) => {
        return await client.create({
          _type: "condition",
          title: cond.title,
          slug: { current: cond.slug },
          shortDescription: cond.desc,
        });
      })
    );
    console.log(`Created ${conditionDocs.length} Conditions`);

    // -------------------------------------------------------------------------
    // 4. Services (6)
    // -------------------------------------------------------------------------
    const servicesData = [
      {
        title: "Initial Clinical Assessment",
        slug: "initial-assessment",
        desc: "A comprehensive 90-minute evaluation of your medical history, dietary habits, and lifestyle factors to establish a baseline for your personalized care plan.",
        conditions: [0, 1, 2, 3, 4, 5, 6, 7, 8], // Indices from conditionDocs
      },
      {
        title: "Gut Microbiome Protocol",
        slug: "gut-protocol",
        desc: "A structured, multi-phase nutrition plan designed to identify triggers, heal the gut lining, and restore microbiome balance.",
        conditions: [0, 4, 6],
      },
      {
        title: "Metabolic & Hormonal Reset",
        slug: "hormonal-reset",
        desc: "Targeted dietary interventions aimed at improving insulin sensitivity, balancing hormones, and supporting metabolic flexibility.",
        conditions: [1, 2, 8],
      },
      {
        title: "Cardiovascular Health Plan",
        slug: "cardio-health",
        desc: "Evidence-based nutrition therapy focused on lipid management, blood pressure reduction, and overall heart health.",
        conditions: [2, 5, 7],
      },
      {
        title: "Autoimmune Nutrition Therapy",
        slug: "autoimmune-therapy",
        desc: "Specialized anti-inflammatory protocols designed to manage flare-ups and support immune system regulation.",
        conditions: [3, 6],
      },
      {
        title: "Follow-up Consultation",
        slug: "follow-up",
        desc: "A 45-minute check-in to review progress, interpret new lab results, adjust your nutrition plan, and ensure continued success.",
        conditions: [],
      },
    ];

    const serviceDocs = await Promise.all(
      servicesData.map(async (srv) => {
        return await client.create({
          _type: "service",
          title: srv.title,
          slug: { current: srv.slug },
          description: [
            { _type: "block", children: [{ _type: "span", text: srv.desc }] },
          ],
          conditionsCovered: srv.conditions.map((idx) => ({
            _type: "reference",
            _ref: conditionDocs[idx]._id,
          })),
          cta: {
            label: "Book This Service",
            link: "/book-consultation",
            variant: "default",
          },
        });
      })
    );
    console.log(`Created ${serviceDocs.length} Services`);

    // -------------------------------------------------------------------------
    // 5. Testimonials (3-5)
    // -------------------------------------------------------------------------
    const testimonialsData = [
      {
        name: "Sarah M.",
        quote:
          "The gut protocol completely changed my life. After years of dealing with severe IBS, I finally have my energy back and no longer fear eating.",
        isAnon: false,
        cond: 0,
      },
      {
        name: "Anonymous Patient",
        quote:
          "I was struggling with PCOS and weight resistance. This clinical, science-backed approach helped me regulate my cycle naturally.",
        isAnon: true,
        cond: 1,
      },
      {
        name: "David L.",
        quote:
          "My cholesterol dropped 40 points in just 3 months without medication. The nutrition strategies were realistic and easy to integrate into my busy life.",
        isAnon: false,
        cond: 5,
      },
      {
        name: "Emily R.",
        quote:
          "Understanding my Hashimoto’s triggers was the key. The anti-inflammatory plan was a game changer for my daily fatigue.",
        isAnon: false,
        cond: 3,
      },
    ];

    const testimonialDocs = await Promise.all(
      testimonialsData.map(async (test) => {
        return await client.create({
          _type: "testimonial",
          clientName: test.name,
          isAnonymous: test.isAnon,
          quote: test.quote,
          conditionCategory: {
            _type: "reference",
            _ref: conditionDocs[test.cond]._id,
          },
          mediaType: "text",
          approvalStatus: "Approved",
        });
      })
    );
    console.log(`Created ${testimonialDocs.length} Testimonials`);

    // -------------------------------------------------------------------------
    // 6. FAQs (5-8)
    // -------------------------------------------------------------------------
    const faqsData = [
      {
        q: "Do you accept health insurance?",
        a: "I operate as an out-of-network provider. However, I can provide you with a superbill that you can submit to your insurance company for potential reimbursement.",
      },
      {
        q: "Are consultations conducted virtually or in-person?",
        a: "All consultations are conducted 100% virtually via a secure, HIPAA-compliant telehealth platform, allowing you to connect from the comfort of your home.",
      },
      {
        q: "What happens during the initial consultation?",
        a: "We will review your detailed medical history, current symptoms, recent lab work, and dietary habits to create a personalized, actionable clinical nutrition plan.",
      },
      {
        q: "Do I need to do lab testing before we meet?",
        a: "It is highly recommended to have recent (within 6 months) comprehensive blood work, but we can begin our work and I can request specific labs if necessary.",
      },
      {
        q: "Do you prescribe supplements?",
        a: "Yes, if clinically indicated. I recommend high-quality, third-party tested supplements to support your nutrition plan, but a food-first approach is always prioritized.",
      },
      {
        q: "How often do we meet?",
        a: "Frequency depends on your specific condition and goals. Typically, we meet every 2-4 weeks during the active protocol phase, followed by maintenance check-ins.",
      },
    ];

    const faqDocs = await Promise.all(
      faqsData.map(async (faq) => {
        return await client.create({
          _type: "faq",
          question: faq.q,
          answer: [
            { _type: "block", children: [{ _type: "span", text: faq.a }] },
          ],
        });
      })
    );
    console.log(`Created ${faqDocs.length} FAQs`);

    // -------------------------------------------------------------------------
    // 7. Blog Categories & 1 Placeholder Post
    // -------------------------------------------------------------------------
    const cat1 = await client.create({
      _type: "category",
      title: "Gut Health",
      slug: { current: "gut-health" },
      description: "Articles related to digestion and the microbiome.",
    });
    await client.create({
      _type: "category",
      title: "Hormonal Balance",
      slug: { current: "hormonal-balance" },
      description: "Nutrition strategies for endocrine health.",
    });
    console.log("Created Blog Categories");

    const author1 = await client.create({
      _type: "author",
      name: "Clinical Dietitian",
      slug: { current: "clinical-dietitian" },
      bio: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Lead dietitian specializing in complex chronic conditions.",
            },
          ],
        },
      ],
    });

    const post1 = await client.create({
      _type: "post",
      title: "Understanding the Gut-Brain Axis",
      slug: { current: "understanding-gut-brain-axis" },
      author: { _type: "reference", _ref: author1._id },
      categories: [{ _type: "reference", _ref: cat1._id }],
      publishedAt: new Date().toISOString(),
      excerpt:
        "How your digestive system directly influences your mood, anxiety, and overall mental well-being.",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The gut-brain axis is a bidirectional communication network...",
            },
          ],
        },
      ],
    });
    console.log(`Created Blog Post: ${post1._id}`);

    // -------------------------------------------------------------------------
    // 8. Generic Legal Pages & Contact
    // -------------------------------------------------------------------------
    await client.create({
      _type: "page",
      title: "Contact Information",
      slug: { current: "contact" },
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "[PLACEHOLDER: Contact information. Phone: (555) 123-4567. Email: hello@dietitian.com. Address: 123 Wellness Way, Healthy City, ST 12345]",
            },
          ],
        },
      ],
    });
    await client.create({
      _type: "page",
      title: "Privacy Policy",
      slug: { current: "privacy-policy" },
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "[PLACEHOLDER: Legal Privacy Policy text. We respect your privacy and handle medical data securely according to HIPAA/GDPR guidelines.]",
            },
          ],
        },
      ],
    });
    await client.create({
      _type: "page",
      title: "Terms of Service",
      slug: { current: "terms" },
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "[PLACEHOLDER: Legal Terms of Service text.]",
            },
          ],
        },
      ],
    });
    console.log(`Created Contact and Legal Pages`);

    // -------------------------------------------------------------------------
    // 9. Homepage
    // -------------------------------------------------------------------------
    const homepage = await client.createOrReplace({
      _id: "homepage",
      _type: "homepage",
      title: "Homepage",
      sections: [
        {
          _key: uuidv4(),
          _type: "heroSection",
          headline: "Evidence-Based Clinical Nutrition",
          subheadline:
            "Personalized, holistic dietary interventions for gut health, hormonal balance, and complex chronic conditions.",
          primaryCta: {
            label: "Book a Consultation",
            link: "/book-consultation",
          },
          secondaryCta: { label: "Explore Services", link: "/services" },
        },
        {
          _key: uuidv4(),
          _type: "credentialsSection",
          title: "Trusted by Patients & Healthcare Providers",
          yearsOfExperience: 12,
          qualification: "Registered Clinical Dietitian (RD)",
          certifications: "Board Certified in Medical Nutrition Therapy",
          patientsGuided: 1000,
          evidenceBasedApproach: true,
        },
        {
          _key: uuidv4(),
          _type: "whyChooseMeSection",
          title: "A Holistic, Root-Cause Approach",
          description: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "I combine rigorous clinical expertise with compassionate, individualized care to help you achieve sustainable, long-term health outcomes.",
                },
              ],
            },
          ],
          bulletPoints: [
            "Comprehensive Root-Cause Analysis",
            "100% Science-Backed Protocols",
            "Continuous Guidance & Support",
            "Focus on Long-Term Habit Building",
          ],
        },
        {
          _key: uuidv4(),
          _type: "conditionsTreatedSection",
          title: "Clinical Specialties",
          subtitle:
            "Targeted nutrition therapy for managing complex health challenges.",
          conditions: [
            { _key: uuidv4(), _type: "reference", _ref: conditionDocs[0]._id },
            { _key: uuidv4(), _type: "reference", _ref: conditionDocs[1]._id },
            { _key: uuidv4(), _type: "reference", _ref: conditionDocs[2]._id },
            { _key: uuidv4(), _type: "reference", _ref: conditionDocs[3]._id },
            { _key: uuidv4(), _type: "reference", _ref: conditionDocs[4]._id },
            { _key: uuidv4(), _type: "reference", _ref: conditionDocs[5]._id },
          ],
        },
        {
          _key: uuidv4(),
          _type: "servicesPreviewSection",
          title: "Professional Nutrition Services",
          subtitle:
            "Expert guidance tailored to your specific clinical and metabolic needs.",
          services: [
            { _key: uuidv4(), _type: "reference", _ref: serviceDocs[0]._id },
            { _key: uuidv4(), _type: "reference", _ref: serviceDocs[1]._id },
            { _key: uuidv4(), _type: "reference", _ref: serviceDocs[2]._id },
            { _key: uuidv4(), _type: "reference", _ref: serviceDocs[3]._id },
          ],
        },
        {
          _key: uuidv4(),
          _type: "testimonialsSection",
          title: "Patient Success Stories",
          testimonials: testimonialDocs.map((t) => ({
            _key: uuidv4(),
            _type: "reference",
            _ref: t._id,
          })),
        },
        {
          _key: uuidv4(),
          _type: "faqSection",
          title: "Frequently Asked Questions",
          faqs: faqDocs.map((f) => ({
            _key: uuidv4(),
            _type: "reference",
            _ref: f._id,
          })),
        },
        {
          _key: uuidv4(),
          _type: "consultationProcessSection",
          title: "Your Journey to Better Health",
          subtitle:
            "A structured, proven approach to achieving your wellness goals.",
          steps: [
            {
              _key: uuidv4(),
              title: "1. Discover",
              description:
                "Initial deep dive into your health history, current symptoms, and long-term goals.",
            },
            {
              _key: uuidv4(),
              title: "2. Assessment",
              description:
                "Comprehensive review of lab results and metabolic data.",
            },
            {
              _key: uuidv4(),
              title: "3. Personalized Plan",
              description:
                "Development of your customized nutrition and lifestyle protocol.",
            },
            {
              _key: uuidv4(),
              title: "4. Follow-up",
              description:
                "Regular check-ins to monitor progress and adjust the protocol.",
            },
            {
              _key: uuidv4(),
              title: "5. Progress Tracking",
              description:
                "Continuous support and objective tracking of your health metrics.",
            },
          ],
        },
        {
          _key: uuidv4(),
          _type: "blogPreviewSection",
          title: "Latest Insights",
          subtitle:
            "Evidence-based articles on nutrition, wellness, and holistic health.",
          viewAllCta: { label: "View All Articles", link: "/blog" },
        },
        {
          _key: uuidv4(),
          _type: "ctaBannerSection",
          headline: "Ready to transform your health?",
          subheadline:
            "Schedule your initial assessment today and take the first step towards sustainable wellness.",
          cta: { label: "Book Consultation", link: "/book-consultation" },
          secondaryCta: {
            label: "Chat on WhatsApp",
            link: "https://wa.me/1234567890",
          },
        },
      ],
    });
    console.log(`Created Homepage: ${homepage._id}`);
    console.log(`Created Homepage: ${homepage._id}`);

    // 11. Create About Page
    const aboutPage = await client.createOrReplace({
      _id: "aboutPage",
      _type: "aboutPage",
      title: "About Page",
      seo: {
        metaTitle: "About Me | Dietitian",
        metaDescription: "Learn more about my qualifications and approach.",
      },
      hero: {
        headline: "My Journey & Philosophy",
        subheadline:
          "Dedicated to helping you achieve sustainable wellness through evidence-based nutrition.",
      },
      story: {
        title: "The Story Behind the Practice",
        content: [
          {
            _type: "block",
            _key: uuidv4(),
            style: "normal",
            children: [
              {
                _type: "span",
                _key: uuidv4(),
                text: "With over a decade of clinical experience, I started this practice to bridge the gap between medical advice and practical, everyday nutrition.",
              },
            ],
          },
        ],
      },
      qualifications: [
        {
          _key: uuidv4(),
          title: "Registered Dietitian",
          description: "Certified by the Academy of Nutrition and Dietetics.",
        },
        {
          _key: uuidv4(),
          title: "M.S. in Clinical Nutrition",
          description: "Advanced degree focusing on metabolic health.",
        },
      ],
      experienceTimeline: [
        {
          _key: uuidv4(),
          year: "2015 - Present",
          role: "Founder & Lead Dietitian",
          company: "Private Practice",
          description:
            "Helping hundreds of clients achieve their health goals.",
        },
        {
          _key: uuidv4(),
          year: "2012 - 2015",
          role: "Clinical Dietitian",
          company: "General Hospital",
          description:
            "Specialized in gastrointestinal disorders and critical care.",
        },
      ],
      certifications: [
        {
          _key: uuidv4(),
          title: "Board Certified Support Specialist",
          issuer: "Medical Board",
        },
      ],
      philosophy: {
        title: "Food as Medicine",
        content: [
          {
            _type: "block",
            _key: uuidv4(),
            style: "normal",
            children: [
              {
                _type: "span",
                _key: uuidv4(),
                text: "I believe in holistic, personalized nutrition. No fad diets, just science-backed protocols tailored to your unique biology.",
              },
            ],
          },
        ],
      },
      cta: {
        headline: "Start Your Journey",
        subheadline: "Ready to take control of your health?",
        cta: { label: "Book Consultation", link: "/book-consultation" },
      },
    });
    console.log(`Created About Page: ${aboutPage._id}`);

    // 12. Create Services Page
    const servicesPage = await client.createOrReplace({
      _id: "servicesPage",
      _type: "servicesPage",
      title: "Services Page",
      seo: {
        metaTitle: "Services | Dietitian",
        metaDescription: "Explore our range of clinical nutrition services.",
      },
      hero: {
        headline: "Comprehensive Nutrition Services",
        subheadline: "Tailored protocols for your unique clinical needs.",
      },
      cta: {
        headline: "Not sure which service is right for you?",
        subheadline: "Book a discovery call today.",
        cta: { label: "Book Consultation", link: "/book-consultation" },
      },
    });
    console.log(`Created Services Page: ${servicesPage._id}`);

    // 13. Create Conditions Page
    const conditionsPage = await client.createOrReplace({
      _id: "conditionsPage",
      _type: "conditionsPage",
      title: "Conditions Page",
      seo: {
        metaTitle: "Conditions Treated | Dietitian",
        metaDescription:
          "We specialize in treating a wide variety of metabolic and gastrointestinal conditions.",
      },
      hero: {
        headline: "Conditions We Treat",
        subheadline:
          "Expert, evidence-based management for chronic and acute conditions.",
      },
      faq: {
        title: "Frequently Asked Questions",
        faqs: faqDocs
          .slice(0, 3)
          .map((f) => ({ _key: uuidv4(), _type: "reference", _ref: f._id })),
      },
      cta: {
        headline: "Ready to find relief?",
        subheadline: "Get a personalized treatment plan.",
        cta: { label: "Book Consultation", link: "/book-consultation" },
      },
    });
    console.log(`Created Conditions Page: ${conditionsPage._id}`);

    // 14. Create Blog Page
    const blogPage = await client.createOrReplace({
      _id: "blogPage",
      _type: "blogPage",
      title: "Blog Page",
      seo: {
        metaTitle: "Blog & Articles | Dietitian",
        metaDescription: "Read the latest insights on nutrition and wellness.",
      },
      hero: {
        headline: "Nutrition Insights & Articles",
        subheadline:
          "Stay updated with evidence-based research and holistic wellness tips.",
      },
      cta: {
        headline: "Want customized advice?",
        subheadline: "Book a 1-on-1 session with our experts.",
        cta: { label: "Book Consultation", link: "/book-consultation" },
      },
    });
    console.log(`Created Blog Page: ${blogPage._id}`);
    console.log("--- SEEDING COMPLETE ---");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seed();
