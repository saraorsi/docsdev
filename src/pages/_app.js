import {useEffect, useState } from 'react';
import { BarLeft } from '../components/commons/BarLeft'
import { BarRight } from '../components/commons/BarRight'
import DataContextProvider from '../contexts/dataContext';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {

  
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);
 

  const Layout = Component.Layout || EmptyLayout;


  return (
    <>
      <BarLeft />
      <DataContextProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
      </DataContextProvider>
      <BarRight />
    </>
  )
}

const EmptyLayout = ({children}) => <>{children}</>;





export default MyApp
