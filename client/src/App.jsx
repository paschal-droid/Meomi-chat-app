import React, {useState} from 'react'
import {StreamChat} from "stream-chat"
import {Chat} from "stream-chat-react"
import Cookies from "universal-cookie"
import { ChannelListContainer, ChannelContainer, Auth } from './components'

import "stream-chat-react/dist/css/index.css";
import "./App.css"


const cookies = new Cookies();
const api_key = "ag6x5qg38n3f"
const client = StreamChat.getInstance(api_key)
const authToken = cookies.get("token")

if(authToken) {
    client.connectUser( {
        name: cookies.get("username"),
        fullName: cookies.get("fullName"),
        id: cookies.get("userId"),
        phoneNumber: cookies.get("phone No."),
        image: cookies.get("profile URl"),
        hashedPassword: cookies.get("hashedPassword"),
    }, authToken)
}


const App = () => {
    const [createType, setCreateType] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    if(!authToken) return <Auth />
    
    return (
        <div  className='app__wrapper'>
            <Chat client={client} theme='team light'>
                <ChannelListContainer 
                    isCreating={isCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setIsCreating={setIsCreating}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setIsCreating={setIsCreating}
                    createType={createType}
                />
            </Chat>
        </div>
    )
}

export default App
