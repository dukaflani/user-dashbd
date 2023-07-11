// MUI Imports
import { Box } from '@mui/material'

// NPM Imports
import { AreaChart, Area, XAxis, YAxis,  Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SimpleAreaChart = () => {
   
    const data = [
        {
          name: 'Jan',
          Page: 4000,
          Products: 2400,
          Events: 2400,
        },
        {
          name: 'Feb',
          Page: 3000,
          Products: 1398,
          Events: 2210,
        },
        {
          name: 'Mar',
          Page: 2000,
          Products: 9800,
          Events: 2290,
        },
        {
          name: 'Apr',
          Page: 2780,
          Products: 3908,
          Events: 2000,
        },
        {
          name: 'May',
          Page: 1890,
          Products: 4800,
          Events: 2181,
        },
        {
          name: 'Jun',
          Page: 2390,
          Products: 3800,
          Events: 2500,
        },
        {
          name: 'Jul',
          Page: 3490,
          Products: 4300,
          Events: 2100,
        },
      ];


  return (
       <Box sx={{width: '100%', height: 400}}>
        <ResponsiveContainer>
            <AreaChart
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
            >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Page" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="Products" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="Events" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
        </ResponsiveContainer>
       </Box>
  )
}

export default SimpleAreaChart