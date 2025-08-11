import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Mail, 
  Calendar,
  Crown,
  CreditCard,
  Shield,
  Key,
  Trash2,
  ExternalLink,
  Github,
  Chrome,
  Settings,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react'
import prisma from '@/lib/prisma'
import { ProfilNotifications } from '@/components/profil-notifications'
import { SubscriptionDetails } from '@/components/subscription-details'
import { Suspense } from 'react'

export default async function ProfilPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if (!session?.user) {
    redirect('/auth/signin')
  }
  
  const user = session.user

  // Récupérer les données complètes de l'utilisateur
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      accounts: true,
      _count: {
        select: {
          repositories: true,
          reviews: true
        }
      }
    }
  })

  if (!fullUser) {
    redirect('/auth/signin')
  }

  // Récupérer les providers OAuth connectés
  const connectedProviders = fullUser.accounts.map(account => ({
    provider: account.providerId,
    accountId: account.accountId,
    connectedAt: account.createdAt
  }))

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  const getProviderInfo = (providerId: string) => {
    switch (providerId) {
      case 'github':
        return { name: 'GitHub', icon: Github, color: 'bg-gray-800' }
      case 'google':
        return { name: 'Google', icon: Chrome, color: 'bg-red-500' }
      default:
        return { name: providerId, icon: Key, color: 'bg-gray-500' }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Suspense fallback={null}>
        <ProfilNotifications />
      </Suspense>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Gestion du profil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gérez vos informations personnelles, votre abonnement et vos paramètres de sécurité
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <CardTitle>Informations personnelles</CardTitle>
              </div>
              <CardDescription>
                Vos données de base et informations de contact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={fullUser.photoUrl || undefined} alt={fullUser.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-lg">
                    {fullUser.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{fullUser.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{fullUser.profession || 'Pas de profession définie'}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-gray-100">{fullUser.email}</span>
                    {fullUser.emailVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Âge</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-gray-100">{fullUser.age ? `${fullUser.age} ans` : 'Non défini'}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                <p className="text-gray-900 dark:text-gray-100 mt-1 text-sm">
                  {fullUser.bio || 'Aucune bio définie'}
                </p>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" asChild>
                  <a href="/create-profil">
                    <Settings className="w-4 h-4 mr-2" />
                    Modifier le profil
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comptes connectés (OAuth) */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <LinkIcon className="w-5 h-5" />
                <CardTitle>Comptes connectés</CardTitle>
              </div>
              <CardDescription>
                Services externes liés à votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              {connectedProviders.length > 0 ? (
                <div className="space-y-4">
                  {connectedProviders.map((provider, index) => {
                    const providerInfo = getProviderInfo(provider.provider)
                    const ProviderIcon = providerInfo.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${providerInfo.color} rounded-lg flex items-center justify-center`}>
                            <ProviderIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {providerInfo.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Connecté le {formatDate(provider.connectedAt)}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connecté
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Aucun compte externe connecté
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistiques du profil */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques du profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {fullUser._count.repositories}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projets</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {fullUser._count.reviews}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avis reçus</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {fullUser.skills.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Compétences</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          
          {/* Statut Premium */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5" />
                <CardTitle>Abonnement</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <SubscriptionDetails 
                stripeCustomerId={fullUser.stripeCustomerId}
                isPremium={fullUser.isPremium}
              />
            </CardContent>
          </Card>

          {/* Profil public */}
          <Card>
            <CardHeader>
              <CardTitle>Profil public</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Profil visible</span>
                <Badge variant={fullUser.profilePublic ? "default" : "secondary"}>
                  {fullUser.profilePublic ? 'Public' : 'Privé'}
                </Badge>
              </div>
              
              {fullUser.profileSlug && fullUser.profilePublic && (
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Lien public
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="flex-1 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      linkfaster.com/{fullUser.profileSlug}
                    </code>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`/${fullUser.profileSlug}`} target="_blank">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              <Button variant="outline" className="w-full" asChild>
                <a href="/dashboard">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurer
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-gray-600 dark:text-gray-400">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">
                  Compte créé le {formatDate(fullUser.createdAt)}
                </p>
              </div>
              
              <Button variant="outline" className="w-full" disabled>
                <Key className="w-4 h-4 mr-2" />
                Changer le mot de passe
                <Badge variant="secondary" className="ml-2 text-xs">
                  Bientôt
                </Badge>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}