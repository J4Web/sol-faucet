
'use client'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import Main from './Main/page';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

export default function Home() {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_KEY}`}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Main />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
