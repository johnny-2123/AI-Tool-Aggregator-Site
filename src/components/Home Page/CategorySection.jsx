const CategorySection = ({ category }) => {
  return (
    <div className="mt-10">
      <h2 id={category} className="text-2xl font-semibold">
        {category}
      </h2>
    </div>
  );
};

export default CategorySection;
