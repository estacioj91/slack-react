import React from 'react';
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
const Header = () => {
    return(
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar
                />
                <AccessTimeIcon/>
            </HeaderLeft>
            <HeaderSearch>
                <SearchIcon/>
                <input type="text" placeholder='Search channel'/>
            </HeaderSearch>
            <HeaderRight>
                <HelpOutlineIcon/>
            </HeaderRight>
        </HeaderContainer>
    )
}
export default Header;

const HeaderSearch = styled.div`
    align-items: center;
    flex: .4;
    opacity: 1;
    border-radius: 6px;
    border-color: #421f44;
    text-align: center;
    display: flex;
    border: 1px gray solid;
    padding: 0 30px;
    color: gray;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: white;
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderLeft = styled.div`
    flex: .3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderRight = styled.div`
    flex: .3;
    display: flex;
`;
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: .8;
    }
`;
