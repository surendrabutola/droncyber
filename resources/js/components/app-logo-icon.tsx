import { SVGAttributes } from 'react';
import { cert_logo, uk_logo } from '@/assets/footer/footer';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img src={cert_logo} className="object-contain size-11 md:size-12 lg:size-16" />
        
    );
}
