import React from "react";
import { css } from "@emotion/css";

import { 
  wrapper, 
  label as l, 
  value as v 
} from "./stat.style";

export const Stat = ({ label, value, unit }) => {
  return (
    <div className={css(wrapper)}>
      <dt className={css(l)}>{label}</dt>
      <dd className={css(v)}>{value} {unit}</dd>
    </div>
  );
};