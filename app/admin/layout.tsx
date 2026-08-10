import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">

        <Sidebar />

        <div className="flex-1 min-w-0">

          <Navbar />

          <main className="p-8 bg-gray-100 min-h-screen">
            {children}
          </main>

        </div>

      </div>
    </ProtectedRoute>
  );
}