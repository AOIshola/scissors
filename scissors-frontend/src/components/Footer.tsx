import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bg-slate-50 h-[40vh]'>
        <div className='w-full bg-slate-50 h-[40vh] p-12 flex justify-between gap-0'>
            <div className='w-20 h-20' style={{backgroundImage: `url('../src/assets/react.svg')`,
                backgroundSize: 'contain', backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className='w-[50%] ml-0'>
                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-5xl pb-3'>Keep in Touch</h1>
                    <span>Join us for £10 off your first purchase.</span>
                    <div className='flex flex-row justify-between border-b-2 border-black h-14 w-[60%]'>
                        <input type="search" name="" placeholder='Your Email' className=' text-lg bg-transparent border-none active:border-none'/>
                        <button className='pr-8 font-semibold text-lg'
                        style={{backgroundImage: `url('../src/assets/react.svg')`,
                            backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center right'}}>
                            Sign Up</button>
                    </div>
                    <span className='w-[60%] text-sm text-left font-medium'>
                        Check our <Link to={'/'} className='underline'>privacy policy</Link> on how we collect and process your information.
                    </span>
                </div>
            </div>
            <div className='flex flex-col items-start gap-2'>
                <h4 className='font-semibold text-slate-500'>Company</h4>
                <ul className='flex flex-col items-start gap-2 font-semibold'>
                    <Link to={'/'}>Our Story</Link>
                    <Link to={'/'}>NewsLetter</Link>
                    <Link to={'/'}>Why Scissors?</Link>
                </ul>
            </div>
            <div className='flex flex-col items-start gap-2'>
                <h4 className='font-semibold text-slate-500'>Support</h4>
                <ul className='flex flex-col items-start gap-2 font-semibold'>
                    <Link to={'/'}>Contact Us</Link>
                    <Link to={'/'}>FAQ's</Link>
                    <Link to={'/'}>Reviews</Link>
                </ul>
            </div>
        </div>
            <div className='bg-slate-700 h-12 w-full'></div>
    </div>
  )
}

export default Footer