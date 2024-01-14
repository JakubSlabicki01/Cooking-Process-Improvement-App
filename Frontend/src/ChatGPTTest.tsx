import React, { useState } from 'react';
import API from './Api'; // Make sure to import your API configuration

const ChatGPTTest = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const result = await API.post('/api/ask-gpt', { prompt });
            if (result.data && result.data.choices && result.data.choices.length > 0) {
                setResponse(result.data.choices[0].message.content);
            } else {
                setResponse('No response from GPT-4');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponse('Failed to fetch response from GPT-4');
        }
    };

    return (
        <div style={{color: "white", fontSize: "bold"}}>
            <input type="text" value={prompt} onChange={handleInputChange} />
            <button onClick={handleSubmit}>Ask GPT-4</button>
            <div>
                <p>Response from GPT-4:</p>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default ChatGPTTest;