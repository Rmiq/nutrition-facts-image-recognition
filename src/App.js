import React, { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import image from './assets/pol.png';
import lang from './assets/pol.traineddata';
import './App.css';

const App = () => {

    const [ocr, setOcr] = useState('Loading...');

    const worker = createWorker({
        logger: m => console.log(m),
        langPath: lang
    });

    const doOCR = async () => {
        await worker.load();
        await worker.loadLanguage('pol');
        await worker.initialize('pol');
        const { data: { text } } = await worker.recognize(image);
        setOcr(text);
    };

    useEffect(() => {
        doOCR();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Nutrition facts image recognition</h1>
                <div className="App-image-recognition">
                    <div className="App-column col-4">
                        <img src={image} alt="nutrition facts" />
                    </div>
                    <div className="App-column col-6">
                        <p>{ocr}</p>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
