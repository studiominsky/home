function FullWidth({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 mx-auto w-full">
      {children}
    </div>
  );
}

export default FullWidth;
