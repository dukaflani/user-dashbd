// MUI Imports
import { Box } from '@mui/material'

// NPM Imports
import { AreaChart, Area, XAxis, YAxis,  Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SimpleAreaChart = ({ data }) => {
   

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
            {/* <YAxis /> */}
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