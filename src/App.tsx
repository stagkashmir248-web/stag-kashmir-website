
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './components/Layout';

// Standard Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import CustomBat from './pages/CustomBat';
import CareGuide from './pages/CareGuide';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import AdminInventory from './pages/AdminInventory';
import AdminVariations from './pages/AdminVariations';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standard user-facing routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/custom-bat" element={<CustomBat />} />
          <Route path="/care-guide" element={<CareGuide />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin routes (Layouts are built into the components themselves currently) */}
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/variations" element={<AdminVariations />} />
        <Route path="/admin" element={<AdminInventory />} /> {/* Default admin route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
