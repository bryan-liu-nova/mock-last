import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { ButtonWrap, PrevButton, NextButton } from './pagination.styled';
import { ICON_CHEVRON_LEFT_URL, ICON_CHEVRON_RIGHT_URL } from '@constants/app'
export default function Pagination({ page, handleChangePage, artists }: InferProps<typeof Pagination.propTypes>) {
  const handlePrevButton = () => {
    if (page > 1 && artists?.length > 0) {
      handleChangePage(page - 1);
    }
  }
  const handleNextButton = () => {
    if (artists?.length > 0) {
      handleChangePage(page + 1);
    }
  }
  return (
    <ButtonWrap>
      <PrevButton onClick={handlePrevButton}>
        <img src={ICON_CHEVRON_LEFT_URL(page > 1 && artists?.length > 0 ? 'ffffff' : '666666')} alt="unable to load..." />
      </PrevButton>
      <NextButton onClick={handleNextButton}>
        <img src={ICON_CHEVRON_RIGHT_URL(artists?.length > 0 ? 'ffffff' : '666666')} alt="unable to load..." />
      </NextButton>
    </ButtonWrap>
  )
};
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  artists: PropTypes.any
}