import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Header from '../components/header'
import Dashboard from './DashboardClient'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/')
    }

    return (
        <body>
            <Header session={session} />
            <Dashboard />
        </body>
    )
}
