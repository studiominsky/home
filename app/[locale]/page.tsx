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

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <>
      <Header />
      <Banner />
      <Services />
      <AnimatedText>
        Digital products for today’s world. Available for new projects
        Studio Minsky builds the digital tools that drive business
        growth. From websites
        {t('title')}
      </AnimatedText>
      <Projects />
      <AnimatedText>
        Digital products for today’s world. Available for new projects
        Studio Minsky builds the digital tools that drive business
        growth. From websites
      </AnimatedText>
      <Process />
      <AnimatedText>
        Digital products for today’s world. Available for new projects
        Studio Minsky builds the digital tools that drive business
        growth. From websites
      </AnimatedText>
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
