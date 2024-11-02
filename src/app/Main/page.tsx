'use client'

import { useEffect, useState } from 'react'


import { Wallet, Droplets, Copy } from 'lucide-react'
import { Button } from '../Components/Button'
import { Input } from '../Components/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Components/Card'
import { Select } from '@radix-ui/react-select'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Components/Select'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'


export default function Main() {
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [publicKey, setPublicKey] = useState(
        '');
    const wallet = useWallet();
    const { connection } = useConnection()
    console.log(wallet.publicKey);


    const claimFaucet = async () => {
        setIsLoading(true);
        try {
            await connection.requestAirdrop(wallet.publicKey as any, 1000000000);
            alert('SOL tokens requested successfully');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (wallet.publicKey) {
            setIsConnected(true)
            setPublicKey(wallet.publicKey.toString())
        }
    }, [wallet])

    const formatPublicKey = (key: string) => {
        if (!key) return ''
        return `${key.slice(0, 10)}...${key.slice(-4)}`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <Droplets className="h-10 w-10 text-white" />
                        <h1 className="text-3xl font-bold text-white tracking-tight">Solana Faucet</h1>
                    </div>
                    <WalletMultiButton className="wallet-button" style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: '1px solid white',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }} />

                </div>

                <Card className="backdrop-blur-md bg-white/10 border-none shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-white">Request Devnet SOL</CardTitle>
                        <CardDescription className="text-purple-100">
                            Connect your wallet to receive SOL tokens on Solana Devnet
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-purple-100">Select Network</label>
                            <Select disabled={!isConnected} defaultValue="devnet">
                                <SelectTrigger className="bg-white/20 border-none text-white">
                                    <SelectValue placeholder="Select network" />
                                </SelectTrigger>
                                <SelectContent className="bg-purple-800 text-white">
                                    <SelectItem value="devnet">Devnet</SelectItem>

                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-purple-100">Wallet Address</label>
                            <div className="relative">
                                <Input
                                    placeholder="Wallet Address"
                                    value={publicKey && formatPublicKey(publicKey as string)}
                                    disabled
                                    className="bg-white/20 border-none text-white placeholder-purple-200"
                                />
                                {isConnected && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-purple-200 hover:text-white"
                                        onClick={() => navigator.clipboard.writeText(publicKey)}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        <Button
                            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                            disabled={!isConnected}
                            onClick={claimFaucet}

                        >
                            {isLoading ? 'Claiming...' : 'Request SOL'}
                        </Button>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center text-white/80 text-sm">
                    Powered by Solana | Built with ❤️ by Your Team
                </div>
            </div>
        </div>
    )
}