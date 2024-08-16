import React, { useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion';

type TabProps = {
    tabs: { label: string; content: React.ReactNode }[];
    onTabSelect: (index: number) => void;
};

const Tabs: React.FC<TabProps> = ({ tabs, onTabSelect }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        onTabSelect(index);
    };

  return (
    <div>
        <div className='border border-blue-400 rounded-2xl mx-auto w-fit h-12 flex flex-row justify-around px-1'>
            {tabs.map((tab, index) => [
                <button
                key={index}
                className={`w-32 rounded-2xl h-10 m-auto ${activeTab === index ? 'border-b-2 border-black text-white bg-blue-400 font-bold' : ''}`}
                onClick={() => handleTabClick(index)}>
                    {tab.label}
                </button>
            ])}
        </div>
        <div className="mt-4">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab} // this ensures that the component will re-render on tab change
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.1 }}>
                    {tabs[activeTab] && tabs[activeTab].content}
                </motion.div>
            </AnimatePresence>
        </div>
    </div>
  )
}

export default Tabs