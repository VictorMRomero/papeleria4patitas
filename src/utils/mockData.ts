import { Product, Category, User, Order } from '@/interfaces';

// Datos mock para productos


// Datos mock para categorías

// Datos mock para usuarios
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@4patitas.com',
    fullName: 'Administrador',
    roles: 'ADMIN',
    password: '',
    createAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: '2',
    email: 'usuario@ejemplo.com',
    fullName: 'Usuario Ejemplo',
    roles: 'USER',
    password: '',
    createAt: new Date().toISOString(),
    isActive: true
  }
];

// Datos mock para órdenes
export const mockOrders: Order[] = [
  {
    id: '1',
    itemsInOrder: 3,
    createAt: new Date().toISOString(),
    status: 'PENDING',
    isPaid: false,
    manipulacion: 0,
    discount: 0,
    subTotal: 45.99,
    total: 45.99
  }
];

// Función helper para simular delay de API
export const simulateApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Función helper para simular error aleatorio (para testing)
export const simulateApiError = (probability: number = 0.1) => 
  Math.random() < probability; 