import CategorySection from "@/src/components/Home Page/CategorySection";

const HomePageBody = () => {
  const categories = [
    "Writing",
    "Audio",
    "Visual",
    "Fact Checking",
    "SEO",
    "Translation",
    "Other",
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
