import React, { useState, useEffect } from 'react'
import { Strapi__Component_Nft_Page_Labels, Strapi__Component_Nft_Page_Mint_Section } from 'gatsby-graphql'
import { navigate } from 'gatsby'
import { Oval } from 'react-loader-spinner'
import { Box, Typography, Alert, AlertTitle, Button as MuiButton } from '@mui/material'
import {
  useAccount,
  useBalance,
  useDisconnect,
  useContractReads,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi'
import { formatEther } from 'viem'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useContractCall } from '@/utils/web3'
import { useFetchPost } from '@/utils/hooks'
import DumbButton from '@/components/elements/dumb-button'
import Counter from '@/components/elements/counter'

export interface IMintWidgetProps {
  mintSection: Strapi__Component_Nft_Page_Mint_Section
  price: bigint
  providerFee: bigint
  onlyAllowlistMode: boolean
  errorMessages: Record<string, string>
  merkleProof?: `0x${string}`
  // labels: Strapi__Component_Nft_Page_Labels
}

export interface IStatusGateProps {
  supply: bigint
  totalSupply: bigint
  mintingOpen: boolean
  softCap: bigint
  softCapEnforced: boolean
  price: bigint
  errorMessages: Record<string, string>
  children: React.ReactElement
  labels: Strapi__Component_Nft_Page_Labels
}

export interface IAllowlistGateProps {
  enabled: boolean
  merkleId: string
  errorMessages: Record<string, string>
  children(merkleLeaf?: `0x${string}`): React.ReactElement
  labels: Strapi__Component_Nft_Page_Labels
}

export interface IStatusPanelProps {
  supply: bigint
  totalSupply: bigint
  price: bigint
  labels: Strapi__Component_Nft_Page_Labels
}

export interface IConnectButtonProps {
  disabled?: boolean
  label: string
}

export interface IErrorPanelProps {
  message: string
  action?: React.ReactElement
}

const ConnectWalletButton = ({ disabled = false, label }: IConnectButtonProps) => {
  const { openConnectModal } = useConnectModal()
  return (
    <>
      <Box sx={{ width: { xs: '100%', md: '236px' }, margin: 'auto' }}>
        <DumbButton
          button={{ text: label /*'Connect your wallet'*/, icon: 'chevronRight' }}
          sx={{ width: '100%', display: 'flex' }}
          onClick={() => openConnectModal?.()}
          disabled={disabled}
        />
      </Box>
    </>
  )
}

/**
 * Display the minting and remaining supply, along with the current price
 */
const StatusPanel = ({ supply, totalSupply, price, labels }: IStatusPanelProps) => {
  const remainingSupply = totalSupply - supply

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 6, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'h3'} sx={{ fontWeight: 700, fontSize: 28, textAlign: 'center' }}>
            <Counter to={Number(supply)} duration={5} />
          </Typography>
          <Typography component={'h4'} sx={{ fontWeight: 500, fontSize: 16, textAlign: 'center' }}>
            {labels.Minted}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'h3'} sx={{ fontWeight: 700, fontSize: 28, textAlign: 'center' }}>
            <Counter to={Number(remainingSupply)} duration={5} />
          </Typography>
          <Typography component={'h4'} sx={{ fontWeight: 500, fontSize: 16, textAlign: 'center' }}>
            {labels.Remaining}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'h3'} sx={{ fontWeight: 700, fontSize: 28, textAlign: 'center' }}>
            {Number(formatEther(price)).toFixed(4)}
          </Typography>
          <Typography component={'h4'} sx={{ fontWeight: 500, fontSize: 16, textAlign: 'center' }}>
            {labels.CurrentPrice}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

const ErrorPanel = ({ message, action }: IErrorPanelProps) => {
  return (
    <Box sx={{ width: { xs: '100%', md: '472px' }, margin: 'auto' }}>
      <Alert severity="error" action={action}>
        {message}
      </Alert>
    </Box>
  )
}

const StatusGate = ({
  supply,
  totalSupply,
  mintingOpen,
  softCap,
  softCapEnforced,
  price,
  errorMessages,
  children,
  labels,
}: IStatusGateProps) => {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const { isLoading: isLoadingBalance, data: balance } = useBalance({
    address,
    watch: true,
  })

  const requiredChainId = parseInt(process.env.GATSBY_CONTRACT_CHAIN_ID!, 10)
  const isCorrectChain = chain?.id === requiredChainId

  // Check that the supply has not sold out
  if (supply === totalSupply) {
    return <ErrorPanel message={errorMessages.SoldOutError} />
  }

  // Check mint is open and the soft cap hasn't been reached
  if (!mintingOpen || (softCapEnforced && supply >= softCap)) {
    return <ErrorPanel message={errorMessages.MintingPausedError} />
  }

  // Check users wallet is connected
  if (!isConnected) {
    return <ConnectWalletButton label={labels.Connect} />
  }

  // Check they're on the correct chain
  if (!isCorrectChain) {
    return (
      <ErrorPanel
        message={errorMessages.WrongBlockchainError}
        action={
          <MuiButton sx={{ flexShrink: 0 }} color="inherit" size="small" onClick={() => switchNetwork(requiredChainId)}>
            {labels.SwitchChain}
          </MuiButton>
        }
      />
    )
  }

  if (!balance && isLoadingBalance) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Oval color="#ffffff" />
      </Box>
    )
  }

  // Check they have sufficient balance
  if (balance && balance.value < price) {
    return (
      <ErrorPanel
        message={errorMessages.InsufficientBalanceError}
        action={
          <MuiButton sx={{ flexShrink: 0 }} color="inherit" size="small" onClick={() => disconnect()}>
            {labels.Disconnect}
          </MuiButton>
        }
      />
    )
  }

  return children
}

const AllowlistGate = ({ enabled, merkleId, errorMessages, children, labels }: IAllowlistGateProps) => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const [isAllowlisted, setIsAllowlisted] = useState(false)
  const [merkleLeaf, setMerkleLeaf] = useState(undefined)
  const [submit, data, loading] = useFetchPost(
    `https://us-central1-nft-rampp.cloudfunctions.net/allowlist/${merkleId}/merkle/verify`,
  )

  useEffect(() => {
    if (address && enabled) {
      submit({ claimAddress: address.toLowerCase() })
    }
  }, [address, enabled])

  useEffect(() => {
    if (data?.merkleProof) {
      setIsAllowlisted(true)
      setMerkleLeaf(data.merkleProof)
    } else {
      setIsAllowlisted(false)
      setMerkleLeaf(undefined)
    }
  }, [data])

  if (!enabled) {
    return children()
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Oval color="#ffffff" />
      </Box>
    )
  }

  if (!isAllowlisted) {
    return (
      <ErrorPanel
        message={errorMessages.NotOnWhitelistError}
        action={
          <MuiButton sx={{ flexShrink: 0 }} color="inherit" size="small" onClick={() => disconnect()}>
            {labels.Disconnect}
          </MuiButton>
        }
      />
    )
  }

  return children(merkleLeaf)
}

const MintPanel = ({ mintSection, price, providerFee, onlyAllowlistMode, merkleProof }: IMintWidgetProps) => {
  const { address } = useAccount()
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Prepare the mint call
  const code = localStorage.getItem('mint_code')
  const mintFunction = onlyAllowlistMode
    ? code
      ? 'mintToMultipleALAF'
      : 'mintToMultipleAL'
    : code
    ? 'mintToMultipleAF'
    : 'mintToMultiple'

  const mintArgs = (() => {
    switch (mintFunction) {
      case 'mintToMultipleALAF':
        return [address, 1, merkleProof, code]
      case 'mintToMultipleAL':
        return [address, 1, merkleProof]
      case 'mintToMultipleAF':
        return [address, 1, code]
      default:
        return [address, 1]
    }
  })()

  console.log(`Using minting method: ${mintFunction}, ${mintArgs}`)

  // Prepare the contract write
  const { prepareContractWrite } = useContractCall()
  const { config } = prepareContractWrite(
    mintFunction,
    mintArgs,
    // Request overrides (set payable fee)
    {
      value: price, // + providerFee,
    },
  )

  const { write: writeMint, data: writeData, isLoading: isMinting } = useContractWrite(config)
  const { isLoading: isWaitingOnTx } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess() {
      navigate(`/welcome-mafioso?tx=${writeData.hash}`)
    },
  })

  const [shakeTOS, setShakeTOS] = useState(false)

  const handleShake = () => {
    if (termsAccepted) {
      return
    }
    setShakeTOS(true)
    setTimeout(() => {
      setShakeTOS(false)
    }, 1000)
  }
  if (isMinting) {
    return (
      <>
        <Box sx={{ width: { xs: '100%', md: '472px' }, margin: 'auto' }}>
          <Alert severity="info" icon={<Oval height={32} width={32} strokeWidth={4} color="#0042CD" />}>
            <AlertTitle sx={{ fontWeight: 'bold' }}>{mintSection.MintingConfirmationAlertTitle}</AlertTitle>
            {mintSection.MintingConfirmationAlertText}
          </Alert>
        </Box>
      </>
    )
  }

  if (isWaitingOnTx) {
    return (
      <>
        <Box sx={{ width: { xs: '100%', md: '472px' }, margin: 'auto' }}>
          <Alert severity="info" icon={<Oval height={32} width={32} strokeWidth={4} color="#0042CD" />}>
            <AlertTitle sx={{ fontWeight: 'bold' }}>{mintSection.WaitingOnTxAlertTitle}</AlertTitle>
            {mintSection.WaitingOnTxAlertText}
          </Alert>
        </Box>
      </>
    )
  }

  return (
    <>
      <Box
        sx={{ width: { xs: '100%', md: '236px' }, margin: 'auto' }}
        onClick={() => {
          //onClick added here because we want to add animation when clicking a disabled button
          handleShake()
        }}
      >
        <DumbButton
          button={{ text: mintSection.MintButtonText, icon: 'chevronRight' }}
          sx={{
            width: '100%',
            display: 'flex',
          }}
          onClick={() => writeMint?.()}
          disabled={!termsAccepted}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: { md: '32px', xs: '64px' },
          gap: '8px',
          '& input': {
            width: { md: '24px', xs: '32px' },
            height: { md: '24px', xs: '32px' },
          },

          transition: 'transform 0.5s ease-in-out',
          animation: shakeTOS ? 'shake 0.5s ease' : 'none',
          '@keyframes shake': {
            '0%': {
              transform: 'translateX(0)',
            },
            '20%': {
              transform: 'translateX(-5px)',
            },
            '40%': {
              transform: 'translateX(5px)',
            },
            '60%': {
              transform: 'translateX(-3px)',
            },
            '80%': {
              transform: 'translateX(3px)',
            },
            '100%': {
              transform: 'translateX(0)',
            },
          },
        }}
      >
        <input
          type="checkbox"
          style={{ accentColor: '#fff' }}
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
        />
        <label>
          {mintSection.TosParagraphPreLink}
          <p
            style={{ color: '#A0CBB2', display: 'inline', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => document.querySelector('#nft-tos')?.scrollIntoView(false)}
          >
            {mintSection.TosParagraphLinkText}
          </p>
          {mintSection.TosParagraphPostLink}
        </label>
      </Box>
    </>
  )
}

const MintWidget = (props: IMintWidgetProps) => {
  // Merkle proof ID
  const merkleId = process.env.GATSBY_MERKLE_ID!

  // Extract error messages from Strapi data
  const errorMessages: Record<string, any> = Object.entries(props.mintSection).reduce((acc, [key, value]) => {
    if (key.endsWith('Error')) acc[key] = value.data[key]
    return acc
  }, {})

  // Get the basic contract status
  const { contractRead } = useContractCall()
  const { data, isLoading } = useContractReads({
    watch: true,
    contracts: [
      contractRead('totalSupply'),
      contractRead('collectionSize'),
      contractRead('getPrice', [BigInt(1)]),
      // contractRead('PROVIDER_FEE'),
      contractRead('mintingOpen'),
      contractRead('onlyAllowlistMode'),
      contractRead('softCap'),
      contractRead('softCapEnforced'),
    ],
  })

  const [
    { result: supply } = { result: BigInt(0) }, // Minted tokens
    { result: totalSupply } = { result: BigInt(0) }, // Maximum supply
    { result: price } = { result: BigInt(0) }, // Current mint fee
    // { result: providerFee } = { result: BigInt(0) }, // Per-tx provider fee
    { result: mintingOpen } = { result: false }, // Master minting control
    { result: onlyAllowlistMode } = { result: false }, // Requires allowlist to mint
    { result: softCap } = { result: BigInt(0) }, // Soft cap of tokens
    { result: softCapEnforced } = { result: false }, // Whether the cap is enforced
  ] = data ?? []

  const hasFailure = (data || []).reduce((acc, cur) => (acc = cur.status === 'failure' || acc), false)

  if (hasFailure) {
    return (
      <Box sx={{ width: { xs: '100%', md: '472px' }, margin: 'auto' }}>
        <Alert severity="error">{errorMessages.UnexpectedError}</Alert>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Oval color="#ffffff" />
      </Box>
    )
  }

  return (
    <>
      <StatusPanel supply={supply} totalSupply={totalSupply} price={price} labels={props.mintSection.Labels} />
      <StatusGate
        supply={supply}
        totalSupply={totalSupply}
        mintingOpen={mintingOpen}
        softCap={softCap}
        softCapEnforced={softCapEnforced}
        price={price}
        errorMessages={errorMessages}
        labels={props.mintSection.Labels}
      >
        <AllowlistGate
          enabled={onlyAllowlistMode}
          merkleId={merkleId}
          errorMessages={errorMessages}
          labels={props.mintSection.Labels}
        >
          {(merkleProof) => (
            <MintPanel
              price={price}
              // providerFee={providerFee}
              onlyAllowlistMode={onlyAllowlistMode}
              merkleProof={merkleProof}
              {...props}
            />
          )}
        </AllowlistGate>
      </StatusGate>
    </>
  )
}

export default MintWidget
