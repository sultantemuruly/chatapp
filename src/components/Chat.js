import React, { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where } from "firebase/firestore"
import { auth, db } from "../firebaseconfig"

function Chat(props) {

    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", props.room));
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

        setNewMessage("");
    };

  return (
    <div>
        <div>
            {messages.map((message) => <h1>{message.message}</h1>)}
        </div>
        <form onSubmit={handleSumbit}> 
            <input 
                placeholder='Type something...'
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button type="submit">
                Send
            </button>
        </form>
    </div>
  )
}

export default Chat