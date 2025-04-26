import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AdminLayout from "./layout/AdminLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { AuthProvider } from "./context/AuthProvider";
import StoreLayout from "./layout/StoreLayout";
import ShopPage from "./pages/Shop/ShopPage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthLayout from "./layout/AuthLayout";
import BookTablePage from "./pages/admin/Books/BookTablePage";
import AddBookPage from "./pages/admin/Books/AddBookPage";
import BooksPage from "./pages/Shop/BooksPage";
import BookDetailPage from "./pages/Shop/BookDetailPage";
import { Toaster } from "react-hot-toast";
import CartPage from "./pages/Shop/CartPage";
import OrderTablePage from "./pages/admin/Orders/OrderTablePage";
import CategoryTablePage from "./pages/admin/Categories/CategoryTablePage";
import CreateCategoryPage from "./pages/admin/Categories/CreateCategoryPage";
import EditCategoryPage from "./pages/admin/Categories/EditCategoryPage";
import EditBookPage from "./pages/admin/Books/EditBookPage";
import UserTablePage from "./pages/admin/Users/UserTablePage";
import CreateOrderPage from "./pages/admin/Orders/CreateOrderPage";
import DashboardPage from "./pages/admin/Dashboard";
import ChatLayout from "./layout/ChatLayout";
export default function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <ScrollToTop />
                    <ChatLayout>
                        <Routes>
                            {/* Auth Layout */}
                            <Route path="/" element={<AuthLayout />}>
                                <Route path="/signin" element={<SignIn />} />
                                <Route path="/signup" element={<SignUp />} />
                            </Route>

                            <Route path="/" element={<StoreLayout />}>
                                <Route index path="/" element={<ShopPage />} />
                                <Route
                                    index
                                    path="/books"
                                    element={<BooksPage />}
                                />
                                <Route
                                    index
                                    path="/books/:id"
                                    element={<BookDetailPage />}
                                />

                                <Route
                                    index
                                    path="/cart"
                                    element={<CartPage />}
                                />
                            </Route>
                            {/* Dashboard Layout */}
                            <Route element={<AdminLayout />}>
                                <Route
                                    index
                                    path="/admin"
                                    element={<DashboardPage />}
                                />
                                <Route
                                    path="/admin/books"
                                    element={<BookTablePage />}
                                />
                                <Route
                                    path="/admin/books/add"
                                    element={<AddBookPage />}
                                />
                                <Route
                                    path="/admin/books/edit/:id"
                                    element={<EditBookPage />}
                                />
                                <Route
                                    path="/admin/categories"
                                    element={<CategoryTablePage />}
                                />
                                <Route
                                    path="/admin/categories/add"
                                    element={<CreateCategoryPage />}
                                />
                                <Route
                                    path="/admin/categories/edit/:id"
                                    element={<EditCategoryPage />}
                                />
                                <Route
                                    path="/admin/users"
                                    element={<UserTablePage />}
                                />

                                <Route
                                    path="/admin/orders"
                                    element={<OrderTablePage />}
                                />
                                <Route
                                    path="/admin/orders/create"
                                    element={<CreateOrderPage />}
                                />

                                {/* Others Page */}
                                <Route
                                    path="/profile"
                                    element={<UserProfiles />}
                                />
                                <Route
                                    path="/calendar"
                                    element={<Calendar />}
                                />
                                <Route path="/blank" element={<Blank />} />

                                {/* Forms */}
                                <Route
                                    path="/form-elements"
                                    element={<FormElements />}
                                />

                                {/* Tables */}

                                {/* Ui Elements */}
                                <Route path="/alerts" element={<Alerts />} />
                                <Route path="/avatars" element={<Avatars />} />
                                <Route path="/badge" element={<Badges />} />
                                <Route path="/buttons" element={<Buttons />} />
                                <Route path="/images" element={<Images />} />
                                <Route path="/videos" element={<Videos />} />

                                {/* Charts */}
                                <Route
                                    path="/line-chart"
                                    element={<LineChart />}
                                />
                                <Route
                                    path="/bar-chart"
                                    element={<BarChart />}
                                />
                            </Route>

                            {/* Fallback Route */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </ChatLayout>
                </Router>
                <Toaster position="top-right" />
            </AuthProvider>
        </>
    );
}
