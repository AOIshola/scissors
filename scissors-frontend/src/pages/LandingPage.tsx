// import React from 'react'
import { useShortener } from '../context/ShortenerContext'
import { motion } from 'framer-motion'
import Tabs from '../components/Tabs'
import Options from '../components/Options'
import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useAuth } from '../context/AuthContext'
// import Pricing from './Pricing'

function LandingPage() {
    const { shortUrl, shortenUrl } = useShortener()
    const [long_url, setLongUrl] = useState('')
    const [custom_code, setCustomUrl] = useState('')
    const [option, setOption] = useState('url')
    const [range, setRange] = useState(8)
    const [errorMsg, setErrorMsg] = useState(false)
    const [selectedTab, setSelectedTab] = useState(0)
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        custom_code.length > 10 ? setErrorMsg(true) : setErrorMsg(false)
    }, [custom_code]);

    const shorten = async (e: React.FormEvent) => {
        e.preventDefault()
        // console.log('Cutting...')
        const data = {
            long_url,
            custom_code,
            option
        }
        try {
            setLoading(true)
            await shortenUrl(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const copyURLToClipBoard = () => {
        window.navigator.clipboard.writeText(shortUrl)
    }

    const random = (
        <div className='flex justify-center'>
            <div className='w-[80%] flex flex-col items-center gap-3'>
                <div className='my-3 mx-auto w-[80%] flex flex-col items-start'>

                <label className='self-start my-3 text-lg'>
                    Your URL:
                </label>
                <input
                    type="url"
                    name='long_url'
                    placeholder='Enter your url here'
                    className='border border-blue-400 h-12 w-full px-2'
                    value={long_url}
                    onChange={(e) => { setLongUrl(e.target.value) }} />
                </div>
            </div>
        </div>
    )

    const custom = (
        <div className='flex justify-center'>
            <div className='w-[80%] flex flex-col items-center gap-3'>
                <div className='my-3 mx-auto w-[80%] flex flex-col items-start'>

                <label className='self-start my-3 text-lg'>
                    Your URL:
                </label>
                <div className='w-full inline-flex'>
                    <input
                        type="url"
                        name='long_url'
                        placeholder='Enter your url here'
                        className='bg-amber-50 pl-10 border border-blue-400 h-12 w-full px-2'
                        style={{backgroundImage: `url('../../src/assets/link.png')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '7px 7px'}}
                        value={long_url}
                        onChange={(e) => { setLongUrl(e.target.value) }} />

                </div>
                </div>
                <div className='my-3 mx-auto w-[80%] flex flex-col items-start'>

                <label className='self-start my-3 text-lg'>
                    Custom Code:
                </label>
                <input
                    type='text'
                    name='custom_code'
                    placeholder='Enter your preferred custom code'
                    className='bg-amber-50 border border-blue-400 h-12 w-full px-2'
                    value={custom_code}
                    onChange={(e) => { setCustomUrl(e.target.value) }} />
                
                {errorMsg ?
                <span className='text-red-500 pt-2'>Custom code cannot be longer than 10 character</span>
            : <></>}
                </div>
            </div>
        </div>
    )

    const tabs = [
        { label: "Random", content: random },
        { label: "Custom", content: custom }
    ]

    return (
        <div>
            <section className='w-full h-fit rounded-md py-5'>
                <div className='flex flex-col items-center h-full gap-4'>
                    <motion.div
                        initial={{ opacity:0 }}
                        animate={{ opacity:1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='flex flex-col h-full w-full p-2'>
                        <h1
                            className='text-6xl py-3 font-bold text-center mx-auto w-[80%]'>
                            Shorten your links with ease
                        </h1>
                        <div className='w-[90%] flex flex-col items-center justify-center my-4 mx-auto text-left text-lg text-black'>
                            <h3 className='text-xl'>Simplify your online presence with our powerful URL shortening service.</h3>
                            <h3 className='text-2xl font-semibold'>
                                {user ? `Try it now!` : `Get started now!`}
                            </h3>
                        </div>
                    </motion.div>
                    <div className='bg-slate-50 w-[60%] h-[40vh] self-center border' style={{backgroundImage: `url("/react.svg")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain'}}>
                        {/* <img src="../src/assets/react.svg" alt="my_image" /> */}
                    </div>
                </div>
            </section>
            <section className='bg-slate-50 opacity-90 mt-3 py-3'>
                <div className=' py-4 flex flex-col border-b-4 border-blue-400'>
                        <div>
                            <Tabs tabs={tabs} onTabSelect={setSelectedTab}/>
                            <Options option={option}
                                setOption={setOption}
                                range={range}
                                setRange={setRange}
                                showRange={selectedTab === 0}/>
                            <button type='submit'
                                className='w-36 h-12 my-3 bg-blue-400 self-center rounded-md font-bold'
                                onClick={shorten}>{loading ? `Cutting...` :`Cut`}</button>
                        </div>
                </div>
                {/* <div>
                </div> */}
            </section>
            {shortUrl ? <div className='h-fit py-40'>
                {option === 'url' && shortUrl && <div>
                    <span className='rounded-md flex flex-row justify-around items-center gap-2 border border-blue-400 w-fit mx-auto'>
                        <h2 className='px-3 text-pretty text-xl'>
                            {shortUrl}
                        </h2>
                    <button className='p-3 rounded-md font-bold w-36 bg-blue-400 '
                    onClick={copyURLToClipBoard}>Copy</button>
                    </span>
                </div>}
                {option === 'qr' && shortUrl && 
                <div className='flex flex-col justify-around items-center p-4 gap-4'>
                    <h2 className='w-fit h-12 flex items-center text-lg font-semibold'>
                        {`Your QRCode for ${long_url.substring(0,20) + "..."} is here`}
                    </h2>
                    <QRCodeSVG value={shortUrl}/>
                </div>}
                {option === 'urlqr' && shortUrl && <div className='w-[80%] mx-auto py-5 border flex flex-row-reverse justify-center gap-4'>
                    <div className='self-center ml-5'>
                        <span className='rounded-md flex flex-row justify-around items-center border border-blue-400 w-fit mx-auto'>
                            <h2 className='px-3 text-pretty text-xl'>
                                {shortUrl}
                            </h2>
                            <button className='p-3 rounded-md font-bold w-36 bg-blue-400 '
                            onClick={copyURLToClipBoard}>Copy</button>
                        </span>
                    </div>
                    <QRCodeSVG value={shortUrl} height={200} width={200}/>
                </div>}
            </div>
            : <></>}
        </div>
    )
}

export default LandingPage