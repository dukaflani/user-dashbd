// MUI Imports
import { Box } from '@mui/material'

// NPM Imports
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SimpleBarChart = ({ data }) => {

  return (
    <Box sx={{width: '100%', height: 400}}>
        <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={50}
        >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            {/* <YAxis /> */}
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
    </Box>
  )
}

export default SimpleBarChart