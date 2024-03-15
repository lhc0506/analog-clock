import {css} from '@emotion/react';
import {useBoundStore} from '../../store';
import Tooltip from '../Tooltip';

type CursorTooltipProps = {
  content?: React.ReactNode;
};
const CursorTooltip = ({content}: CursorTooltipProps) => {
  const {cursorX, cursorY, shouldDisplayItem} = useBoundStore();

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        transform: ${`translateX(${cursorX + 10}px) translateY(${cursorY - 30}px)`};
        display: ${shouldDisplayItem ? 'initial' : 'none'};
      `}>
      <Tooltip content={content} />
    </div>
  );
};

export default CursorTooltip;
