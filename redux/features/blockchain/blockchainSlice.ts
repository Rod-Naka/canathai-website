import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
//import { removeCookie } from '../../../utils/cookie'
import { RootState } from '../../store'

type StateType = {
  provider?: any
  web3Provider?: any
  address?: string | null
  chainId?: number | null
  loading?: boolean
}

type ActionType =
  | {
      type: 'SET_WEB3_PROVIDER'
      provider?: StateType['provider']
      web3Provider?: StateType['web3Provider']
      address?: StateType['address']
      chainId?: StateType['chainId']
    }
  | {
      type: 'SET_ADDRESS'
      address?: StateType['address']
    }
  | {
      type: 'SET_CHAIN_ID'
      chainId?: StateType['chainId']
    }
  | {
      type: 'RESET_WEB3_PROVIDER'
    }

type ActionTypeWeb3Provider = {
  provider?: StateType['provider']
  web3Provider?: StateType['web3Provider']
  address?: StateType['address']
  chainId?: StateType['chainId']
}

type ActionTypeAddress = {
  address?: StateType['address']
}

type AcctionTypeChainId = {
  chainId?: StateType['chainId']
}

type AcctionTypeLoading = {
  loading?: boolean
}

export type BlockchainState = {
  provider?: StateType['provider']
  web3Provider?: StateType['web3Provider']
  address?: StateType['address']
  chainId?: StateType['chainId'],
  loading?: boolean
}

const initialState: BlockchainState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
  loading: false,
}
export const blockchainSlice = createSlice({
  name: "blockchain",
  initialState,
  reducers: {
    SET_WEB3_PROVIDER: (state: StateType, action: PayloadAction<ActionTypeWeb3Provider>) => {
      const { provider, web3Provider, address, chainId } = action.payload

      return {
        ...state,
        provider,
        web3Provider,
        address,
        chainId
      }
    },
    SET_ADDRESS: (state: StateType, action: PayloadAction<ActionTypeAddress>) => {
      return {
        ...state,
        address: action.payload.address
      }
    },
    SET_CHAINID: (state: StateType, action: PayloadAction<AcctionTypeChainId>) => {
      return {
        ...state,
        chainId: action.payload.chainId
      }
    },
    RESET_WEB3_PROVIDER: () => {
      //removeCookie("auth")
      localStorage.clear()
      return initialState
    },
    SET_LOADING: (state: StateType, action: PayloadAction<AcctionTypeLoading>) => {
      state.loading = action.payload.loading
    }
  }
})

export const {
  SET_WEB3_PROVIDER,
  SET_ADDRESS,
  SET_CHAINID,
  RESET_WEB3_PROVIDER,
  SET_LOADING
} = blockchainSlice.actions;

export const selectBlockchain = (state: RootState) => {

  return {
    ...state.blockchain
  }
};

export default blockchainSlice.reducer