'use client'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import Main from "./Main/page";
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {
  return (
    <div>
      <ConnectionProvider endpoint={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_KEY}`}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>

            <Main />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

    </div >
  );
}
