'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, X, ExternalLink, Eye } from 'lucide-react'

interface ProjectData {
  id?: string
  title: string
  description: string
  url: string
  previewUrl: string
  technologies: string[]
}

interface ProductionProjectsStepProps {
  data: {
    projects?: ProjectData[]
  }
  onUpdate: (data: any) => void
}

const ProductionProjectsStep: React.FC<ProductionProjectsStepProps> = ({ data, onUpdate }) => {
  const [projects, setProjects] = useState<ProjectData[]>(data.projects || [])
  const [currentTech, setCurrentTech] = useState('')

  const addProject = () => {
    const newProject: ProjectData = {
      title: '',
      description: '',
      url: '',
      previewUrl: '',
      technologies: []
    }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    onUpdate({ projects: updatedProjects })
  }

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    setProjects(updatedProjects)
    onUpdate({ projects: updatedProjects })
  }

  const updateProject = (index: number, field: keyof ProjectData, value: string | string[]) => {
    const updatedProjects = projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    )
    setProjects(updatedProjects)
    onUpdate({ projects: updatedProjects })
  }

  const addTechnology = (projectIndex: number, tech: string) => {
    if (!tech.trim()) return
    
    const updatedProjects = projects.map((project, i) => {
      if (i === projectIndex) {
        const technologies = [...project.technologies, tech.trim()]
        return { ...project, technologies }
      }
      return project
    })
    setProjects(updatedProjects)
    onUpdate({ projects: updatedProjects })
  }

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updatedProjects = projects.map((project, i) => {
      if (i === projectIndex) {
        const technologies = project.technologies.filter((_, j) => j !== techIndex)
        return { ...project, technologies }
      }
      return project
    })
    setProjects(updatedProjects)
    onUpdate({ projects: updatedProjects })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Projets en Production
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Ajoutez vos projets déjà déployés pour montrer votre travail concret
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((project, projectIndex) => (
          <Card key={projectIndex} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  Projet {projectIndex + 1}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(projectIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`title-${projectIndex}`}>Titre du projet</Label>
                  <Input
                    id={`title-${projectIndex}`}
                    value={project.title}
                    onChange={(e) => updateProject(projectIndex, 'title', e.target.value)}
                    placeholder="Ex: E-commerce Platform"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`url-${projectIndex}`}>URL du projet</Label>
                  <div className="relative">
                    <Input
                      id={`url-${projectIndex}`}
                      value={project.url}
                      onChange={(e) => updateProject(projectIndex, 'url', e.target.value)}
                      placeholder="https://monprojet.com"
                      className="pr-10"
                    />
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${projectIndex}`}>Description</Label>
                <Textarea
                  id={`description-${projectIndex}`}
                  value={project.description}
                  onChange={(e) => updateProject(projectIndex, 'description', e.target.value)}
                  placeholder="Décrivez votre projet, ses fonctionnalités principales..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor={`preview-${projectIndex}`}>URL de prévisualisation (optionnel)</Label>
                <div className="relative">
                  <Input
                    id={`preview-${projectIndex}`}
                    value={project.previewUrl}
                    onChange={(e) => updateProject(projectIndex, 'previewUrl', e.target.value)}
                    placeholder="https://image-preview.com/screenshot.png"
                    className="pr-10"
                  />
                  {project.previewUrl && (
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Ajoutez un lien vers une capture d'écran ou image de votre projet
                </p>
              </div>

              <div>
                <Label>Technologies utilisées</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(projectIndex, techIndex)}
                        className="ml-1 text-slate-500 hover:text-slate-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    placeholder="Ex: React, Node.js, PostgreSQL..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTechnology(projectIndex, currentTech)
                        setCurrentTech('')
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      addTechnology(projectIndex, currentTech)
                      setCurrentTech('')
                    }}
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="w-full py-8 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un projet en production
        </Button>
      </div>

      {projects.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Conseil:</strong> Ajoutez vos meilleurs projets en production pour montrer 
            votre expertise concrète aux clients potentiels. N'hésitez pas à inclure des captures d'écran !
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductionProjectsStep