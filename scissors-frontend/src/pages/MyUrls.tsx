import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { back } from '../api';

interface Url {
    id: number;
    long_url: string;
    short_url: string;
    url_code: string;
    date_shortened: string;
}

const MyUrls: React.FC = () => {
    const [urls, setUrls] = useState<Url[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [copiedUrlId, setCopiedUrlId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await back.get('/user/urls/');
                setUrls(response.data);
            } catch (error: any) {
                console.error('Error fetching URLs:', error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUrls();
    }, [navigate]);

    const copyToClipboard = (shortUrl: string, id: number) => {
        navigator.clipboard.writeText(shortUrl);
        setCopiedUrlId(id);

        setTimeout(() => {
            setCopiedUrlId(null);
        }, 2000);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='h-[50dvh]'>
            <h1 className='text-3xl font-semibold m-4'>My Shortened URLs</h1>
            <table className='mx-auto border'>
                <thead>
                    <tr className='border border-collapse border-blue-400'>
                        <th className='px-4 border border-collapse border-blue-400'>Short URL</th>
                        <th className='px-4 border border-collapse border-blue-400'>Long URL</th>
                        <th className='px-4 '>Date Shortened</th>
                        {/* <th className='px-4'>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url) => (
                        <tr key={url.id}>
                            <td className='text-left border border-collapse border-blue-400'>
                                <Link to={url.short_url} target="_blank" rel="noopener noreferrer">
                                    {url.short_url}
                                </Link>
                            </td>
                            <td className='px-4 text-left border border-collapse border-blue-400'>{url.long_url.substring(0, 50) + ' ...'}</td>
                            <td className='border border-collapse border-blue-400'>{new Date(url.date_shortened).toLocaleDateString()}</td>
                            <td className='px-4'>
                                <button className='bg-blue-400 px-4'
                                    onClick={() => copyToClipboard(url.short_url, url.id)}
                                    disabled={copiedUrlId === url.id}
                                >
                                    {copiedUrlId === url.id ? 'Copied!' : 'Copy'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyUrls;
