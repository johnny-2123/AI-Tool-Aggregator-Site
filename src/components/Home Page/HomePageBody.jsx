import CategorySection from "@/src/components/Home Page/CategorySection";

const HomePageBody = async () => {
  const categories = [
    { title: "Writing", value: "WRITING" },
    { title: "Audio", value: "AUDIO" },
    { title: "Visual", value: "VISUAL" },
    { title: "Fact Checking", value: "FACT_CHECKING" },
    { title: "SEO", value: "SEO" },
    { title: "Translation", value: "TRANSLATION" },
    { title: "Other", value: "OTHER" },
  ];
  return (
    <div>
      {categories.map((category) => (
        <CategorySection key={category.value} category={category} />
      ))}
    </div>
  );
};

export default HomePageBody;
