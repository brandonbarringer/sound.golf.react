import React from "react";
import { css } from '@emotion/css';

import { statbox as box } from './statbox.style'

export const StatBox = ({ children }) => {
  return <div className={css(box)}>{children}</div>;
}