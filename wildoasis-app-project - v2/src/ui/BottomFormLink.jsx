import styled from "styled-components";
import {Link} from 'react-router-dom';

const BottomFormLink = styled.p`
  text-align: center;
  color: var(--color-grey-500);
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  text-align: center;
  color: var(--color-indigo-700);
  font-size: 14px;

  &:hover {
    color: var(--color-indigo-100);
  }

  & svg {
    padding-top:0rem;
    vertical-align: bottom;
    margin-left: 0.2rem
  }
`;

BottomFormLink.Link = StyledLink

export default BottomFormLink
