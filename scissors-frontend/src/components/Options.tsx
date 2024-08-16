import React from 'react'

type OptionProps = {
    option: string
    setOption: (value: string) => void;
    range: number
    setRange: (value: number) => void;
    showRange: boolean;
}

const Options: React.FC<OptionProps> = ({option, setOption, range, setRange, showRange}) => {
    const handleOptions = (value: string) => {
        setOption(value)
        // setRange(range)
    }

    const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRange(Number(e.target.value));
    };

    return (
        <div>
            <fieldset className='w-[80%] mx-auto my-3'>
                {/* <legend>Select one option</legend> */}
                <div className='flex flex-row justify-center gap-2'>
                    <label htmlFor="url-only"
                        className='mx-2 flex flex-row gap-1' >
                        <input
                            type="radio"
                            name="result-opt"
                            id='url-only'
                            value='url'
                            checked={option === 'url'}
                            onChange={() => handleOptions('url')}/>
                        URL only
                    </label>
                    <label
                        htmlFor="qrcode-only"
                        className='mx-2 flex flex-row gap-1' >
                        <input
                            type="radio"
                            name="result-opt"
                            id="qrcode-only"
                            value='qr'
                            checked={option === 'qr'}
                            onChange={() => handleOptions('qr')}/>
                        QRCode only
                    </label>
                    <label htmlFor="url-and-qr"
                        className='mx-2 flex flex-row gap-1'>
                        <input
                            type="radio"
                            name="result-opt"
                            id="url-and-qr"
                            value='urlqr'
                            checked={option === 'urlqr'}
                            onChange={() => handleOptions('urlqr')}/>
                        URL and QRCode
                    </label>
                    {showRange && (<label htmlFor="range" className='items-end mx-8'>
                        <input
                            type="range"
                            name="range"
                            id="range"
                            value={range}
                            min={8}
                            max={11}
                            onChange={handleRange}
                            className='mx-2'
                        />
                        No. of characters
                    </label>)}
                </div>
            </fieldset>
        </div>
    )
}

export default Options