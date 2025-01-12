import styled from 'styled-components';

const Heading = styled.h1`
  color : ${props => props.as === 'h1' ? "red" : 'black'}
`;

export default Heading;
