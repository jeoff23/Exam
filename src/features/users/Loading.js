import React, { useState } from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

function Loading({ size = 10 }) {
  let [loading, setLoading] = useState();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="flex items-center justify-center h-20 sweet-loading">
      <SyncLoader
        loading={loading}
        css={override}
        size={size}
        color={"#34d399"}
      />
    </div>
  );
}

export default Loading;
