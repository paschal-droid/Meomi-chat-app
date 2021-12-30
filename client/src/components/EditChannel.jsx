import React, {useState} from 'react'
import {useChatContext} from "stream-chat-react"
import { UserList }  from './'
import {CloseCreateChannel} from '../assets'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {

    const handleChange = (e) => {
        e.preventDefault()

        setChannelName(e.target.value)
    }


    return (
        <div className='channel-name-input__wrapper'>
            <p className=''>Name</p>
            <input 
                value={channelName}
                onChange={handleChange}
                placeholder='Channel-name'
            />
            <p>Add Members</p>
        </div>

    )
}


const EditChannel = ({setIsEditing}) => {
    
    const { channel } = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name)
    const [selectedUsers, setSelectedUsers] = useState([])
    
    const updateChannel = async (e) => {
        e.preventDefault()
        const changedName = channelName !== (channel.data.name || channel.data.id);

        if(changedName){
            await channel.update({name: channelName}, {text: `Channel Name was changed to ${channelName}`})
        }

        if(selectedUsers.length) {
            await channel.update(selectedUsers);
        }

        setChannelName(null)
        setIsEditing(false)
        setSelectedUsers([]);
    }

    return (
        <div className='edit-channel__container'>
            <div className='edit-channel__header'>
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className='edit-channel__button-wrapper' onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default EditChannel
