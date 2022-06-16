import {
    Action,
    configureStore,
    getDefaultMiddleware,
    ThunkAction,
  } from '@reduxjs/toolkit';
//   import counterReducer from './features/counter/counterSlice';
  import blockchainReducer from './features/blockchain/blockchainSlice';
//   import yourprojectReducer from './features/yourproject/yourprojectSlice';
  export const store = configureStore({
    reducer: {
    //   counter: counterReducer,
      blockchain: blockchainReducer,
    //   yourproject: yourprojectReducer,
    },
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
     ReturnType,
     RootState,
     unknown,
     Action<string>
   >;