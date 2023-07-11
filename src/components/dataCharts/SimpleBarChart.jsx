// MUI Imports
import { Box } from '@mui/material'

// NPM Imports
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SimpleBarChart = () => {

    const data = [
        {
          country: 'Kenya',
          views: 4000,
        },
        {
          country: 'Nigeria',
          views: 3000,
        },
        {
          country: 'Tanzania',
          views: 2000,
        },
        {
          country: 'South Africa',
          views: 2780,
        },
        {
          country: 'Uganda',
          views: 1890,
        },
        {
          country: 'U.S.A',
          views: 2390,
        },
        {
          country: 'Others',
          views: 3490,
        },
      ];


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
          barSize={20}
        >
            <XAxis dataKey="country" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
        </ResponsiveContainer>
    </Box>
  )
}

export default SimpleBarChart