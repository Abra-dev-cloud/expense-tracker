import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET all expenses
export async function GET() {
  try {
    const expenses = await sql`
      SELECT * FROM expenses 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    );
  }
}

// POST new expense
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, amount, category } = body;

    // Validation
    if (!title || !amount || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newExpense = await sql`
      INSERT INTO expenses (title, amount, category)
      VALUES (${title}, ${amount}, ${category})
      RETURNING *
    `;

    return NextResponse.json(newExpense[0], { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    );
  }
}