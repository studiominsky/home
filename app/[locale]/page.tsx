// app/page.tsx

import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Blog from '@/components/Blog';
import AnimatedText from '@/components/AnimatedText';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Header />
      <Banner />
      <Services />
      <AnimatedText
        stats={[
          { label: t('Stats.lighthouse'), value: '95+' },
          { label: t('Stats.fcp'), value: '<1.8s' },
          { label: t('Stats.webVitals'), value: 'Green' },
        ]}
      >
        {t('AnimatedText.section1')}
      </AnimatedText>
      <Projects />
      <AnimatedText
        stats={[
          { label: t('Stats.devAcceleration'), value: '40%' },
          { label: t('Stats.timeToMarket'), value: '-30%' },
          { label: t('Stats.costReduction'), value: '-25%' },
        ]}
      >
        {t('AnimatedText.section2')}
      </AnimatedText>
      <Process />
      <AnimatedText
        stats={[
          { label: t('Stats.satisfaction'), value: '100%' },
          { label: t('Stats.retention'), value: '9/10' },
          { label: t('Stats.seoBoost'), value: '+50%' },
        ]}
      >
        {t('AnimatedText.section3')}
      </AnimatedText>
      <Blog />
      <Contact />
      <Chatbot />
      <Footer />
    </>
  );
}
