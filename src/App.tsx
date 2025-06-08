import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeTemplate } from './components/templates/HomeTemplate';
import { ProductsTemplate } from './components/templates/ProductsTemplate';
import { ProductDetailsTemplate } from './components/templates/ProductDetailsTemplate';
import { ContactTemplate } from './components/templates/ContactTemplate';
import { ThemeProvider } from './components/providers/ThemeProvider';
import './style.css';
import { AdminLayout } from './app/admin/layout';
import { AdminLoginPage } from './app/admin/login/page';
import { AdminDashboardPage } from './app/admin/dashboard/page';
import { AdminProductsPage } from './app/admin/products/page';
import { NewProductPage } from './app/admin/products/new/page';
import { EditProductPage } from './app/admin/products/edit/page';


function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeTemplate />} />
          <Route path="/products" element={<ProductsTemplate />} />
          <Route path="/products/:id" element={<ProductDetailsTemplate />} />
         
          <Route path="/contact" element={<ContactTemplate />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<NewProductPage />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 