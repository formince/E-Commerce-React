import { ProductListDto, CategoryDto } from '../types';

export const mockCategories: CategoryDto[] = [
  { id: 1, name: 'Kalemler' },
  { id: 2, name: 'Defterler' },
  { id: 3, name: 'Kitaplar' },
  { id: 4, name: 'Kırtasiye Malzemeleri' },
  { id: 5, name: 'Sanat Malzemeleri' },
];

export const mockProducts: ProductListDto[] = [
  {
    id: 1,
    name: 'Tükenmez Kalem - Mavi',
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc36b9f?w=500&auto=format&fit=crop&q=60',
    categoryName: 'Kalemler'
  },
  {
    id: 2,
    name: 'Kurşun Kalem Seti',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60',
    categoryName: 'Kalemler'
  },
  {
    id: 3,
    name: 'Spiralli Defter A4',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=60',
    categoryName: 'Defterler'
  },
  {
    id: 4,
    name: 'Çizgili Ajanda',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
    categoryName: 'Defterler'
  },
  {
    id: 5,
    name: 'Roman - Klasik',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
    categoryName: 'Kitaplar'
  },
  {
    id: 6,
    name: 'Makas - Profesyonel',
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc36b9f?w=500&auto=format&fit=crop&q=60',
    categoryName: 'Kırtasiye Malzemeleri'
  },
  {
    id: 7,
    name: 'Boya Seti - 24 Renk',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60',
    categoryName: 'Sanat Malzemeleri'
  },
  {
    id: 8,
    name: 'Fırça Seti',
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc36b9f?w=500&auto=format&fit=crop&q=60',
    categoryName: 'Sanat Malzemeleri'
  }
]; 