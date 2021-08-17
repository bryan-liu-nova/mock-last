import styled from "styled-components";
import { css } from "@emotion/react";

export const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  height: 100vh;
  position: relative;
`;

export const Content = styled.div`
  overflow-y: scroll;
  height: calc(100% - 175px);
`
export const IconWrap = styled.div`
  display: flex;
  justify-content: center;
`
export const SearchWrap = styled.div`
  background-color: black;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  /* padding: 18px 20px; */
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: 10px 5px;
  border: 1px solid rgb(0,0,0,0.25);
  border-radius: 3px;
  width: 200px;
  font-size: 20px;
  background: transparent;
  color: white;
  margin: 18px 20px;
  width: -webkit-fill-available;
  ::placeholder {
    color: #666;
  }
`
export const SearchIcon = styled.div`
  width: 81px;
  height: 81px;
  background: #d92323;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ClearIcon = styled.div`
  width: 81px;
  height: 81px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
export const ProfileWrap = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto auto auto auto;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  padding: 20px;
  width: 100%;
  height: 100%;
`
export const ProfileItem = styled.div`
  text-align: center;
  padding: 10px;
  border: 1px solid rgb(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 10px;
  > div > a {
    font-weight: 700;
    color: black
  }
  .listener {
    margin: 5px;
    color: #999;
  }
`