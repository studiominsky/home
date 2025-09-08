function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-8 md:px-10 lg:px-10 mx-auto w-full container-width">
      {children}
    </div>
  );
}

export default Container;
