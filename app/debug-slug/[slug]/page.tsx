import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface DebugSlugPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DebugSlugPage({ params }: DebugSlugPageProps) {
  const { slug } = await params

  try {
    // Try to find user with slug regardless of public/completed status
    const userAny = await prisma.user.findUnique({
      where: {
        profileSlug: slug
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileSlug: true,
        profileCompleted: true,
        profilePublic: true,
        firstName: true,
        lastName: true,
        profession: true
      }
    })

    // Try to find with all conditions (like the real function)
    const userPublic = await prisma.user.findUnique({
      where: {
        profileSlug: slug,
        profilePublic: true,
        profileCompleted: true
      }
    })

    // Get all users to see available slugs
    const allUsers = await prisma.user.findMany({
      select: {
        profileSlug: true,
        name: true,
        profileCompleted: true,
        profilePublic: true
      }
    })

    return (
      <div className="min-h-screen p-8 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">Debug: Recherche du slug "{slug}"</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Résultat sans conditions */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 text-blue-600">
                  Recherche par slug uniquement
                </h2>
                {userAny ? (
                  <div className="space-y-2">
                    <p><strong>✅ Utilisateur trouvé :</strong></p>
                    <p>Nom: {userAny.name}</p>
                    <p>Email: {userAny.email}</p>
                    <p>Slug: {userAny.profileSlug}</p>
                    <div className="mt-3 space-y-1">
                      <p className={`text-sm ${userAny.profileCompleted ? 'text-green-600' : 'text-red-600'}`}>
                        Profil complet: {userAny.profileCompleted ? '✅ Oui' : '❌ Non'}
                      </p>
                      <p className={`text-sm ${userAny.profilePublic ? 'text-green-600' : 'text-red-600'}`}>
                        Profil public: {userAny.profilePublic ? '✅ Oui' : '❌ Non'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-600">❌ Aucun utilisateur avec ce slug</p>
                )}
              </div>

              {/* Résultat avec toutes les conditions */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 text-green-600">
                  Recherche complète (comme l'app)
                </h2>
                {userPublic ? (
                  <div className="space-y-2">
                    <p><strong>✅ Profil public accessible !</strong></p>
                    <a 
                      href={`/${slug}`}
                      className="inline-block mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Voir le profil public →
                    </a>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-red-600"><strong>❌ Profil non accessible</strong></p>
                    {userAny ? (
                      <div className="text-sm text-slate-600">
                        <p>Raisons possibles :</p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          {!userAny.profileCompleted && <li>Profil pas encore complété</li>}
                          {!userAny.profilePublic && <li>Profil en mode privé</li>}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">Le slug n'existe pas du tout</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Liste de tous les slugs disponibles */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Tous les slugs dans la base :</h2>
            {allUsers.length === 0 ? (
              <p className="text-slate-500">Aucun utilisateur avec slug défini.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allUsers.map((user, index) => (
                  <div key={index} className="border rounded p-3">
                    {user.profileSlug ? (
                      <div className="space-y-1">
                        <a 
                          href={`/debug-slug/${user.profileSlug}`}
                          className="text-blue-600 hover:underline font-mono"
                        >
                          /{user.profileSlug}
                        </a>
                        <p className="text-sm text-slate-600">{user.name}</p>
                        <div className="flex space-x-2 text-xs">
                          <span className={`px-2 py-1 rounded ${
                            user.profileCompleted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.profileCompleted ? 'Complet' : 'Incomplet'}
                          </span>
                          <span className={`px-2 py-1 rounded ${
                            user.profilePublic ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.profilePublic ? 'Public' : 'Privé'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-400">
                        <p>{user.name}</p>
                        <p className="text-xs">Pas de slug</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-center">
            <a 
              href="/create-profil" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
            >
              Créer/Modifier mon profil
            </a>
            <a 
              href="/debug-profiles" 
              className="inline-block bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700"
            >
              Debug complet
            </a>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Debug error:', error)
    
    return (
      <div className="min-h-screen p-8 bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-6 max-w-md">
          <h1 className="text-xl font-bold text-red-600 mb-4">Erreur de debug</h1>
          <pre className="bg-slate-100 p-2 rounded text-xs text-slate-700 overflow-auto">
            {error instanceof Error ? error.message : 'Erreur inconnue'}
          </pre>
        </div>
      </div>
    )
  }
}