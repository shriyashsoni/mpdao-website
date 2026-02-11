import Hero from '@/components/Hero';
import Values from '@/components/Values';
import Events from '@/components/Events';
import Ecosystem from '@/components/Ecosystem';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <Values />
      <Events />
      <Ecosystem />
      <CTA />
    </div>
  );
}
