"use client"

import './globals.css'
// Fonts
import { Roboto } from 'next/font/google'
const roboto = Roboto({ weight: ["100", "300", "400", "500", "700", "900"], subsets: ['latin'] })

// MUI Imports
import {  CssBaseline } from '@mui/material'

// TanStack/React-Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// NPM Imports
import { Provider } from 'react-redux';

// Project Imports
import store from '@/Redux/App/store'


const queryClient = new QueryClient();



// export const metadata = {
//   title: 'Dukaflani',
//   description: 'Dukaflani Dashboard',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
          <CssBaseline />
          <>
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                {children}  
              </Provider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </>
      </body>
    </html>
  )
}
