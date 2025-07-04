import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Services from '@/components/Services';
import Info from '@/components/Info';
import Process from '@/components/Process';

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Services />
      <Info />
      <Process />
      <Info />
    </>
  );
}
