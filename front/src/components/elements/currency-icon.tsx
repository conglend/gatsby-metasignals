import get from 'lodash.get'
import React, { SVGProps } from 'react'

// WARNING: rename any file starting with numbers, as it will be also a variable name

//codegen: cd to directories with all the icons and use:
/*
for file in *.svg; do
    printf 'import %s from "../../assets/icons/currencies/%s"\n' "${file%.svg}" ""${file%}""
done 
*/

import AAVE from '../../assets/icons/currencies/AAVE.svg'
import ADA from '../../assets/icons/currencies/ADA.svg'
import ALGO from '../../assets/icons/currencies/ALGO.svg'
import ALICE from '../../assets/icons/currencies/ALICE.svg'
import ALPHA from '../../assets/icons/currencies/ALPHA.svg'
import ALT from '../../assets/icons/currencies/ALT.svg'
import ANKR from '../../assets/icons/currencies/ANKR.svg'
import APE from '../../assets/icons/currencies/APE.svg'
import APT from '../../assets/icons/currencies/APT.svg'
import AR from '../../assets/icons/currencies/AR.svg'
import ARB from '../../assets/icons/currencies/ARB.svg'
import ATA from '../../assets/icons/currencies/ATA.svg'
import ATOM from '../../assets/icons/currencies/ATOM.svg'
import AUDIO from '../../assets/icons/currencies/AUDIO.svg'
import AVAX from '../../assets/icons/currencies/AVAX.svg'
import AXS from '../../assets/icons/currencies/AXS.svg'
import BADGER from '../../assets/icons/currencies/BADGER.svg'
import BAKE from '../../assets/icons/currencies/BAKE.svg'
import BAL from '../../assets/icons/currencies/BAL.svg'
import BAND from '../../assets/icons/currencies/BAND.svg'
import BAT from '../../assets/icons/currencies/BAT.svg'
import BCH from '../../assets/icons/currencies/BCH.svg'
import BEL from '../../assets/icons/currencies/BEL.svg'
import BLZ from '../../assets/icons/currencies/BLZ.svg'
import BNB from '../../assets/icons/currencies/BNB.svg'
import BNX from '../../assets/icons/currencies/BNX.svg'
import BSV from '../../assets/icons/currencies/BSV.svg'
import BTC from '../../assets/icons/currencies/BTC.svg'
import C98 from '../../assets/icons/currencies/C98.svg'
import CAKE from '../../assets/icons/currencies/CAKE.svg'
import CHR from '../../assets/icons/currencies/CHR.svg'
import CHZ from '../../assets/icons/currencies/CHZ.svg'
import COMP from '../../assets/icons/currencies/COMP.svg'
import COTI from '../../assets/icons/currencies/COTI.svg'
import CREAM from '../../assets/icons/currencies/CREAM.svg'
import CRO from '../../assets/icons/currencies/CRO.svg'
import CRV from '../../assets/icons/currencies/CRV.svg'
import CTK from '../../assets/icons/currencies/CTK.svg'
import DAR from '../../assets/icons/currencies/DAR.svg'
import DASH from '../../assets/icons/currencies/DASH.svg'
import DENT from '../../assets/icons/currencies/DENT.svg'
import DOGE from '../../assets/icons/currencies/DOGE.svg'
import DOT from '../../assets/icons/currencies/DOT.svg'
import DYDX from '../../assets/icons/currencies/DYDX.svg'
import EDEN from '../../assets/icons/currencies/EDEN.svg'
import EGLD from '../../assets/icons/currencies/EGLD.svg'
import ENJ from '../../assets/icons/currencies/ENJ.svg'
import ENS from '../../assets/icons/currencies/ENS.svg'
import EOC from '../../assets/icons/currencies/EOC.svg'
import EOS from '../../assets/icons/currencies/EOS.svg'
import ETC from '../../assets/icons/currencies/ETC.svg'
import ETH from '../../assets/icons/currencies/ETH.svg'
import FIL from '../../assets/icons/currencies/FIL.svg'
import FLM from '../../assets/icons/currencies/FLM.svg'
import FLOW from '../../assets/icons/currencies/FLOW.svg'
import FTM from '../../assets/icons/currencies/FTM.svg'
import FTT from '../../assets/icons/currencies/FTT.svg'
import GALA from '../../assets/icons/currencies/GALA.svg'
import GMT from '../../assets/icons/currencies/GMT.svg'
import GRT from '../../assets/icons/currencies/GRT.svg'
import GTC from '../../assets/icons/currencies/GTC.svg'
import HARMONY_ONE from '../../assets/icons/currencies/HARMONY_ONE.svg'
import HBAR from '../../assets/icons/currencies/HBAR.svg'
import HOOK from '../../assets/icons/currencies/HOOK.svg'
import HOT from '../../assets/icons/currencies/HOT.svg'
import ICP from '../../assets/icons/currencies/ICP.svg'
import IMX from '../../assets/icons/currencies/IMX.svg'
import INJ from '../../assets/icons/currencies/INJ.svg'
import IOST from '../../assets/icons/currencies/IOST.svg'
import IOTA from '../../assets/icons/currencies/IOTA.svg'
import JASMY from '../../assets/icons/currencies/JASMY.svg'
import KAVA from '../../assets/icons/currencies/KAVA.svg'
import KLAY from '../../assets/icons/currencies/KLAY.svg'
import KNC from '../../assets/icons/currencies/KNC.svg'
import KSM from '../../assets/icons/currencies/KSM.svg'
import LDO from '../../assets/icons/currencies/LDO.svg'
import LINA from '../../assets/icons/currencies/LINA.svg'
import LINK from '../../assets/icons/currencies/LINK.svg'
import LIT from '../../assets/icons/currencies/LIT.svg'
import LRC from '../../assets/icons/currencies/LRC.svg'
import LTC from '../../assets/icons/currencies/LTC.svg'
import LUNA from '../../assets/icons/currencies/LUNA.svg'
import MAGIC from '../../assets/icons/currencies/MAGIC.svg'
import MANA from '../../assets/icons/currencies/MANA.svg'
import MASK from '../../assets/icons/currencies/MASK.svg'
import MATIC from '../../assets/icons/currencies/MATIC.svg'
import MKR from '../../assets/icons/currencies/MKR.svg'
import MTL from '../../assets/icons/currencies/MTL.svg'
import NEAR from '../../assets/icons/currencies/NEAR.svg'
import NEO from '../../assets/icons/currencies/NEO.svg'
import NKN from '../../assets/icons/currencies/NKN.svg'
import OCEAN from '../../assets/icons/currencies/OCEAN.svg'
import OKB from '../../assets/icons/currencies/OKB.svg'
import OMG from '../../assets/icons/currencies/OMG.svg'
import ONE from '../../assets/icons/currencies/ONE.svg'
import ONE_INCH from '../../assets/icons/currencies/ONE_INCH.svg'
import ONT from '../../assets/icons/currencies/ONT.svg'
import OP from '../../assets/icons/currencies/OP.svg'
import PEOPLE from '../../assets/icons/currencies/PEOPLE.svg'
import QNT from '../../assets/icons/currencies/QNT.svg'
import QTUM from '../../assets/icons/currencies/QTUM.svg'
import REEF from '../../assets/icons/currencies/REEF.svg'
import REN from '../../assets/icons/currencies/REN.svg'
import RLC from '../../assets/icons/currencies/RLC.svg'
import ROSE from '../../assets/icons/currencies/ROSE.svg'
import RSR from '../../assets/icons/currencies/RSR.svg'
import RUNE from '../../assets/icons/currencies/RUNE.svg'
import RVN from '../../assets/icons/currencies/RVN.svg'
import SAND from '../../assets/icons/currencies/SAND.svg'
import SFP from '../../assets/icons/currencies/SFP.svg'
import SHIB from '../../assets/icons/currencies/SHIB.svg'
import SKL from '../../assets/icons/currencies/SKL.svg'
import SLP from '../../assets/icons/currencies/SLP.svg'
import SNX from '../../assets/icons/currencies/SNX.svg'
import SOL from '../../assets/icons/currencies/SOL.svg'
import SPELL from '../../assets/icons/currencies/SPELL.svg'
import SRM from '../../assets/icons/currencies/SRM.svg'
import STG from '../../assets/icons/currencies/STG.svg'
import STORJ from '../../assets/icons/currencies/STORJ.svg'
import SUSHI from '../../assets/icons/currencies/SUSHI.svg'
import SXP from '../../assets/icons/currencies/SXP.svg'
import THETA from '../../assets/icons/currencies/THETA.svg'
import TOMO from '../../assets/icons/currencies/TOMO.svg'
import TRB from '../../assets/icons/currencies/TRB.svg'
import TRU from '../../assets/icons/currencies/TRU.svg'
import TRX from '../../assets/icons/currencies/TRX.svg'
import UNFI from '../../assets/icons/currencies/UNFI.svg'
import UNI from '../../assets/icons/currencies/UNI.svg'
import USDT from '../../assets/icons/currencies/USDT.svg'
import VET from '../../assets/icons/currencies/VET.svg'
import WAVES from '../../assets/icons/currencies/WAVES.svg'
import WOO from '../../assets/icons/currencies/WOO.svg'
import XLM from '../../assets/icons/currencies/XLM.svg'
import XMR from '../../assets/icons/currencies/XMR.svg'
import XRP from '../../assets/icons/currencies/XRP.svg'
import XTZ from '../../assets/icons/currencies/XTZ.svg'
import YFI from '../../assets/icons/currencies/YFI.svg'
import ZEC from '../../assets/icons/currencies/ZEC.svg'
import ZIL from '../../assets/icons/currencies/ZIL.svg'
import ZRX from '../../assets/icons/currencies/ZRX.svg'

//gen icons names:
/* 
for file in *.svg; do
    printf '%s,\n' "${file%.svg}"
done
 */

const icons = {
  AAVE,
  ADA,
  ALGO,
  ALICE,
  ALPHA,
  ALT,
  ANKR,
  APE,
  APT,
  AR,
  ARB,
  ATA,
  ATOM,
  AUDIO,
  AVAX,
  AXS,
  BADGER,
  BAKE,
  BAL,
  BAND,
  BAT,
  BCH,
  BEL,
  BLZ,
  BNB,
  BNX,
  BSV,
  BTC,
  C98,
  CAKE,
  CHR,
  CHZ,
  COMP,
  COTI,
  CREAM,
  CRO,
  CRV,
  CTK,
  DAR,
  DASH,
  DENT,
  DOGE,
  DOT,
  DYDX,
  EDEN,
  EGLD,
  ENJ,
  ENS,
  EOC,
  EOS,
  ETC,
  ETH,
  FIL,
  FLM,
  FLOW,
  FTM,
  FTT,
  GALA,
  GMT,
  GRT,
  GTC,
  HARMONY_ONE,
  HBAR,
  HOOK,
  HOT,
  ICP,
  IMX,
  INJ,
  IOST,
  IOTA,
  JASMY,
  KAVA,
  KLAY,
  KNC,
  KSM,
  LDO,
  LINA,
  LINK,
  LIT,
  LRC,
  LTC,
  LUNA,
  MAGIC,
  MANA,
  MASK,
  MATIC,
  MKR,
  MTL,
  NEAR,
  NEO,
  NKN,
  OCEAN,
  OKB,
  OMG,
  ONE,
  ONE_INCH,
  ONT,
  OP,
  PEOPLE,
  QNT,
  QTUM,
  REEF,
  REN,
  RLC,
  ROSE,
  RSR,
  RUNE,
  RVN,
  SAND,
  SFP,
  SHIB,
  SKL,
  SLP,
  SNX,
  SOL,
  SPELL,
  SRM,
  STG,
  STORJ,
  SUSHI,
  SXP,
  THETA,
  TOMO,
  TRB,
  TRU,
  TRX,
  UNFI,
  UNI,
  USDT,
  VET,
  WAVES,
  WOO,
  XLM,
  XMR,
  XRP,
  XTZ,
  YFI,
  ZEC,
  ZIL,
  ZRX,
}

export type CurrencyIconTypes = keyof typeof icons

export interface CurrencyIconProps extends SVGProps<unknown> {
  icon: CurrencyIconTypes
}

const parseIconName = (originalIcon: string) => {
  const icon = originalIcon.toUpperCase()
  if (icon === '1INCH') {
    return 'ONE_INCH'
  }
  return icon
}

export const CurrencyIcon: React.FC<CurrencyIconProps> = (props) => {
  const icon = parseIconName(props.icon)
  const Component = get(icons, icon)

  if (!Component) return null

  return <Component {...props} />
}
