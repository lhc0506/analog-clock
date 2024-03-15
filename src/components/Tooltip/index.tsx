import {css} from '@emotion/react';

type TooltipProps = {
  content?: React.ReactNode;
};
const Tooltip = ({content}: TooltipProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: max-content;
        position: relative;
        background-color: lightgray;
        padding: 2px 10px;
      `}>
      {content}
    </div>
  );
};

export default Tooltip;
