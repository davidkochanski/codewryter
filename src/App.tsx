// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'


const getCode = () => {
    // let code = "def is_prime(n):\n\tif n < 2:\n\t\treturn False\n\tfor i in range(2, int(n**0.5) + 1):\n\t\tif n % i == 0:\n\t\t\treturn False\n\treturn True\n" // temp

    let code = "function binarySearch(arr, target) {\n\tlet mid = Math.floor(arr.length / 2);\n\tif (arr[mid] === target) {\n\t\treturn mid;\n\t}\n\tif (arr[mid] < target && arr.length > 1) {\n\t\treturn binarySearch(arr.slice(mid), target) + mid;\n\t} else if (arr[mid] > target && arr.length > 1) {\n\t\treturn binarySearch(arr.slice(0, mid), target);\n\t} else {\n\t\treturn -1;\n\t}\n}"

    let codeTokens = code.split(/(\n|\t| )/).filter(Boolean);

    return codeTokens;

}


function App() {
    const [input, setInput] = useState("");

    const inputArea = <input onChange={e => {handleTyping(e)}} onKeyDown={e => {handleSpecialKeys(e)}} value={input} type="text"/>

    const [curr, setCurr] = useState(0);
    const [tokens, setTokens] = useState<{array: string[]}>({array: getCode().filter(str => str !== " ")});

    // console.log(tokens.array);


    const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)

        if(e.target.value.endsWith(" ") && e.target.value.trim() === tokens.array[curr]) {
            setCurr(curr => curr + 1);
            setInput("")
        }
    }

    const handleSpecialKeys = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Tab") {
            e.preventDefault();
        }

        if(tokens.array[curr] === '\n' && e.key === "Enter") {
            e.preventDefault();

            setCurr(curr + 1);
            setInput("")


        } else if (tokens.array[curr] === '\t' && e.key === "Tab") {
            e.preventDefault();

            setCurr(curr + 1);
            setInput("")


        } else if (tokens.array[curr + 1] === '\n' && e.key === "Enter") {
            e.preventDefault();

            setCurr(curr + 2);
            setInput("")


        }
    }


    return (
        <>
            <div className="typing" style={{whiteSpace: "pre-line", textAlign: "left" }}>
                <span className="typed">{tokens.array.slice(0, curr).join(" ").replace(/\t/g, "\u00A0\u00A0\u00A0\u00A0")}{" "}</span>
                {inputArea}
            </div>
            <div className='code' style={{whiteSpace: "pre-line", textAlign: "left" }}>
            {tokens.array.join(" ").replace(/\t/g, "\u00A0\u00A0\u00A0\u00A0")}
            </div>
        </>
    )
}


export default App
