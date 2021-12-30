import React from 'react'

import {AddChannel } from "../assets"


const TeamChannelList = ({children, error= false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
    if(error ){
        return type === "team" ? (
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>
                    Connection error, please wait for a while ...
                </p>
            </div>
        ): null
    }
    
    if(loading){
        return type === "team" ? (
            <div className='team-channel-list'>
                <p className='team-channel-list__message loading'>
                   {type === 'team' ? 'Channels': 'Messages'} loading ...
                </p>
            </div>
        ): null
    }

    return (
        <div className='team-channel-list'>
            <div className='team-channel-list__header'>
                <p className='team-channel-list-header__title'>
                    {type === 'team' ? 'Channels': 'Direct Messages'}
                </p>
                <AddChannel
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                    setToggleContainer={setToggleContainer}
                    type={ type === "team" ? 'team' : 'messaging'}
                />
            {children}
            </div>
        </div>

    )
}

export default TeamChannelList
