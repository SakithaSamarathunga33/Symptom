import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navigation />

            <main className="flex-1 space-y-8 p-8 pt-6">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between space-y-2 mb-8">
                        <h2 className="text-3xl font-bold tracking-tight">Admin Generic Dashboard</h2>
                        <div className="flex items-center space-x-2">
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        {/* Simple stats cards could go here if requested, but sticking to user table for now */}
                    </div>

                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                        <UserManagement />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
