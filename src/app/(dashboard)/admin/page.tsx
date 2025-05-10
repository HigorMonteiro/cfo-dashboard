"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

/**
 * Admin dashboard page component
 * Protected route that requires admin access
 * @returns {JSX.Element} Admin dashboard page component
 */
export default function AdminPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requireAdmin>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Admin Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Welcome to the admin dashboard, {user?.name}. You have full administrative access.
              </p>
            </CardContent>
          </Card>

          {/* Add more admin control cards here */}
        </div>
      </div>
    </ProtectedRoute>
  );
} 