// utils/isAdminUser.ts (or wherever you want to place this)
import { account, teams, ADMIN_TEAM_ID } from '@/lib/appwriteConfig';

export async function isAdminUser(): Promise<boolean> {
  try {
    const user = await account.get();
    const teamMemberships = await teams.listMemberships(ADMIN_TEAM_ID);

    return teamMemberships.memberships.some(
      (membership) => membership.userId === user.$id && membership.roles.includes('admin')
    );
  } catch (err) {
    console.error('Failed to check admin:', err);
    return false;
  }
}
