import React from 'react';
import styled from "styled-components";
import SidebarOption from './SidebarOption';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from '@material-ui/icons/InsertComment' ;
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { db } from '../firebase.js'
import { collection} from "firebase/firestore";
import {useCollection} from 'react-firebase-hooks/firestore';

const Sidebar = () => {
    const [channels, loading, error] = useCollection(collection(db, "channels")); 
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Default Channel</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        John Estacio
                    </h3>
                </SidebarInfo>
                <CreateIcon/>
            </SidebarHeader>

            <SidebarOption Icon={InsertCommentIcon} title="Threads" />
            <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
            <SidebarOption Icon={DraftsIcon} title="Saved items" />
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
            <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
            <SidebarOption Icon={AppsIcon} title="Apps" />
            <SidebarOption Icon={FileCopyIcon} title="File browser" />
            <SidebarOption Icon={ExpandLessIcon} title="Show less" />
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
            {channels?.docs.map( item => {
                return <SidebarOption key={item.id} id={item.id} title={item.data().name} />
            })}
            <hr />
            <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`
    background-color: var(--slack-color);
    color: white;
    flex: .3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }

    @media only screen and (max-width: 600px) {
        padding-right: 5px;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }

    @media only screen and (max-width: 600px) {
        > .MuiSvgIcon-root {
            font-size: 10px;
            margin-left: 10px;
        }
    }
`;

const SidebarInfo = styled.div`
    flex: 1;
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }

    @media only screen and (max-width: 600px) {
        > h2 {
            font-size: 10px
        }

        > h3 {
        font-size: 10px;
        }

        > h3 > .MuiSvgIcon-root {
            font-size: 11px;
        }
    }
`;
