import type { AppProps, NextWebVitalsMetric } from 'next/app';

import Layout from '@components/Layout';

import '@styles/global.css';

// This replaces the original collection of web vitals metrics using NextJS
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (metric.label === 'web-vital') {
    console.log(metric);
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
