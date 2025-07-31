import React from 'react';
import { CheckPicker } from 'rsuite';
import './multiSelectdropDown.scss';

export interface DropdownOption {
  label: string;
  value: string | number;
  [key: string]: unknown;
}

export interface AppMultiSelectDropDownProps {
  label?: React.ReactNode;
  onChangeHandler?: (value: (string | number)[], event?: React.SyntheticEvent) => void;
  data?: DropdownOption[];
  placeholder?: string;
  isOpen?: boolean;
  onCloseHandler?: () => void;
  onCleanHandler?: () => void;
  onOpenHandler?: () => void;
}

const AppMultiSelectDropDown: React.FC<AppMultiSelectDropDownProps> = ({
  label,
  onChangeHandler,
  data = [],
  placeholder,
  isOpen = false,
  onCloseHandler,
  onCleanHandler,
  onOpenHandler,
}) => (
  <div className="multiselect-dropdown-wrapper">
    {label && (
      <div className="dropdown-label">
        <span>{label}</span>
      </div>
    )}
    <div className={`${isOpen ? 'is-dropdown-open' : ''} check-picker-wrap`}>
      <CheckPicker
        block
        size="lg"
        placeholder={placeholder}
        data={data}
        onChange={onChangeHandler}
        onOpen={onOpenHandler}
        onClose={onCloseHandler}
        onClean={onCleanHandler}
        searchable={false}
        style={{ width: 224 }}
      />
    </div>
  </div>
);

export default AppMultiSelectDropDown;
