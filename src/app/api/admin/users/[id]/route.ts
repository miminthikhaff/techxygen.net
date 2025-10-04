import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const payload = await req.json()
    const supabase = createClient(supabaseUrl, serviceKey)

    const updates: any = {}
    if (payload.name !== undefined) updates.name = payload.name
    if (payload.role !== undefined) updates.role = payload.role
    if (payload.email !== undefined) updates.email = payload.email
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ ok: true })
    }

    const { data, error } = await supabase
      .from('admin_profiles')
      .update(updates)
      .eq('user_id', params.id)
      .select('*')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ ok: true, data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(supabaseUrl, serviceKey)

    // Remove profile
    const { error: profileErr } = await supabase
      .from('admin_profiles')
      .delete()
      .eq('user_id', params.id)

    if (profileErr) return NextResponse.json({ error: profileErr.message }, { status: 400 })

    // Remove auth user
    const { error: authErr } = await supabase.auth.admin.deleteUser(params.id)
    if (authErr) return NextResponse.json({ error: authErr.message }, { status: 400 })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}


