import CategorySection from "@/src/components/Home Page/CategorySection";

const HomePageBody = () => {
  const categories = [
    "Audio",
    "Writing",
    "Visual",
    "Fact Checking",
    "SEO",
    "Translation",
  ];
  return (
    <div>
      {categories.map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  );
};

export default HomePageBody;
