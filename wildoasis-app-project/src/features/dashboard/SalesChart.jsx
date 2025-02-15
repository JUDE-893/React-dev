import {useMemo} from 'react';
import {AreaChart, Area,CartesianGrid,Tooltip,XAxis,YAxis,ResponsiveContainer } from 'recharts';
import styled from "styled-components";
import {eachDayOfInterval,subDays,format} from 'date-fns';

import DashboardBox from "./DashboardBox";
import Heading from '../../ui/Heading';
import {useDarkMode} from '../../hooks/DarkModeProvider';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  height:cover;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;




export default function SalesChart({bookings,days}) {

      const {isDarkMode} = useDarkMode();
      const colors = !isDarkMode
      ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
      : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

      const {structuredData: fakeData,startDate,endDate} = useMemo(() => {
        return getSalesData(bookings,days)
      },[bookings,days])



      return (
        <StyledSalesChart>
          <Heading as='h2' style={{color:colors.text}} >Sales from {startDate} - {endDate}</Heading>

          <ResponsiveContainer height={400} >
            <AreaChart data={fakeData} >
              <CartesianGrid />
              <Tooltip contentStyle={{backgroundColor: colors.background}} />
              <XAxis dataKey="label" tick={{fill:colors.text}} tickLine={{stroke:colors.text}} />
              <YAxis unit="$" tick={{fill:colors.text}} tickLine={{stroke:colors.text}} />
              <Area dataKey='totalSales' type='monotone' stroke={colors.totalSales.stroke} fill={colors.totalSales.fill} strokeWidth={2} unit='$' name='Total sales'/>
              <Area dataKey='extrasSales' type='monotone' stroke={colors.extrasSales.stroke} fill={colors.extrasSales.fill} strokeWidth={2} unit='$' name='Extra Prices'/>
            </AreaChart>
          </ResponsiveContainer>

        </StyledSalesChart>
      )
    }

// structures sales data
function getSalesData(bookings,days) {
  const startDate = subDays(new Date(), days-1);

  const curDate = new Date();
  let arr;
  const structuredData = eachDayOfInterval({start: startDate, end: curDate }).map( (date) => {
    let label =  format(date, 'MMM dd');
    let salesPrices = bookings?.reduce( (acc,cur) => {
      if(format(new Date(cur.created_at), 'MMM dd') === label) {
        return {
          totalSales: acc.totalSales + cur.total_price,
          extrasSales: acc.extrasSales + cur.extra_price
        }
      }
      return acc
    },{totalSales:0,extrasSales:0});

    return {label:label,...salesPrices}
  })


  return {structuredData,startDate: format(startDate,'MMM dd yyyy'),endDate:format(curDate,'MMM dd yyyy')}
}
