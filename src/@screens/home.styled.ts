import styled from "styled-components";
import { css } from "@emotion/react";

export const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const HomeScreenView = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
export const MenuLayoutView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: max-content;
  padding: 20px;
`;
export const MenuView = styled.ul`
  border-radius: 4px;
  box-shadow: 0 0px 2px 0 rgb(34 36 38 / 15%);
  list-style: "none";
  border: 1px solid #dcd5d5;
  overflow-y: scroll;
  height: max-content;
  li {
    padding: 13px 16px;
    cursor: pointer;
    border-bottom: 1px solid #dcd5d5;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 250px;
    .icons > svg {
      margin: 0 0 0 10px;
      width: 20px;
    }
  }
  li:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  li:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 0px solid;
  }
  li.active {
    background-color: rgba(0, 0, 0, 0.05);
  }
  li.search-input {
    cursor: default;
    input {
      border: 1px solid #dcd5d5;
      width: 100%;
      padding: 5px;
      border-radius: 4px;
    }
  }
`;
export const ContentLayoutView = styled.div`
  width: -webkit-fill-available;
  padding: 20px;
`;
export const ContentView = styled.div`
  box-shadow: 0 0px 2px 1px rgb(34 36 38 / 15%);
  height: 100%;
  width: 100%;
  border-radius: 3px;
  overflow-y: scroll;
  .search-bike__wrap {
    cursor: default;
    padding: 20px;
    .search-bike__input {
      border: 1px solid #dcd5d5;
      padding: 10px 5px;
      border-radius: 3px;
    }
  }
`;
export const ContentHeading = styled.h2`
  border-bottom: 1px solid #dcd5d5;
  padding: 20px;
`;
export const ContentBody = styled.div`
  ul li {
    padding: 20px;
    word-break: break-word;
    border-bottom: 1px solid #dcd5d5;
  }
`;
export const ServiceView = styled.div``;
export const CycleView = styled.div`
  position: relative;
  height: 100%;
  .search-results__wrap {
    padding: 0 20px 20px 20px;
    ul {
      list-style: none;
      li {
        padding: 5px 0px;
      }
    }
  }
`;
