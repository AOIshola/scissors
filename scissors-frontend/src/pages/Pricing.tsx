import PricingCard from '../components/PricingCard'
import { PricingCardProps } from '../components/PricingCard'

function Pricing() {
    const details: PricingCardProps[] = [
        {
            heading: "Basic Plan",
            price: 9.99,
            features: {
                f1: "Shorten URL links",
                f2: "Generate QRCode for links",
                f3: "Use Custom path for URL",
                f4: "Track the usage of your links"
            }
        },
        {
            heading: "Pro Plan",
            price: 19.99,
            features: {
                f1: "Shorten URL links",
                f2: "Generate QRCode for links",
                f3: "Use Custom path for URL",
                f4: "Detailed analytics for your links"
            }
        },
        {
            heading: "Enterprise Plan",
            price: 49.99,
            features: {
                f1: "Shorten URL links",
                f2: "Generate QRCode for links",
                f3: "Use Custom path for URL",
                f4: "Custom branding and analytics"
            }
        }
    ];

    return (
        <div className='flex flex-col h-[100dvh]'>
            <div className='h-fit m-4 p-5 flex flex-row justify-around'>
                <h1 className='w-[45%] text-left text-5xl font-serif font-semibold'>
                    Choose a Plan That's Right for Your Business.
                </h1>
                <div className='float-right text-left h-fit'>
                    <span className='font-bold text-red-500 block'>7-day free trial</span>
                    <span className='font-light'>Have a taste of greatness for free</span>
                </div>
            </div>
            <div className='p-5 flex gap-5 justify-center'>
                {details.map((detail, index) => (
                    <PricingCard 
                        key={index} 
                        heading={detail.heading} 
                        price={detail.price} 
                        features={detail.features} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Pricing