import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight, } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Importing only these two styles

const Docs = () => {

    const [copySuccess, setCopySuccess] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false); // Track if it's dark mode

    const codeToCopy = `    
    <SyntaxHighlighter language="javascript" style={isDarkMode ? dracula : oneLight} className="rounded-md p-4">
        {codeToCopy}
    </SyntaxHighlighter>

    `;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(codeToCopy);
            setCopySuccess('Code copied!');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }

        setTimeout(() => setCopySuccess(''), 1000);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode); // Toggle between light and dark mode
    };



    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Code Block</h1>

            <div className="relative">
                {/* Syntax Highlighter with conditional theme */}
                <SyntaxHighlighter language="javascript" style={isDarkMode ? oneDark : oneLight} className="rounded-md p-0">
                    {codeToCopy}
                </SyntaxHighlighter>

                {/* Copy button */}
                <button
                    onClick={copyToClipboard}
                    className={`absolute top-4 right-4  text-xs px-4 py-2 rounded-full shadow-xl border
                        ${isDarkMode? "bg-[#1f1f1f] text-white border-[#3b3b3b]" : "bg-[#ececec] text-slate-950"}`}
                >
                    {copySuccess?.length > 0 ? copySuccess : 'Copy'}
                </button>
            </div>

            {/* Toggle Theme Button */}
            <button
                onClick={toggleTheme}
                className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
        </div>
    );
};

export default Docs;
