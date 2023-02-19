import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '@pages/index.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Get Safe</title>
      </Head>
      <header className={styles.header}>
        <Image
          src="/logo.svg"
          className={styles.logo}
          alt="logo"
          width={42}
          height={42}
        />
      </header>
      <main>
        <p>{"Welcome to Getsafe's Developer Insurance"}</p>
        <Link href="/buy/insurance-dev">Get started!</Link>
      </main>
    </>
  );
}
