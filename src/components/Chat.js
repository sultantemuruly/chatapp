import React, { useEffect, useState, useRef } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";
import { LuSendHorizonal } from "react-icons/lu";

function Chat(props) {
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);
    const endOfMessagesRef = useRef(null); // Ref for scrolling

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", props.room), orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
            let allMessages = [];
            snapShot.forEach((doc) => {
                allMessages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(allMessages);
            // Scroll to the bottom after messages are updated
            endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
        });

        return () => unsubscribe();
    }, [props.room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            message: newMessage,
            createdAt: serverTimestamp(),
            email: auth.currentUser.email,
            user: auth.currentUser.displayName,
            room: props.room,
        });

        setNewMessage("");
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "";
        const date = timestamp.toDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const hours = date.getHours().toString().padStart(2, '0');
        return `${month} ${hours}:00`;
    };

    return (
        <div className='flex flex-col h-screen bg-slate-100'>
            <div className='fixed top-0 left-0 w-full bg-blue-500 py-2 px-8 rounded-b-md z-10'>
                <div className='text-white text-2xl font-bold'>Room: {props.room}</div>
            </div>

            <div className='flex-1 flex flex-col'>
                <div className='flex-1 overflow-y-auto p-4 pt-16 pb-16 bg-slate-100'>
                    <div className='flex flex-col gap-2'>
                        {messages.map((message) =>
                            message.email !== auth.currentUser.email
                                ?
                                <div key={message.id} className='flex flex-col item-start p-2 bg-blue-500 text-white rounded-md max-w-[100%] mr-20'>
                                    <div className='font-semibold'>{message.message}</div>
                                    <div className='flex justify-between space-x-10 text-xs font-light'>
                                        <div>{message.user}</div>
                                        <div>{formatTimestamp(message.createdAt)}</div>
                                    </div>
                                </div>
                                :
                                <div key={message.id} className='flex flex-col items-start p-2 bg-green-500 text-white rounded-md max-w-[100%] ml-20'>
                                    <div className='font-semibold'>{message.message}</div>
                                    <div className='flex justify-between space-x-10 text-xs font-light'>
                                        <div>{message.user}</div>
                                        <div>{formatTimestamp(message.createdAt)}</div>
                                    </div>
                                </div>
                        )}
                        <div ref={endOfMessagesRef} /> {/* Scroll target */}
                    </div>
                </div>
                <div className='fixed bottom-0 left-0 w-full bg-white py-2 px-4 border-t border-gray-300'>
                    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
                        <input
                            placeholder='Type something...'
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                            className='p-2 border border-gray-300 rounded-md w-full'
                        />
                        <button type="submit" className='p-2 bg-yellow-300 rounded-md border border-black'>
                            <LuSendHorizonal />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;
