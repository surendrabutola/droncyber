export default function PageBanner({name}:any) {
  return (
    <div className="w-full h-[216px] bg-[#2b0a4e] relative overflow-hidden">
      <img
        src="/images/page-hero-section.png" // Replace with actual path
        alt="Contact Banner"
        className="w-full"
      />
      <div className="absolute inset-0 flex items-center justify-start px-20">
        <h1 className="text-white text-3xl md:text-4xl font-bold">{name}</h1>
      </div>
    </div>
  );
}
