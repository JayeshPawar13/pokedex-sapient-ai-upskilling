// File: tooltip.tsx
// Path: src/hooks/tooltip/tooltip.tsx

import React from 'react';
import { forwardRef } from 'react';
import { Whisper, Popover } from 'rsuite';
import PropTypes from 'prop-types';

interface DefaultPopoverProps {
    content: React.ReactNode;
    className?: string;
    [key: string]: any;
}

const DefaultPopover = forwardRef<HTMLDivElement, DefaultPopoverProps>(({ content, className, ...props }, ref) => {
    return (
        <Popover ref={ref} {...props} className={className} arrow={false}>
            <p>{content}</p>
        </Popover>
    );
});

// Set display name for better debugging and readability
DefaultPopover.displayName = 'DefaultPopover';

interface AppTooltipProps {
    placement: any;
    data: any;
    className?: string;
    name?: string;
    tooltipClass?: string;
}

const AppTooltip: React.FC<AppTooltipProps> = ({ placement, data, className, name, tooltipClass }) => (
    <Whisper
        trigger="click"
        placement={placement}
        controlId={`control-id-${placement}`}
        speaker={
            <DefaultPopover content={data} className={tooltipClass} />
        }
    >
        <div className={className}>{name}</div>
    </Whisper>
);

AppTooltip.propTypes = {
    placement: PropTypes.string,
    data: PropTypes.any,
    className: PropTypes.string,
    name: PropTypes.string,
    tooltipClass: PropTypes.string
}

DefaultPopover.propTypes = {
    content: PropTypes.any,
    className: PropTypes.string
}

export default AppTooltip;
