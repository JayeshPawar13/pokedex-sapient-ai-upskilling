import type { ReactNode, SyntheticEvent } from 'react';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import './search.filter.scss';

export interface SearchFilterProps {
  placeholder?: string;
  inputClass?: string;
  onChangeHandler?: (value: string, event?: SyntheticEvent) => void;
  label?: ReactNode;
  [key: string]: unknown;
}

const SearchFilter = ({
  placeholder,
  inputClass,
  onChangeHandler,
  label,
  ...rest
}: SearchFilterProps) => (
  <div className="search-container">
    <div className="flex-col">
      {label && (
        <div className="search-label">
          <span>{label}</span>
        </div>
      )}
      <InputGroup {...rest} inside className="mb-1">
        <Input
          placeholder={placeholder}
          className={inputClass}
          size="lg"
          onChange={onChangeHandler}
        />
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>
    </div>
  </div>
);

export default SearchFilter;
