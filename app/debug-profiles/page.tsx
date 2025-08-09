import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function DebugProfilesPage() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        firstName: true,
        lastName: true,
        profileSlug: true,
        profileCompleted: true,
        profilePublic: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return (
      <div className="min-h-screen p-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Debug - Profils utilisateurs</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-slate-600 mb-4">
              Nombre total d'utilisateurs : <strong>{users.length}</strong>
            </p>
            
            {users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500">Aucun utilisateur trouvé dans la base de données.</p>
                <p className="text-sm text-slate-400 mt-2">
                  Connectez-vous d'abord, puis créez un profil via le formulaire.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {user.name || 'Nom non défini'}
                        </h3>
                        <p className="text-sm text-slate-600">{user.email}</p>
                        <p className="text-xs text-slate-400">ID: {user.id}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Slug:</span>
                          {user.profileSlug ? (
                            <a 
                              href={`/${user.profileSlug}`}
                              target="_blank"
                              className="text-blue-600 hover:underline font-mono text-sm"
                            >
                              /{user.profileSlug}
                            </a>
                          ) : (
                            <span className="text-slate-400 text-sm">Non défini</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <span className={`px-2 py-1 rounded ${
                            user.profileCompleted 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.profileCompleted ? 'Complet' : 'Incomplet'}
                          </span>
                          
                          <span className={`px-2 py-1 rounded ${
                            user.profilePublic 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.profilePublic ? 'Public' : 'Privé'}
                          </span>
                        </div>
                        
                        <p className="text-xs text-slate-400">
                          Créé: {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <a 
              href="/create-profil" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Créer/Modifier mon profil
            </a>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching users:', error)
    
    return (
      <div className="min-h-screen p-8 bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-6 max-w-md">
          <h1 className="text-xl font-bold text-red-600 mb-4">Erreur de base de données</h1>
          <p className="text-slate-600 mb-4">
            Impossible de récupérer les utilisateurs.
          </p>
          <pre className="bg-slate-100 p-2 rounded text-xs text-slate-700 overflow-auto">
            {error instanceof Error ? error.message : 'Erreur inconnue'}
          </pre>
        </div>
      </div>
    )
  }
}