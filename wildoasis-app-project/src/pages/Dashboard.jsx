import StyledDashboardLayout from '../features/dashboard/DashboardLayout'
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p style={{marginLeft: 'auto',marginTop:'1.6rem'}}>TEST</p>
    </Row>
    </>
  );
}

export default Dashboard;
