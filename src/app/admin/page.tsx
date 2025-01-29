import { AdminProtection } from "@/components/AdminProtecton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <AdminProtection>
      {" "}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Prayer Times</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage and update prayer times for the mosque.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Donation Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create and manage donation campaigns for various causes.</p>
          </CardContent>
        </Card>
      </div>
    </AdminProtection>
  );
}
