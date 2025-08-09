'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Plus, Briefcase, Globe, Code } from 'lucide-react'

interface ProfessionalDetailsStepProps {
  data: {
    profession: string
    skills: string[]
    portfolioWebsite: string
  }
  onUpdate: (data: any) => void
}

const commonSkills = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js',
  'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot', 'PHP', 'Laravel',
  'C#', '.NET', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native',
  'HTML/CSS', 'Sass/SCSS', 'Tailwind CSS', 'Bootstrap', 'SQL', 'MongoDB',
  'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure',
  'GCP', 'Git', 'GitHub Actions', 'CI/CD', 'Testing', 'Jest', 'Cypress',
  'Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Responsive Design',
  'API Development', 'GraphQL', 'REST APIs', 'Microservices', 'DevOps',
  'Machine Learning', 'Data Analysis', 'Blockchain', 'Web3', 'Solidity'
]

const professions = [
  'Développeur Frontend',
  'Développeur Backend', 
  'Développeur Full-Stack',
  'Développeur Mobile',
  'DevOps Engineer',
  'Data Scientist',
  'UI/UX Designer',
  'Product Manager',
  'QA Engineer',
  'Développeur Blockchain',
  'Consultant IT',
  'Architecte Logiciel',
  'Chef de Projet Tech',
  'Autre'
]

const ProfessionalDetailsStep: React.FC<ProfessionalDetailsStepProps> = ({ data, onUpdate }) => {
  const [customSkill, setCustomSkill] = useState('')
  const [showCustomProfession, setShowCustomProfession] = useState(false)

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      onUpdate({ skills: [...data.skills, skill] })
    }
  }

  const removeSkill = (skill: string) => {
    onUpdate({ skills: data.skills.filter(s => s !== skill) })
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !data.skills.includes(customSkill.trim())) {
      onUpdate({ skills: [...data.skills, customSkill.trim()] })
      setCustomSkill('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomSkill()
    }
  }

  return (
    <div className="space-y-8">
      {/* Profession Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Profession *</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profession">Quel est votre métier principal ?</Label>
            <Select 
              value={data.profession} 
              onValueChange={(value) => {
                if (value === 'Autre') {
                  setShowCustomProfession(true)
                  onUpdate({ profession: '' })
                } else {
                  setShowCustomProfession(false)
                  onUpdate({ profession: value })
                }
              }}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Sélectionnez votre profession" />
              </SelectTrigger>
              <SelectContent>
                {professions.map((prof) => (
                  <SelectItem key={prof} value={prof}>
                    {prof}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showCustomProfession && (
            <div className="space-y-2">
              <Label htmlFor="customProfession">Précisez votre profession</Label>
              <Input
                id="customProfession"
                value={data.profession}
                onChange={(e) => onUpdate({ profession: e.target.value })}
                placeholder="Ex: Développeur Blockchain spécialisé DeFi"
                className="h-10"
              />
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Compétences techniques</h3>
        </div>

        {/* Selected Skills */}
        {data.skills.length > 0 && (
          <div className="space-y-2">
            <Label>Compétences sélectionnées ({data.skills.length})</Label>
            <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border">
              {data.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="flex items-center space-x-1 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <span>{skill}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Add Custom Skill */}
        <div className="space-y-2">
          <Label htmlFor="customSkill">Ajouter une compétence personnalisée</Label>
          <div className="flex space-x-2">
            <Input
              id="customSkill"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Ex: TensorFlow, Figma, etc."
              className="h-10"
              onKeyPress={handleKeyPress}
            />
            <Button
              onClick={addCustomSkill}
              disabled={!customSkill.trim()}
              className="px-4"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Common Skills Grid */}
        <div className="space-y-2">
          <Label>Ou sélectionnez parmi les compétences populaires</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border">
            {commonSkills.map((skill) => (
              <Button
                key={skill}
                variant={data.skills.includes(skill) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (data.skills.includes(skill)) {
                    removeSkill(skill)
                  } else {
                    addSkill(skill)
                  }
                }}
                className="justify-start text-xs h-8"
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Website Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Portfolio & Site Web</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="portfolio">Lien vers votre portfolio ou site web</Label>
          <Input
            id="portfolio"
            type="url"
            value={data.portfolioWebsite}
            onChange={(e) => onUpdate({ portfolioWebsite: e.target.value })}
            placeholder="https://votre-portfolio.com"
            className="h-10"
          />
          <p className="text-xs text-slate-500">
            Partagez le lien de votre portfolio, site personnel, ou profil LinkedIn
          </p>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex space-x-3">
          <div className="text-amber-600 dark:text-amber-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-900 dark:text-amber-200">
              Conseils pour optimiser votre profil
            </h4>
            <ul className="text-xs text-amber-700 dark:text-amber-300 mt-1 space-y-1">
              <li>• Sélectionnez 5-10 compétences principales plutôt que toutes vos connaissances</li>
              <li>• Ajoutez un portfolio pour augmenter vos chances de 80%</li>
              <li>• Soyez précis dans votre profession (ex: "Développeur React" plutôt que "Développeur")</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalDetailsStep