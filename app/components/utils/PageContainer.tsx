export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background my-8 mt-16 justify-center px-8 sm:mt-32 sm:px-20">
      <main className="row-start-2 mx-auto mb-24 flex w-full max-w-6xl flex-col gap-12 sm:gap-32">
        {children}
      </main>
    </div>
  );
}
