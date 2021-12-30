import React, {useState} from 'react'
import { ChannelList, useChatContext } from "stream-chat-react"
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./"
import Cookies from "universal-cookie"
import * as FaIcons from "react-icons/fa" 


const cookies = new Cookies()

const Sidebar = ({logout}) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className="icon1__inner">
                <FaIcons.FaHospital style={{color: 'white'}} />
            </div>
        </div>
        <div className='channel-list__sidebar__icon2'>
            <div className="icon1__inner" onClick={logout}>
                <FaIcons.FaSignOutAlt style={{color: 'white'}} />
            </div>
        </div>
    </div>
    
)

const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>friendLi</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessageFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}
 

const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
    const { client } = useChatContext()

    const logout = ()=> {
        cookies.remove("token")
        cookies.remove("username")
        cookies.remove("fullName")
        cookies.remove("userId")
        cookies.remove("phone No.")
        cookies.remove("profile URl")
        cookies.remove("hashedPassword")

        window.location.reload();
    }

    const filters = {members: { $in: [ client.userID ]}}

    return (
        <>
            <Sidebar logout={logout} />
            <div className='channel-list__list__wrapper'>
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}
                            type="team"
                         />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessageFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                         />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false)

    return (
        <>
            <div className='channel-list__container'>
                <ChannelListContent 
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                />
            </div>

            <div 
            className='channel-list__container-responsive'
            style={{left: toggleContainer ? "0%" : '-89%', backgroundColor: "#cc2b5e"}}
            >
                <div 
                    className='channel-list__container-toggle'
                    onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}
                >
                    <ChannelListContent 
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setToggleContainer={setToggleContainer}
                />
                </div>
            </div>
        </>
    )
}

export default ChannelListContainer
