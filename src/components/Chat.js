import React, { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { auth, db } from "../firebaseconfig"
import { LuSendHorizonal } from "react-icons/lu";

function Chat(props) {

    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", props.room), orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
            let allMessages = [];

            snapShot.forEach((doc) => {
                allMessages.push({...doc.data(), id: doc.id});
            });
            setMessages(allMessages);
        });

        return () => unsubscribe();
    }, []);

    const handleSumbit = async (e) => {
        e.preventDefault();
        if(newMessage === "") return;

        await addDoc(messagesRef, {
            message: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: props.room,
        });

        console.log(messages);
        setNewMessage("");
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "";
        const date = timestamp.toDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const hours = date.getHours().toString().padStart(2, '0');
        return `${month} ${hours}:00`;
    };

    console.log(messages);

  return (
    <div className='relative h-screen h-full flex flex-col justify-center items-center'>
        <div className='fixed top-16 bg-blue-500 py-2 px-8 rounded-[10px]'>
            <div className='text-white text-[36px] font-bold'>Room: {props.room}</div>
        </div>

        <div className='text-[12px] flex flex-col gap-y-[2px]'>
            {messages.map((message) => 
                message.user !== auth.currentUser.displayName
                ?
                    <div key={message.id} className='flex flex-col items-center justify-center p-2 bg-blue-500 text-white rounded-[4px]'>
                        <div className='font-semibold'>{message.message}</div>
                        <div className='flex justify-center space-x-[5px]'>
                            <div className='text-[8px] font-light'>{message.user}</div>
                            <div className='text-[8px] font-light'>{formatTimestamp(message.createdAt)}</div>
                        </div>
                    </div>
                :
                    <div key={message.id} className='flex flex-col items-center justify-center p-2 bg-green-500 text-white rounded-[4px]'>
                        <div className='font-semibold'>{message.message}</div>
                        <div className='flex justify-center space-x-[5px]'>
                            <div className='text-[8px] font-light'>{message.user}</div>
                            <div className='text-[8px] font-light'>{formatTimestamp(message.createdAt)}</div>
                        </div>
                    </div>
            )}
        </div>
        <div className='fixed bottom-36'>
            <form onSubmit={handleSumbit} className='flex justify-center items-center gap-2'> 
                <div>
                    <input 
                        placeholder='Type something...'
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        className='p-2 rounded-[4px]'
                    />
                </div>
                <div>
                    <button type="submit" className='p-2 bg-yellow-300 rounded-[4px] border-[1px] border-black'>
                        <LuSendHorizonal />
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Chat