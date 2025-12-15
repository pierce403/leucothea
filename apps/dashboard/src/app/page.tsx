import DashboardClient from "@/app/dashboard-client";
import { listRecentAttackSurfaceEvents, listRepos } from "@/lib/repos/store";

export const runtime = "nodejs";
export const revalidate = 0;

export default async function Page() {
  const [repos, events] = await Promise.all([
    listRepos(),
    listRecentAttackSurfaceEvents({ limit: 50 }),
  ]);
  return (
    <DashboardClient initialRepos={repos} initialEvents={events} />
  );
}
