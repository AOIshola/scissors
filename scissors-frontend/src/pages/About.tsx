import { NavLink } from 'react-router-dom'

function About() {
  return (
    <div className='p-8 h-[80dvh] px-auto'>
        <section className='flex flex-row items-center h-[80%] px-7'>
            <div className='flex flex-col items-start gap-4'>
                <span className='font-light text-xl'>ABOUT US</span>
                <h1 className='text-5xl font-bold text-left'>Helping businesses succeed through the power of conciseness</h1>
                <p className='text-left w-[90%] '>
                    Having unnecessarily long urls that lead prospects to your website, or forms has its
                    way of negatively impacting the click rate on your links.
                    Scixxors offers the service to provide concise urls that is as short as 40 characters and also generate unique 
                    QRCode that users can easily scan and effortlessly land on your web page.
                </p>
                <button className='bg-blue-400 w-fit p-3 rounded-sm text-black transition scale-90 hover:scale-100 hover:font-semibold'>
                    <NavLink to={'/'}>Try it Out Now</NavLink>
                </button>
            </div>
            <div className='w-full h-96'
            style={{backgroundImage: `url(../../src/assets/react.svg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                backgroundPosition: 'center center'
            }}></div>
        </section>
    </div>
  )
}

export default About