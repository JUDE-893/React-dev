import styled, { css } from "styled-components";
import {useSearchParams} from 'react-router-dom';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({options,name}) {

  const [searchParams,setSearchParams] = useSearchParams();
  const currentFilterVal = searchParams.get(name) || "all";

  // handle select filter option
  const handleSelect = (val) => {
    searchParams.set(name,val);
    if (searchParams.get("page")) searchParams.set('page',1);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map( (option) => {
        return <FilterButton active={option.value === currentFilterVal} disabled={option.value === currentFilterVal} onClick={() => handleSelect(option.value)}>{option.label}</FilterButton>
      })}
    </StyledFilter>
  )
}
