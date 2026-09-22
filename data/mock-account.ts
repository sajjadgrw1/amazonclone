import type { Address, Order, PaymentMethod, User } from "@/types";

export const mockAddresses: Address[] = [
  {
    id: "addr-home",
    fullName: "Jordan Ellis",
    line1: "482 Birchwood Lane",
    city: "Austin",
    state: "TX",
    postalCode: "78701",
    country: "United States",
    phone: "(512) 555-0142",
    isDefault: true,
  },
  {
    id: "addr-work",
    fullName: "Jordan Ellis",
    line1: "1200 Commerce Street, Suite 400",
    city: "Austin",
    state: "TX",
    postalCode: "78702",
    country: "United States",
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  { id: "pm-card-1", type: "mock-card", label: "Mock Visa ending in 4242", isDefault: true },
  { id: "pm-cod", type: "cash-on-delivery", label: "Cash on delivery" },
];

export const mockUser: User = {
  id: "user-jordan-ellis",
  name: "Jordan Ellis",
  email: "jordan.ellis@example.com",
  addresses: mockAddresses,
  defaultPaymentMethodId: "pm-card-1",
};

export const mockOrders: Order[] = [
  {
    id: "order-1001",
    orderNumber: "NUV-1001-8842",
    items: [
      {
        productId: "voltix-wireless-headphones",
        title: "Voltix Over-Ear Wireless Headphones",
        imageUrl: "https://picsum.photos/seed/voltix-wireless-headphones/300/300",
        unitPrice: 79.99,
        quantity: 1,
      },
      {
        productId: "portaflow-power-bank",
        title: "Portaflow 20,000mAh Fast-Charge Power Bank",
        imageUrl: "https://picsum.photos/seed/portaflow-power-bank/300/300",
        unitPrice: 34.5,
        quantity: 2,
      },
    ],
    status: "delivered",
    placedAt: "2026-08-30T15:22:00.000Z",
    subtotal: 148.99,
    discount: 10.0,
    tax: 0,
    deliveryFee: 0,
    total: 138.99,
    shippingAddress: mockAddresses[0],
    paymentMethod: mockPaymentMethods[0],
  },
  {
    id: "order-1002",
    orderNumber: "NUV-1002-1190",
    items: [
      {
        productId: "hearthlane-air-fryer",
        title: "Hearthlane 6-Quart Digital Air Fryer",
        imageUrl: "https://picsum.photos/seed/hearthlane-air-fryer/300/300",
        unitPrice: 69.99,
        quantity: 1,
      },
    ],
    status: "shipped",
    placedAt: "2026-09-14T09:05:00.000Z",
    subtotal: 69.99,
    discount: 0,
    tax: 0,
    deliveryFee: 4.99,
    total: 74.98,
    shippingAddress: mockAddresses[0],
    paymentMethod: mockPaymentMethods[0],
  },
  {
    id: "order-1003",
    orderNumber: "NUV-1003-5567",
    items: [
      {
        productId: "trailhead-insulated-bottle",
        title: "Trailhead Insulated Steel Water Bottle, 32oz",
        imageUrl: "https://picsum.photos/seed/trailhead-insulated-bottle/300/300",
        unitPrice: 16.99,
        quantity: 3,
      },
    ],
    status: "processing",
    placedAt: "2026-09-20T18:40:00.000Z",
    subtotal: 50.97,
    discount: 0,
    tax: 0,
    deliveryFee: 0,
    total: 50.97,
    shippingAddress: mockAddresses[1],
    paymentMethod: mockPaymentMethods[1],
  },
];
