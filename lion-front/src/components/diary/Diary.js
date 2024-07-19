// import React, { useState } from 'react';

import { Pencil, Undo2 } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import Posts from "./Posts";
import WritePost from "./WritePost";

// const Diary = () => {
//     const [diaryEntries, setDiaryEntries] = useState([]);

//     const handleEntrySubmit = (event) => {
//         event.preventDefault();
//         // Get the value of the input field or textarea
//         const entry = event.target.elements.entry.value;
//         // Update the diary entries state with the new entry
//         setDiaryEntries([...diaryEntries, entry]);
//         // Clear the input field or textarea
//         event.target.elements.entry.value = '';
//     };

//     return (
//         <div>
//             <h1>Diary Board</h1>
//             <ul>
//                 {diaryEntries.map((entry, index) => (
//                     <li key={index}>{entry}</li>
//                 ))}
//             </ul>
//             <form onSubmit={handleEntrySubmit}>
//                 <textarea name="entry" rows="4" cols="50" placeholder="Write your diary entry"></textarea>
//                 <br />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default Diary;

const Write = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    &:hover {
        background-color: lightgray;
        cursor: pointer;
        
    }
`;
export default function Diary() {
    const [modal, setModal] = useState(true);

    return (
        <>
            {modal ? ( <Posts/> ) : (<WritePost modal={modal} setModal={setModal}/>)}
            <Write onClick={()=>setModal(!modal)}>
                {modal ? (

                    <Pencil style={{
                        
                        color: "#FF5A5A",
                    }}/>
                ): (
                    <Undo2 style={{
                        color: "#FF5A5A",
                    }}/>
                )}
            </Write>
        </>
    );
}