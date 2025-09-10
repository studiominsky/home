// app/page.tsx

// import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Blog from '@/components/Blog';
import AnimatedText from '@/components/AnimatedText';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <>
      <Header />
      {/* <Banner /> */}
      <Services />
      <AnimatedText
        stats={[
          { label: 'Avg. Lighthouse Perf', value: '95+' },
          { label: 'FCP target', value: '<1.8s' },
          { label: 'Core Web Vitals', value: 'Green' },
        ]}
      >
        Digital products for today’s world. Available for new
        projects. Studio Minsky builds the digital tools that drive
        business growth. From websites to custom software.
      </AnimatedText>
      <Projects />
      <AnimatedText
        stats={[
          { label: 'Avg. Lighthouse Perf', value: '95+' },
          { label: 'FCP target', value: '<1.8s' },
          { label: 'Core Web Vitals', value: 'Green' },
          { label: 'Deploys/Month', value: '30+' },
        ]}
      >
        Digital products for today’s world. Available for new projects
        Studio Minsky builds the digital tools that drive business
        growth. From websites
      </AnimatedText>
      <Process />
      <AnimatedText
        stats={[
          { label: 'Avg. Lighthouse Perf', value: '95+' },
          { label: 'FCP target', value: '<1.8s' },
          { label: 'Core Web Vitals', value: 'Green' },
        ]}
      >
        Digital products for today’s world. Available for new projects
        Studio Minsky builds the digital tools that drive business
        growth. From websites
      </AnimatedText>
      <Blog />
      <Contact />
      <Chatbot />
      <Footer />
    </>
  );
}
