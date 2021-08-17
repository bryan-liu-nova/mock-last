import styled from "styled-components";
import { css } from "@emotion/react";

export const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export const Header = styled.div`
  height: 81px;
  width: 100%;
  background: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 81px;
    height: 81px;
    background: #d92323;
    cursor: pointer;
  }
  img {
    margin: 0 20px;
  }
`;
export const Container = styled.div`
  max-height: 100vh;
  height: 100vh;
  .title {
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
    padding: 20px 0 20px 0;
  }
`;
export const Content = styled.div`
  padding: 20px;
`;
export const NameWrap = styled.label`
  font-weight: 700;
  color: black;
  font-size: 25px;
`;
export const StatsWrap = styled.div`
  margin: 0 0 10px 0;
  color: #999;
  font-size: 20px;
  > div {
    margin: 5px 0;
  }
`;
export const Tag = styled.div`
  padding: 5px 15px;
  background: ${(prop) => prop.color};
  margin: 0 10px 0 0;
  border-radius: 20px;
  color: white;
  cursor: default;
`;
export const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 10px 0;
`;
export const SimilarArtistsWrap = styled.div`
  margin: 10px 0;
  display: grid;
  width: 100%;
  grid-template-columns: auto auto auto;
  text-align: center;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  > div {
    padding: 10px;
    border: 1px solid rgb(0, 0, 0, 0.25);
    border-radius: 4px;
  }
  a {
    color: #005399;
  }
`;

export const Summary = styled.div`
  font-size: 20px;
  color: #222;
  word-wrap: break-word;
  a {
    display: none;
  }
`;
export const SummaryWrap = styled.div`
  .read-more {
    margin: 10px 0 0 0;
    color: #005399;
    cursor: pointer;
  }
`;
