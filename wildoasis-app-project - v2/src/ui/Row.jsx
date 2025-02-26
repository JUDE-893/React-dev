import Style from 'styled-components';

const Row = Style.header`
  display: flex;
  flex-direction: ${props => props.type === "horizontal" ? 'row': 'column'}
  
`
Row.defaultProps = 'vertical';
export default Row;
