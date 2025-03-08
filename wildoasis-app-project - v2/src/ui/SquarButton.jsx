import styled from "styled-components";

const notDisabled = "color: var(--color-brand-600);";

const SquarButton = styled.span`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-brand-600);
  }
  & svg:hover {
    ${ ({enabled}) => enabled ? notDisabled : ""}
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
  }
`;

export default SquarButton;
