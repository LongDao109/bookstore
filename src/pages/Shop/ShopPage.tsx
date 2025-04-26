import PageMeta from "../../components/common/PageMeta";
import Hero from "../../components/hero/Hero";
import Services from "../../components/Services/Services";
import Banner from "../../components/Banner/Banner";
import Books from "../../components/BooksSlider/Books";
import Testimonial from "../../components/Testimonial/Testimonial";
import Footer from "../../components/Footer/Footer";

const ShopPage = () => {
    return (
        <div>
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />

            <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden ">
                <Hero />
                <Services />
                <Banner />

                <Books />
                <Testimonial />
                <Footer />
            </div>
        </div>
    );
};

export default ShopPage;
