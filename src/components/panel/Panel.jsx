import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CssUtils from '../../utils/sassUtils';

import './Panel.scss';
import TestStatus from './panelConstants';

function Panel({ title, status, score, date, icon, onClick }) {
  const className = CssUtils.mergeModifiers('panel', { [status]: !!status });

  const info = [];
  switch (status) {
    case TestStatus.COMPLETED:
      info.push(
        <div className="panel__info">
          <div className="panel__text panel__text--left">Доступен</div>
          <div className="panel__text panel__text--right">до {date}</div>
        </div>
      );
      break;
    case TestStatus.AVAILABLE:
      info.push(
        <div className="panel__info">
          <div className="panel__text--left">Завершен</div>
          <div className="panel__text--right">
            {!Number.isNaN(Number(score)) ? `Оценка ${score}` : `${score}`}
          </div>
        </div>
      );
      break;
    default:
      info.push(
        <div className="panel__info">
          <div className="panel__text--left">Закрыт</div>
        </div>
      );
  }

  return (
    <div className={`badge ${className}`} onClick={onClick}>
      <div className="panel__title">{title}</div>
      <div className={`panel__icon panel__icon--${status}`}>{icon}</div>
      {info}
    </div>
  );
}

Panel.propTypes = {
  title: PropTypes.string,
  status: PropTypes.oneOf([TestStatus.COMPLETED, TestStatus.AVAILABLE, TestStatus.CLOSED]),
  score: PropTypes.string,
  date: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

Panel.defaultProps = {
  title: '',
  status: undefined,
  score: '',
  date: '',
  icon: null,
  onClick: () => {},
};

export default Panel;
