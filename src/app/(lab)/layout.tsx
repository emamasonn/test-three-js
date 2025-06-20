import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen ">
      <div className="fixed top-5 left-5 z-50 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 w-64">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Shape Controls</h3>
        <div className="flex flex-col gap-2 mb-4">
          <Link
            href={"/scroll"}
            className="w-full py-2 px-4 rounded-md font-medium text-black"
          >
            Scroll
          </Link>
        </div>
      </div>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
