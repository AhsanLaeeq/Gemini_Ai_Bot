import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState(""); // Stores the input value.
    const [recentInput, setRecentInput] = useState(""); // Stores the most recent input.
    const [prevInputs, setPrevInputs] = useState([]); // Stores an array of previous inputs.
    const [showResult, setShowResult] = useState(false); // Boolean to toggle result visibility.
    const [loading, setLoading] = useState(false); // Boolean to track loading state.
    const [resultData, setResultData] = useState(""); // Stores the result data.

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (userInput) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
    
        let inputToProcess = userInput && userInput.trim() !== "" ? userInput : input;
    
        // 🔹 Only store input if it's NOT already in prevInputs
        setPrevInputs(prev => {
            if (!prev.includes(inputToProcess)) {
                return [...prev, inputToProcess];
            }
            return prev;
        });
    
        setRecentInput(inputToProcess);
    
        const response = await run(inputToProcess);
    
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
    
        let response2 = newResponse.split("*").join("</br>");
        let newArrayres = response2.split(" ");
        for (let i = 0; i < newArrayres.length; i++) {
            const nextWord = newArrayres[i];
            delayPara(i, nextWord + " ");
        }
    
        setLoading(false);
        setInput(""); 
    };
    
    
    

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            onSent(input);
        }
    };

    const contextValue = {
        prevInputs,
        setPrevInputs,
        onSent,
        setRecentInput,
        recentInput,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        handleKeyDown,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;