import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';
import { BlueButton, Row } from "../../../common/styles";

export const Pagination = ({ page, type }) => {
  let navigate = useNavigate();

  const onPrev = useCallback(() => {
    navigate(`/${type}/${parseInt(page) - 1}`)
  }, [navigate, page, type])

  const onNext = useCallback(() => {
    navigate(`/${type}/${parseInt(page) + 1}`)
  }, [navigate, page, type])

  return (
    <Row>
      <div className="mx-1" >
        <BlueButton disabled={parseInt(page) <= 1} onClick={onPrev}>Prev</BlueButton>
      </div>

      <div>
        <BlueButton disabled={type === "jobs"} onClick={onNext}>Next</BlueButton>
      </div>
    </Row>

  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}