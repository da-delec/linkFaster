import { notFound } from 'next/navigation'
import { getUserBySlug } from '@/lib/actions/user-actions'
import PublicProfile from '@/components/public-profile'

interface ProfilePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { slug } = await params
  const user = await getUserBySlug(slug)
  
  if (!user) {
    return {
      title: 'Profile not found',
      description: 'The profile you are looking for does not exist.'
    }
  }

  return {
    title: `${user.name} - ${user.profession || 'Freelance Profile'}`,
    description: `Découvrez le profil de ${user.name}${user.profession ? `, ${user.profession}` : ''}. Portfolio, compétences et projets.`,
    openGraph: {
      title: `${user.name} - LinkFaster`,
      description: `Portfolio de ${user.name}${user.profession ? ` - ${user.profession}` : ''}`,
      images: user.photoUrl ? [{ url: user.photoUrl }] : [],
      url: `https://linkfaster.com/${user.profileSlug}`,
      type: 'profile'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user.name} - LinkFaster`,
      description: `Portfolio de ${user.name}`,
      images: user.photoUrl ? [user.photoUrl] : []
    }
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params
  const user = await getUserBySlug(slug)

  if (!user) {
    notFound()
  }

  return <PublicProfile user={user} />
}