import React from 'react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig, usePrepareContractWrite } from 'wagmi'
import { mainnet, goerli, polygonMumbai } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import ABI from './web3-abi'

const contractAddress = process.env.GATSBY_CONTRACT_ADDRESS!
const alchemyId = process.env.GATSBY_ALCHEMY_ID!
const infuraId = process.env.GATSBY_INFURA_ID!
const walletConnectId = process.env.GATSBY_WALLETCONNECT_ID!
const chainId = parseInt(process.env.GATSBY_CONTRACT_CHAIN_ID!, 10)

const { chains, publicClient } = configureChains(
  [mainnet, goerli, polygonMumbai],
  [alchemyProvider({ apiKey: alchemyId }), infuraProvider({ apiKey: infuraId }), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'MetaSignals',
  projectId: walletConnectId,
  chains,
})

export const Web3Provider = ({ children }: { children: string }) => {
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  })

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 *
 * https://github.com/gpxl-dev/truncate-eth-address/blob/14351c2cd4b342a7fc967f3f389c40cd28f0e94c/src/index.ts
 */
export const formatAddress = (address = '') => {
  // Captures 0x + 4 characters, then the last 4 characters.
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}

/**
 * Helper function to create the base object for wagmi contract methods
 */
export const useContract = () => {
  return {
    address: contractAddress,
    abi: ABI,
    chainId,
  }
}

/**
 * Helper function to prepare a wagmi contract call
 */
export const useContractCall = () => {
  const base = useContract()

  return {
    contractRead: (functionName: string, args = [], additionalProps = {}) => ({
      ...base,
      functionName,
      args,
      ...additionalProps,
    }),
    prepareContractWrite: (functionName: string, args = [], additionalProps = {}) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      usePrepareContractWrite({
        ...base,
        functionName,
        args,
        ...additionalProps,
      }),
  }
}
