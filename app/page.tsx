import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/banner-01.svg"
          alt="Promação 30% off em Pizzas"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
