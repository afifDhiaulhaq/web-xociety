import Banner from "@/component/home/banner";
import AboutHome from "@/component/home/abouthome";
import DiscoverHome from "@/component/home/discoverhome";
import ProductList from "@/component/catalog/productlist";

export default function Home() {
  return (
    <main className="flex flex-col bg-white font-sans">
      <section id="banner">
        <Banner />
      </section>

      <section id="about">
        <AboutHome />
      </section>

      <section id="discover">
        <DiscoverHome />
      </section>

      <section id="products">
        <ProductList />
      </section>
    </main>
  );
}
