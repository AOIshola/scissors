type Features = {
    f1: string
    f2: string
    f3: string
    f4: string
}

export type PricingCardProps = {
    heading: string
    price: number
    features: Features
}

function PricingCard(props: PricingCardProps) {
    
    return (
        <div className='mx-4 flex flex-col gap-7 items-center w-72 rounded-2xl bg-slate-50 shadow-slate-500 shadow-lg'>
            <div className='bg-blue-400 w-full h-11 content-center rounded-t-xl shadow-lg shadow-blue-200 text-white text-xl font-semibold'>
                {props.heading}
            </div>
            <div className='text-left text-4xl font-semibold'>
                ${props.price} / month
            </div>
            <div className='text-left flex flex-col gap-5 self-start p-5'>
                <div className='px-4'>
                    {Object.entries(props.features).map((feature) => (<li key={feature[0]} className='list-none text-base'>{feature[1]}</li>))}
                </div>
                <button className='scale-90 hover:scale-100 rounded-md w-fit self-center p-3 bg-blue-400 text-white'>Try for Free</button>
            </div>
        </div>
    )
}

export default PricingCard