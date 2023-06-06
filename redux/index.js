import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const initialState = {
  trips: [
    {
        "id": "9f1e083d-87c9-4fb0-a096-b7a297c0558e",
        "trip": {
            "id": "ae3f9a5e-a5d4-4962-9242-27864a69e03b",
            "vehicle": {
                "id": "174f60b1-3d48-4e50-9f73-5be92821880f",
                "type_of_vehicle": "Double Cabin",
                "brand": "Toyota",
                "carrying_capacity": "4",
                "is_available": true
            },
            "driver": {
                "id": "a3627d07-acc6-453f-a6cc-b3258d5ea0cb",
                "user": {
                    "Id": "747bded3-159c-4be0-8157-6253b91e6b2a",
                    "username": null,
                    "first_name": "",
                    "last_name": "",
                    "email": "timothy.masiko@kanzucode.com",
                    "gender": "",
                    "lnd_directory": "/Users/timothy/.polar/networks/6/volumes/lnd",
                    "tls_cert_path": "/Users/timothy/.polar/networks/6/volumes/lnd/alice/tls.cert",
                    "grpc_host": "127.0.0.1",
                    "grpc_port": 10009,
                    "macaroon_path": "/Users/timothy/.polar/networks/6/volumes/lnd/alice/data/chain/bitcoin/regtest/admin.macaroon",
                    "network": "regtest",
                    "date_joined": "2023-04-18T19:30:54Z",
                    "is_passenger": false,
                    "is_driver": true,
                    "wallet_balance": "0.00"
                },
                "is_available": true
            },
            "pick_up_location": "kiira",
            "destination": "masaka",
            "date": "2023-04-18T19:56:59Z",
            "reason": "home",
            "status": "Approved",
            "started_at": null,
            "ended_at": null,
            "cost": "500.00",
            "preimage": "gL3TJxnk7jE2Qy2mD8QeB/LyD4TlwD8RzGGXeuBs0Rc=",
            "payment_request": "lnbcrt5u1pjraaufpp5glt9esyhacg0xg67azdhc5c2x5j7h5p8cqlr0haha869a9s7z7fsdq5wpshjhmxdae97unfv3jscqzpyxqrrssrzjqwt4xt434d2d0k5tzngpdrp94nu4q57rmvap0u6q2qp5p5k6uhmksqqqnyqqqqgqqyqqqqqpqqqqqzsqqcsp50wpx7tgtm7lq8wtay07x3x07ucfm66ka35xsjr76kmx2kg22qh3s9qyyssqvr2mewv3x2mymyjjp7ftdqfqs25tqu9lr7m963sc3ryl6zju64n3rgkvehpe5rlytrvgmj66nallq5gr08dylkgn224yrw8l6uw504cpz08pjv"
        },
        "passenger": {
            "id": "10af6537-7a4b-480d-a846-f927c84b4cf2",
            "user": {
                "Id": "c8992c62-9da0-4393-8e9b-90be132f2f90",
                "username": null,
                "first_name": "",
                "last_name": "",
                "email": "masikotimo@gmail.com",
                "gender": "",
                "lnd_directory": "/Users/timothy/.polar/networks/6/volumes/lnd",
                "tls_cert_path": "/Users/timothy/.polar/networks/6/volumes/lnd/alice/tls.cert",
                "grpc_host": "127.0.0.1",
                "grpc_port": 10010,
                "macaroon_path": "/Users/timothy/.polar/networks/6/volumes/lnd/alice/data/chain/bitcoin/regtest/invoice.macaroon",
                "network": "regtest",
                "date_joined": "2023-04-17T22:59:58Z",
                "is_passenger": true,
                "is_driver": false,
                "wallet_balance": "0.00"
            },
            "is_available": true
        }
    }
],
  driverDetails: {},
  profile:{},
  passengerId:'',
  pendingTrips: {},
  approvedTrips: [
    {
        "id": "9f1e083d-87c9-4fb0-a096-b7a297c0558e",
        "trip": {
            "id": "ae3f9a5e-a5d4-4962-9242-27864a69e03b",
            "vehicle": {
                "id": "174f60b1-3d48-4e50-9f73-5be92821880f",
                "type_of_vehicle": "Double Cabin",
                "brand": "Toyota",
                "carrying_capacity": "4",
                "is_available": true
            },
            "driver": {
                "id": "a3627d07-acc6-453f-a6cc-b3258d5ea0cb",
                "user": {
                    "Id": "747bded3-159c-4be0-8157-6253b91e6b2a",
                    "username": null,
                    "first_name": "",
                    "last_name": "",
                    "email": "timothy.masiko@kanzucode.com",
                    "gender": "",
                    "lnd_directory": "/Users/timothy/.polar/networks/6/volumes/lnd",
                    "tls_cert_path": "/Users/timothy/.polar/networks/6/volumes/lnd/alice/tls.cert",
                    "grpc_host": "127.0.0.1",
                    "grpc_port": 10009,
                    "macaroon_path": "/Users/timothy/.polar/networks/6/volumes/lnd/alice/data/chain/bitcoin/regtest/admin.macaroon",
                    "network": "regtest",
                    "date_joined": "2023-04-18T19:30:54Z",
                    "is_passenger": false,
                    "is_driver": true,
                    "wallet_balance": "0.00"
                },
                "is_available": true
            },
            "pick_up_location": "kiira",
            "destination": "masaka",
            "date": "2023-04-18T19:56:59Z",
            "reason": "home",
            "status": "Approved",
            "started_at": null,
            "ended_at": null,
            "cost": "500.00",
            "preimage": "gL3TJxnk7jE2Qy2mD8QeB/LyD4TlwD8RzGGXeuBs0Rc=",
            "payment_request": "lnbcrt5u1pjraaufpp5glt9esyhacg0xg67azdhc5c2x5j7h5p8cqlr0haha869a9s7z7fsdq5wpshjhmxdae97unfv3jscqzpyxqrrssrzjqwt4xt434d2d0k5tzngpdrp94nu4q57rmvap0u6q2qp5p5k6uhmksqqqnyqqqqgqqyqqqqqpqqqqqzsqqcsp50wpx7tgtm7lq8wtay07x3x07ucfm66ka35xsjr76kmx2kg22qh3s9qyyssqvr2mewv3x2mymyjjp7ftdqfqs25tqu9lr7m963sc3ryl6zju64n3rgkvehpe5rlytrvgmj66nallq5gr08dylkgn224yrw8l6uw504cpz08pjv"
        },
        "passenger": {
            "id": "10af6537-7a4b-480d-a846-f927c84b4cf2",
            "user": {
                "Id": "c8992c62-9da0-4393-8e9b-90be132f2f90",
                "username": null,
                "first_name": "",
                "last_name": "",
                "email": "masikotimo@gmail.com",
                "gender": "",
                "lnd_directory": "/Users/timothy/.polar/networks/6/volumes/lnd",
                "tls_cert_path": "/Users/timothy/.polar/networks/6/volumes/lnd/alice/tls.cert",
                "grpc_host": "127.0.0.1",
                "grpc_port": 10010,
                "macaroon_path": "/Users/timothy/.polar/networks/6/volumes/lnd/alice/data/chain/bitcoin/regtest/invoice.macaroon",
                "network": "regtest",
                "date_joined": "2023-04-17T22:59:58Z",
                "is_passenger": true,
                "is_driver": false,
                "wallet_balance": "0.00"
            },
            "is_available": true
        }
    }
],
  whichTrip: true,
  
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HEADERS':
      return { ...state, requestHeaders: action.headers };

      case 'SET_DRIVER_DETAILS':
      return { ...state, driverDetails: action.driverDetails };

      case 'SET_TRIPS':
      return { ...state, trips: action.trips };

      case 'SET_PROFILE':
      return { ...state, profile: action.profile };

      case 'SET_PASSENGER_ID':
      return { ...state, passengerId: action.passengerId };

      case 'SET_APPROVED_TRIP_DETAILS':
      return { ...state, approvedTrips: action.tripDetails };
      
      case 'SET_PENDING_TRIP_DETAILS':
      return { ...state, pendingTrips: action.tripDetails };
      case 'SET_TRIP_TO_PENDING':
      return { ...state, whichTrip: false };
      case 'SET_TRIP_TO_APPROVED':
      console.log('here bwewchi')
      return { ...state, whichTrip: true };

    
    case 'SET_DATE':
      return { ...state, currentDate: action.currentDate };

    // SET_DRIVER_DETAILS

    // no default
  }
  return state;
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['counter','trips'],
  // stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
