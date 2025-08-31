import Image from 'next/image';
import { Card } from '@/components/ui/card';

export function Banner() {
  return (
    <section aria-labelledby="promo-banner-title">
        <h2 id="promo-banner-title" className="sr-only">Promotions</h2>
        <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="aspect-[600/263]">
                <Image
                    src="https://picsum.photos/600/263"
                    alt="Promotional banner with an offer"
                    width={600}
                    height={263}
                    className="w-full h-full object-cover"
                    data-ai-hint="advertisement offer"
                />
            </div>
        </Card>
    </section>
  );
}
