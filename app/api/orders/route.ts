import { database, Config, ADMIN_TEAM_ID } from '@/lib/appwriteConfig';
import { Permission, ID } from 'appwrite';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, orderData } = body;

    const permissions = [
      Permission.read(`team:${ADMIN_TEAM_ID}/admin`),
      Permission.update(`team:${ADMIN_TEAM_ID}/admin`),
      Permission.delete(`team:${ADMIN_TEAM_ID}/admin`),
      Permission.read(`user:${userId}`),
    ];

    const document = await database.createDocument(
      Config.databaseId,
      Config.ordersCollectionId,
      ID.unique(),
      orderData,
      permissions
    );

    return NextResponse.json(document, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
