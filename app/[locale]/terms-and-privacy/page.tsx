import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostContent from '@/components/PostContent';
import TableOfContents from '@/components/TableOfContent';
import { useLocale } from 'next-intl';

const content = {
  en: {
    title: 'Terms & Privacy',
    description:
      'Please review our Terms of Service and Privacy Policy carefully before using our services.',
    headings: [
      'Terms of Service',
      'Use of Website',
      'Intellectual Property',
      'Limitation of Liability',
      'Privacy Policy',
      'Information We Collect',
      'How We Use Your Information',
      'Data Security',
    ],
    html: `
      <h2>Terms of Service</h2>
      <p><strong>Last Updated: September 15, 2025</strong></p>
      <p>Welcome to Studio Minsky. By accessing our website, you agree to be bound by these Terms of Service. Please read them carefully.</p>
      <h3>Use of Website</h3>
      <p>You agree to use this site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. All content on this site is for informational purposes only.</p>
      <h3>Intellectual Property</h3>
      <p>The content, logos, and visuals on this website are the exclusive property of Studio Minsky and are protected by copyright laws. Unauthorized use is prohibited.</p>
      <h3>Limitation of Liability</h3>
      <p>Studio Minsky will not be liable for any damages arising from the use of this website.</p>
      
      <h2>Privacy Policy</h2>
      <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>
      <h3>Information We Collect</h3>
      <p>We collect information you provide directly to us when you fill out our contact form or interact with our AI chatbot. This may include your name, email address, company name (optional), and the content of your message.</p>
      <h3>How We Use Your Information</h3>
      <p>The information collected is used solely to respond to your inquiries, provide you with our services, improve our website and offerings, and communicate with you about your project.</p>
      <h3>Data Security</h3>
      <p>We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
    `,
  },
  de: {
    title: 'AGB & Datenschutz',
    description:
      'Bitte lesen Sie unsere Nutzungsbedingungen und Datenschutzrichtlinien sorgfältig durch, bevor Sie unsere Dienste nutzen.',
    headings: [
      'Nutzungsbedingungen',
      'Nutzung der Website',
      'Geistiges Eigentum',
      'Haftungsbeschränkung',
      'Datenschutzerklärung',
      'Von uns erhobene Informationen',
      'Wie wir Ihre Informationen verwenden',
      'Datensicherheit',
    ],
    html: `
      <h2>Nutzungsbedingungen</h2>
      <p><strong>Zuletzt aktualisiert: 15. September 2025</strong></p>
      <p>Willkommen bei Studio Minsky. Durch den Zugriff auf unsere Website erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Bitte lesen Sie sie sorgfältig durch.</p>
      <h3>Nutzung der Website</h3>
      <p>Sie erklären sich damit einverstanden, diese Website nur für rechtmäßige Zwecke und in einer Weise zu nutzen, die die Rechte anderer nicht verletzt oder deren Nutzung und Genuss der Website einschränkt oder behindert. Alle Inhalte auf dieser Website dienen nur zu Informationszwecken.</p>
      <h3>Geistiges Eigentum</h3>
      <p>Die Inhalte, Logos und visuellen Darstellungen auf dieser Website sind das alleinige Eigentum von Studio Minsky und sind urheberrechtlich geschützt. Eine unerlaubte Nutzung ist untersagt.</p>
      <h3>Haftungsbeschränkung</h3>
      <p>Studio Minsky haftet nicht für Schäden, die aus der Nutzung dieser Website entstehen.</p>

      <h2>Datenschutzerklärung</h2>
      <p>Ihre Privatsphäre ist uns wichtig. Diese Richtlinie erläutert, wie wir Ihre personenbezogenen Daten erheben, verwenden und schützen.</p>
      <h3>Von uns erhobene Informationen</h3>
      <p>Wir erheben Informationen, die Sie uns direkt zur Verfügung stellen, wenn Sie unser Kontaktformular ausfüllen oder mit unserem KI-Chatbot interagieren. Dies kann umfassen: Ihr Name, Ihre E-Mail-Adresse, Ihr Firmenname (optional) und der Inhalt Ihrer Nachricht.</p>
      <h3>Wie wir Ihre Informationen verwenden</h3>
      <p>Die gesammelten Informationen werden ausschließlich verwendet, um auf Ihre Anfragen zu antworten, Ihnen unsere Dienstleistungen bereitzustellen, unsere Website und Angebote zu verbessern und mit Ihnen über Ihr Projekt zu kommunizieren.</p>
      <h3>Datensicherheit</h3>
      <p>Wir setzen eine Vielzahl von Sicherheitsmaßnahmen ein, um die Sicherheit Ihrer persönlichen Informationen zu gewährleisten. Wir verkaufen, handeln oder übertragen Ihre persönlich identifizierbaren Informationen nicht an Dritte.</p>
    `,
  },
};

export default function TermsAndPrivacyPage() {
  const locale = useLocale();
  const pageContent = locale === 'de' ? content.de : content.en;

  return (
    <>
      <Header />
      <main className="mt-[50px] sm:mt-[175px] container mx-auto px-4 py-16">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[75px] font-geometric leading-tight lg:leading-20 uppercase font-bold mb-3">
              {pageContent.title}
            </h1>
          </header>

          <section
            aria-label="Summary"
            className="relative my-10 pl-5 border-l-4 border-primary"
          >
            <p className="m-0 text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground/90 max-w-full sm:max-w-[70%]">
              {pageContent.description}
            </p>
          </section>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-between w-full">
            <div className="blog-text prose lg:prose-xl w-full lg:w-2/3">
              <PostContent
                html={pageContent.html}
                headings={pageContent.headings}
              />
            </div>
            <aside className="hidden lg:block sticky top-[100px] self-start max-h-[70vh] overflow-auto w-full lg:w-1/3">
              <TableOfContents
                headings={pageContent.headings}
                title={
                  locale === 'de'
                    ? 'Auf dieser Seite'
                    : 'On this page'
                }
              />
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
