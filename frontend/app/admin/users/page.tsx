import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                <p className="text-muted-foreground">
                    Manage your application users, roles, and permissions.
                </p>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                <UserManagement />
            </div>
        </div>
    )
}
