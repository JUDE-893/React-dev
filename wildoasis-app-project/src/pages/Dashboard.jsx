import StyledDashboardLayout from '../features/dashboard/DashboardLayout'
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import HeadingMenu from "../ui/HeadingMenu";

function Dashboard() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <HeadingMenu styleu={{marginLeft: 'auto',marginTop:'1.6rem'}}>TEST</HeadingMenu>
    </Row>
    </>
  );
}

export default Dashboard;
