'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Palette, Layout, Crown, Eye, Sparkles, Monitor } from 'lucide-react'

interface DesignCustomizationStepProps {
  data: {
    colorTheme: string
    layoutStyle: string
  }
  onUpdate: (data: any) => void
}

const colorThemes = [
  {
    id: 'default',
    name: 'Défaut',
    description: 'Thème classique en bleu',
    colors: ['#3B82F6', '#1E40AF', '#DBEAFE'],
    isPremium: false
  },
  {
    id: 'emerald',
    name: 'Émeraude',
    description: 'Thème moderne en vert',
    colors: ['#10B981', '#047857', '#D1FAE5'],
    isPremium: false
  },
  {
    id: 'purple',
    name: 'Violet',
    description: 'Thème créatif en violet',
    colors: ['#8B5CF6', '#5B21B6', '#EDE9FE'],
    isPremium: true
  },
  {
    id: 'amber',
    name: 'Ambre',
    description: 'Thème chaleureux en orange',
    colors: ['#F59E0B', '#B45309', '#FEF3C7'],
    isPremium: true
  },
  {
    id: 'rose',
    name: 'Rose',
    description: 'Thème élégant en rose',
    colors: ['#EC4899', '#BE185D', '#FCE7F3'],
    isPremium: true
  },
  {
    id: 'gradient',
    name: 'Dégradé',
    description: 'Thème moderne avec dégradés',
    colors: ['linear-gradient-to-r', '#6366F1', '#EC4899'],
    isPremium: true
  }
]

const layoutStyles = [
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Design épuré et moderne',
    preview: '/api/placeholder/200/120',
    isPremium: false
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Mise en page artistique',
    preview: '/api/placeholder/200/120',
    isPremium: true
  },
  {
    id: 'professional',
    name: 'Professionnel',
    description: 'Style corporate et sobre',
    preview: '/api/placeholder/200/120',
    isPremium: false
  },
  {
    id: 'minimal',
    name: 'Minimaliste',
    description: 'Design ultra-épuré',
    preview: '/api/placeholder/200/120',
    isPremium: true
  }
]

const DesignCustomizationStep: React.FC<DesignCustomizationStepProps> = ({ data, onUpdate }) => {
  const selectedTheme = colorThemes.find(theme => theme.id === data.colorTheme) || colorThemes[0]
  const selectedLayout = layoutStyles.find(layout => layout.id === data.layoutStyle) || layoutStyles[0]

  const ColorPreview = ({ colors, isGradient = false }: { colors: string[], isGradient?: boolean }) => {
    if (isGradient) {
      return (
        <div className="w-12 h-8 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500" />
      )
    }
    
    return (
      <div className="flex space-x-1">
        {colors.slice(0, 3).map((color, index) => (
          <div
            key={index}
            className="w-4 h-8 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Color Theme Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Palette className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Thème de couleurs</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorThemes.map((theme) => (
            <Card
              key={theme.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                data.colorTheme === theme.id
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-slate-300'
              }`}
              onClick={() => onUpdate({ colorTheme: theme.id })}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <span>{theme.name}</span>
                      {theme.isPremium && (
                        <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500">
                          <Crown className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {theme.description}
                    </CardDescription>
                  </div>
                  <ColorPreview 
                    colors={theme.colors} 
                    isGradient={theme.id === 'gradient'} 
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  {data.colorTheme === theme.id ? (
                    <Badge className="bg-green-600">Sélectionné</Badge>
                  ) : (
                    <span className="text-xs text-slate-500">
                      {theme.isPremium ? 'Nécessite Pro' : 'Gratuit'}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Layout Style Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Layout className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Style de mise en page</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {layoutStyles.map((layout) => (
            <Card
              key={layout.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                data.layoutStyle === layout.id
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-slate-300'
              }`}
              onClick={() => onUpdate({ layoutStyle: layout.id })}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <span>{layout.name}</span>
                      {layout.isPremium && (
                        <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500">
                          <Crown className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {layout.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded border flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-slate-400" />
                  <span className="text-xs text-slate-500 ml-2">Aperçu {layout.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  {data.layoutStyle === layout.id ? (
                    <Badge className="bg-green-600">Sélectionné</Badge>
                  ) : (
                    <span className="text-xs text-slate-500">
                      {layout.isPremium ? 'Nécessite Pro' : 'Gratuit'}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Aperçu de votre profil</h3>
        </div>

        <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 text-slate-500" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Aperçu de votre profil
                </h4>
                <p className="text-sm text-slate-500 mt-2">
                  Votre profil sera affiché avec le thème <strong>{selectedTheme.name}</strong> et 
                  le style <strong>{selectedLayout.name}</strong>
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Voir l'aperçu complet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade to Pro Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="text-amber-600 dark:text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-medium text-amber-900 dark:text-amber-200 mb-2">
              Débloquez plus de possibilités avec Pro
            </h4>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 mb-4">
              <li>• Accès à tous les thèmes premium</li>
              <li>• Layouts avancés avec animations</li>
              <li>• Domaine personnalisé (votre-nom.devlink.pro)</li>
              <li>• Analytics détaillées de votre profil</li>
              <li>• Support prioritaire</li>
            </ul>
            <div className="flex items-center space-x-3">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                <Crown className="w-4 h-4 mr-1" />
                Passer à Pro - 9.99€/mois
              </Button>
              <span className="text-xs text-amber-600 dark:text-amber-400">
                7 jours d'essai gratuit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
        <h4 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-4">
          Récapitulatif de votre configuration
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600 dark:text-slate-400">Thème de couleurs:</span>
            <div className="flex items-center space-x-2 mt-1">
              <ColorPreview 
                colors={selectedTheme.colors} 
                isGradient={selectedTheme.id === 'gradient'} 
              />
              <span className="font-medium">{selectedTheme.name}</span>
              {selectedTheme.isPremium && (
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              )}
            </div>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Style de layout:</span>
            <div className="flex items-center space-x-2 mt-1">
              <Layout className="w-4 h-4 text-slate-500" />
              <span className="font-medium">{selectedLayout.name}</span>
              {selectedLayout.isPremium && (
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignCustomizationStep