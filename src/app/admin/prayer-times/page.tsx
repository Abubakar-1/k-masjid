import { AdminProtection } from "@/components/AdminProtecton";
import { PrayerTimeForm } from "./prayer-time-form";
import { PrayerTimeList } from "./prayer-time-list";

export default function PrayerTimesPage() {
  return (
    <AdminProtection>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Manage Prayer Times</h2>
        <PrayerTimeForm />
        <h3 className="text-xl font-semibold mt-8 mb-4">
          Current Prayer Times
        </h3>
        <PrayerTimeList />
      </div>
    </AdminProtection>
  );
}
