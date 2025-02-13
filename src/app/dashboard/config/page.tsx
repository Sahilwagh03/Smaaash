'use client'
import { redirect } from 'next/navigation';

export default async function ConfigPage() {
    redirect('/dashboard/config/spin-the-wheel');
}