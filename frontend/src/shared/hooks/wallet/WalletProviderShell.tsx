import React, { useEffect } from 'react';
import { LumaWalletProvider } from './WalletProvider';
import { BurnerWalletProvider } from './BurnerWalletProvider';
import { CardWalletProvider } from './CardWalletProvider';
import { WalletAppEffects } from './WalletAppEffects';
import { setWalletReady } from './walletReadyStore';

const WalletProviderShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        setWalletReady(true);
        return () => setWalletReady(false);
    }, []);

    return (
        <LumaWalletProvider>
            <BurnerWalletProvider>
                <CardWalletProvider>
                    <WalletAppEffects />
                    {children}
                </CardWalletProvider>
            </BurnerWalletProvider>
        </LumaWalletProvider>
    );
};

export default WalletProviderShell;
