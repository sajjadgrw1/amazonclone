"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { Address, CartItem, Order, ProductList, Registry, User, WishlistItem } from "@/types";
import { mockUser } from "@/data/mock-account";

const STORAGE_KEY = "nuvara-app-state";

interface AppState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: User | null;
  selectedAddressId: string | null;
  selectedPaymentMethodId: string | null;
  clippedCouponCodes: string[];
  customAddresses: Address[];
  placedOrders: Order[];
  lists: ProductList[];
  registries: Registry[];
  hydrated: boolean;
}

const initialState: AppState = {
  cart: [],
  wishlist: [],
  user: null,
  selectedAddressId: null,
  selectedPaymentMethodId: null,
  clippedCouponCodes: [],
  customAddresses: [],
  placedOrders: [],
  lists: [],
  registries: [],
  hydrated: false,
};

type Action =
  | { type: "HYDRATE"; payload: Partial<AppState> }
  | { type: "ADD_TO_CART"; productId: string; variantId?: string; quantity: number }
  | { type: "SET_QUANTITY"; productId: string; variantId?: string; quantity: number }
  | { type: "REMOVE_FROM_CART"; productId: string; variantId?: string }
  | { type: "SET_SAVED_FOR_LATER"; productId: string; variantId?: string; saved: boolean }
  | { type: "TOGGLE_WISHLIST"; productId: string }
  | { type: "REMOVE_FROM_WISHLIST"; productId: string }
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "SET_ADDRESS"; addressId: string }
  | { type: "SET_PAYMENT_METHOD"; paymentMethodId: string }
  | { type: "CLIP_COUPON"; code: string }
  | { type: "UNCLIP_COUPON"; code: string }
  | { type: "CLEAR_CART" }
  | { type: "ADD_ADDRESS"; address: Address }
  | { type: "UPDATE_ADDRESS"; address: Address }
  | { type: "DELETE_ADDRESS"; addressId: string }
  | { type: "PLACE_ORDER"; order: Order }
  | { type: "CREATE_LIST"; list: ProductList }
  | { type: "RENAME_LIST"; listId: string; name: string }
  | { type: "DELETE_LIST"; listId: string }
  | { type: "SET_LIST_PRIVACY"; listId: string; privacy: ProductList["privacy"] }
  | { type: "TOGGLE_LIST_PRODUCT"; listId: string; productId: string }
  | { type: "CREATE_REGISTRY"; registry: Registry }
  | { type: "TOGGLE_REGISTRY_PRODUCT"; registryId: string; productId: string };

function sameLine(a: CartItem, productId: string, variantId?: string) {
  return a.productId === productId && a.variantId === variantId;
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload, hydrated: true };

    case "ADD_TO_CART": {
      const existing = state.cart.find((l) => sameLine(l, action.productId, action.variantId));
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((l) =>
            sameLine(l, action.productId, action.variantId)
              ? { ...l, quantity: l.quantity + action.quantity, savedForLater: false }
              : l
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            productId: action.productId,
            variantId: action.variantId,
            quantity: action.quantity,
            savedForLater: false,
          },
        ],
      };
    }

    case "SET_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((l) =>
          sameLine(l, action.productId, action.variantId)
            ? { ...l, quantity: Math.max(1, action.quantity) }
            : l
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((l) => !sameLine(l, action.productId, action.variantId)),
      };

    case "SET_SAVED_FOR_LATER":
      return {
        ...state,
        cart: state.cart.map((l) =>
          sameLine(l, action.productId, action.variantId)
            ? { ...l, savedForLater: action.saved }
            : l
        ),
      };

    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.some((w) => w.productId === action.productId);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((w) => w.productId !== action.productId)
          : [...state.wishlist, { productId: action.productId, addedAt: new Date().toISOString() }],
      };
    }

    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter((w) => w.productId !== action.productId) };

    case "LOGIN":
      return { ...state, user: mockUser, selectedAddressId: mockUser.addresses[0]?.id ?? null, selectedPaymentMethodId: mockUser.defaultPaymentMethodId ?? null };

    case "LOGOUT":
      return { ...state, user: null };

    case "SET_ADDRESS":
      return { ...state, selectedAddressId: action.addressId };

    case "SET_PAYMENT_METHOD":
      return { ...state, selectedPaymentMethodId: action.paymentMethodId };

    case "CLIP_COUPON":
      return state.clippedCouponCodes.includes(action.code)
        ? state
        : { ...state, clippedCouponCodes: [...state.clippedCouponCodes, action.code] };

    case "UNCLIP_COUPON":
      return { ...state, clippedCouponCodes: state.clippedCouponCodes.filter((c) => c !== action.code) };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "ADD_ADDRESS":
      return { ...state, customAddresses: [...state.customAddresses, action.address] };

    case "UPDATE_ADDRESS":
      return {
        ...state,
        customAddresses: state.customAddresses.map((a) => (a.id === action.address.id ? action.address : a)),
      };

    case "DELETE_ADDRESS":
      return {
        ...state,
        customAddresses: state.customAddresses.filter((a) => a.id !== action.addressId),
        selectedAddressId: state.selectedAddressId === action.addressId ? null : state.selectedAddressId,
      };

    case "PLACE_ORDER":
      return { ...state, placedOrders: [action.order, ...state.placedOrders], cart: [], clippedCouponCodes: [] };

    case "CREATE_LIST":
      return { ...state, lists: [...state.lists, action.list] };

    case "RENAME_LIST":
      return {
        ...state,
        lists: state.lists.map((l) => (l.id === action.listId ? { ...l, name: action.name } : l)),
      };

    case "DELETE_LIST":
      return { ...state, lists: state.lists.filter((l) => l.id !== action.listId) };

    case "SET_LIST_PRIVACY":
      return {
        ...state,
        lists: state.lists.map((l) => (l.id === action.listId ? { ...l, privacy: action.privacy } : l)),
      };

    case "TOGGLE_LIST_PRODUCT":
      return {
        ...state,
        lists: state.lists.map((l) =>
          l.id === action.listId
            ? {
                ...l,
                productIds: l.productIds.includes(action.productId)
                  ? l.productIds.filter((id) => id !== action.productId)
                  : [...l.productIds, action.productId],
              }
            : l
        ),
      };

    case "CREATE_REGISTRY":
      return { ...state, registries: [...state.registries, action.registry] };

    case "TOGGLE_REGISTRY_PRODUCT":
      return {
        ...state,
        registries: state.registries.map((r) =>
          r.id === action.registryId
            ? {
                ...r,
                productIds: r.productIds.includes(action.productId)
                  ? r.productIds.filter((id) => id !== action.productId)
                  : [...r.productIds, action.productId],
              }
            : r
        ),
      };

    default:
      return state;
  }
}

interface AppStoreContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppStoreContext = createContext<AppStoreContextValue | null>(null);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppState>;
        dispatch({ type: "HYDRATE", payload: parsed });
      } else {
        dispatch({ type: "HYDRATE", payload: {} });
      }
    } catch {
      dispatch({ type: "HYDRATE", payload: {} });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      const { hydrated, ...persisted } = state;
      void hydrated;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // best-effort persistence only
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}

export function useCart() {
  const { state, dispatch } = useAppStore();
  const activeItems = state.cart.filter((l) => !l.savedForLater);
  const savedItems = state.cart.filter((l) => l.savedForLater);
  const itemCount = activeItems.reduce((sum, l) => sum + l.quantity, 0);

  return {
    items: state.cart,
    activeItems,
    savedItems,
    itemCount,
    hydrated: state.hydrated,
    addToCart: useCallback(
      (productId: string, quantity = 1, variantId?: string) =>
        dispatch({ type: "ADD_TO_CART", productId, variantId, quantity }),
      [dispatch]
    ),
    setQuantity: useCallback(
      (productId: string, quantity: number, variantId?: string) =>
        dispatch({ type: "SET_QUANTITY", productId, variantId, quantity }),
      [dispatch]
    ),
    removeFromCart: useCallback(
      (productId: string, variantId?: string) => dispatch({ type: "REMOVE_FROM_CART", productId, variantId }),
      [dispatch]
    ),
    setSavedForLater: useCallback(
      (productId: string, saved: boolean, variantId?: string) =>
        dispatch({ type: "SET_SAVED_FOR_LATER", productId, variantId, saved }),
      [dispatch]
    ),
    clearCart: useCallback(() => dispatch({ type: "CLEAR_CART" }), [dispatch]),
  };
}

export function useWishlist() {
  const { state, dispatch } = useAppStore();
  return {
    items: state.wishlist,
    hydrated: state.hydrated,
    isWishlisted: (productId: string) => state.wishlist.some((w) => w.productId === productId),
    toggleWishlist: useCallback((productId: string) => dispatch({ type: "TOGGLE_WISHLIST", productId }), [dispatch]),
    removeFromWishlist: useCallback(
      (productId: string) => dispatch({ type: "REMOVE_FROM_WISHLIST", productId }),
      [dispatch]
    ),
  };
}

export function useAuth() {
  const { state, dispatch } = useAppStore();
  return {
    user: state.user,
    isSignedIn: !!state.user,
    hydrated: state.hydrated,
    login: useCallback(() => dispatch({ type: "LOGIN" }), [dispatch]),
    logout: useCallback(() => dispatch({ type: "LOGOUT" }), [dispatch]),
  };
}

export function useCheckoutSelection() {
  const { state, dispatch } = useAppStore();
  return {
    selectedAddressId: state.selectedAddressId,
    selectedPaymentMethodId: state.selectedPaymentMethodId,
    clippedCouponCodes: state.clippedCouponCodes,
    customAddresses: state.customAddresses,
    setAddress: useCallback((addressId: string) => dispatch({ type: "SET_ADDRESS", addressId }), [dispatch]),
    addAddress: useCallback((address: Address) => dispatch({ type: "ADD_ADDRESS", address }), [dispatch]),
    updateAddress: useCallback((address: Address) => dispatch({ type: "UPDATE_ADDRESS", address }), [dispatch]),
    deleteAddress: useCallback((addressId: string) => dispatch({ type: "DELETE_ADDRESS", addressId }), [dispatch]),
    setPaymentMethod: useCallback(
      (paymentMethodId: string) => dispatch({ type: "SET_PAYMENT_METHOD", paymentMethodId }),
      [dispatch]
    ),
    clipCoupon: useCallback((code: string) => dispatch({ type: "CLIP_COUPON", code }), [dispatch]),
    unclipCoupon: useCallback((code: string) => dispatch({ type: "UNCLIP_COUPON", code }), [dispatch]),
  };
}

export function useOrders() {
  const { state, dispatch } = useAppStore();
  return {
    placedOrders: state.placedOrders,
    hydrated: state.hydrated,
    placeOrder: useCallback((order: Order) => dispatch({ type: "PLACE_ORDER", order }), [dispatch]),
  };
}

export function useLists() {
  const { state, dispatch } = useAppStore();
  return {
    lists: state.lists,
    hydrated: state.hydrated,
    createList: useCallback((list: ProductList) => dispatch({ type: "CREATE_LIST", list }), [dispatch]),
    renameList: useCallback((listId: string, name: string) => dispatch({ type: "RENAME_LIST", listId, name }), [dispatch]),
    deleteList: useCallback((listId: string) => dispatch({ type: "DELETE_LIST", listId }), [dispatch]),
    setListPrivacy: useCallback(
      (listId: string, privacy: ProductList["privacy"]) => dispatch({ type: "SET_LIST_PRIVACY", listId, privacy }),
      [dispatch]
    ),
    toggleListProduct: useCallback(
      (listId: string, productId: string) => dispatch({ type: "TOGGLE_LIST_PRODUCT", listId, productId }),
      [dispatch]
    ),
  };
}

export function useRegistries() {
  const { state, dispatch } = useAppStore();
  return {
    registries: state.registries,
    hydrated: state.hydrated,
    createRegistry: useCallback((registry: Registry) => dispatch({ type: "CREATE_REGISTRY", registry }), [dispatch]),
    toggleRegistryProduct: useCallback(
      (registryId: string, productId: string) => dispatch({ type: "TOGGLE_REGISTRY_PRODUCT", registryId, productId }),
      [dispatch]
    ),
  };
}
