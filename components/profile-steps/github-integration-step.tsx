'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Github, ExternalLink, Star, GitFork, Upload, X, Plus, Eye, Calendar } from 'lucide-react'

interface GitHubIntegrationStepProps {
  data: {
    githubProfile: string
    githubCalendar: boolean
    selectedRepos: Array<{
      name: string
      url: string
      image: string
      description: string
    }>
  }
  onUpdate: (data: any) => void
}

const GitHubIntegrationStep: React.FC<GitHubIntegrationStepProps> = ({ data, onUpdate }) => {
  const [newRepo, setNewRepo] = useState({
    name: '',
    url: '',
    image: '',
    description: ''
  })
  const [isAddingRepo, setIsAddingRepo] = useState(false)

  const mockGitHubRepos = [
    {
      name: 'awesome-portfolio',
      url: 'https://github.com/username/awesome-portfolio',
      description: 'My personal portfolio developed with React and Tailwind CSS',
      stars: 45,
      forks: 12,
      language: 'TypeScript'
    },
    {
      name: 'e-commerce-app',
      url: 'https://github.com/username/e-commerce-app',
      description: 'Complete e-commerce application with Next.js and Stripe',
      stars: 78,
      forks: 23,
      language: 'JavaScript'
    },
    {
      name: 'task-manager-api',
      url: 'https://github.com/username/task-manager-api',
      description: 'REST API for task management with Node.js and MongoDB',
      stars: 32,
      forks: 8,
      language: 'JavaScript'
    }
  ]

  const addRepo = () => {
    if (newRepo.name && newRepo.url) {
      onUpdate({
        selectedRepos: [...data.selectedRepos, { ...newRepo }]
      })
      setNewRepo({ name: '', url: '', image: '', description: '' })
      setIsAddingRepo(false)
    }
  }

  const removeRepo = (index: number) => {
    const updatedRepos = data.selectedRepos.filter((_, i) => i !== index)
    onUpdate({ selectedRepos: updatedRepos })
  }

  const addFromMockRepo = (repo: any) => {
    const repoData = {
      name: repo.name,
      url: repo.url,
      image: '',
      description: repo.description
    }
    
    const isAlreadySelected = data.selectedRepos.some(r => r.url === repo.url)
    if (!isAlreadySelected) {
      onUpdate({
        selectedRepos: [...data.selectedRepos, repoData]
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* GitHub Profile Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Github className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">GitHub Profile</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="githubProfile">Link to your GitHub profile</Label>
          <Input
            id="githubProfile"
            type="url"
            value={data.githubProfile}
            onChange={(e) => onUpdate({ githubProfile: e.target.value })}
            placeholder="https://github.com/your-username"
            className="h-10"
          />
          <p className="text-xs text-slate-500">
            Your GitHub profile will be displayed on your freelance profile page
          </p>
        </div>
        
        {/* GitHub Calendar Toggle */}
        <div className="flex items-center justify-between space-x-3 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-green-600" />
            <div>
              <Label htmlFor="githubCalendar" className="text-sm font-medium">
                Display GitHub Activity Calendar
              </Label>
              <p className="text-xs text-slate-500 mt-1">
                Show your GitHub contributions calendar on your public profile
              </p>
            </div>
          </div>
          <Switch
            id="githubCalendar"
            checked={data.githubCalendar}
            onCheckedChange={(checked) => onUpdate({ githubCalendar: checked })}
            disabled={!data.githubProfile || data.githubProfile.trim() === ''}
          />
        </div>
      </div>

      {/* Selected Repositories */}
      {data.selectedRepos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Selected Projects ({data.selectedRepos.length})</h3>
            <Badge variant="secondary">{data.selectedRepos.length}/3 recommended</Badge>
          </div>
          
          <div className="grid gap-4">
            {data.selectedRepos.map((repo, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-base flex items-center space-x-2">
                        <Github className="w-4 h-4" />
                        <span>{repo.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </CardTitle>
                      <CardDescription className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {repo.url}
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeRepo(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {repo.description}
                  </p>
                  {repo.image && (
                    <div className="mt-3">
                      <img
                        src={repo.image}
                        alt={`${repo.name} preview`}
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add Repository Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Add Projects</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingRepo(!isAddingRepo)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Custom project
          </Button>
        </div>

        {/* Custom Repository Form */}
        {isAddingRepo && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-base">Add a custom project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project name *</Label>
                  <Input
                    value={newRepo.name}
                    onChange={(e) => setNewRepo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="my-awesome-project"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Repository URL *</Label>
                  <Input
                    type="url"
                    value={newRepo.url}
                    onChange={(e) => setNewRepo(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://github.com/username/repo"
                    className="h-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newRepo.description}
                  onChange={(e) => setNewRepo(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Project description, technologies used..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Demo image URL (optional)</Label>
                <Input
                  type="url"
                  value={newRepo.image}
                  onChange={(e) => setNewRepo(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/screenshot.png"
                  className="h-10"
                />
                <p className="text-xs text-slate-500">
                  Screenshot, logo or representative image of the project
                </p>
              </div>

              <div className="flex space-x-3 pt-2">
                <Button onClick={addRepo} disabled={!newRepo.name || !newRepo.url}>
                  Add project
                </Button>
                <Button variant="outline" onClick={() => setIsAddingRepo(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mock GitHub Repositories (Simulation) */}
        <div>
          <h4 className="text-base font-medium mb-3 text-slate-700 dark:text-slate-300">
            Popular Projects (Simulation)
          </h4>
          <div className="grid gap-3">
            {mockGitHubRepos.map((repo, index) => {
              const isSelected = data.selectedRepos.some(r => r.url === repo.url)
              return (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : ''
                  }`}
                  onClick={() => !isSelected && addFromMockRepo(repo)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Github className="w-4 h-4" />
                          <span className="font-medium">{repo.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {repo.language}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {repo.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{repo.stars}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="w-3 h-3" />
                            <span>{repo.forks}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {isSelected ? (
                          <Badge className="bg-green-600">
                            Added
                          </Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div className="flex space-x-3">
          <div className="text-purple-600 dark:text-purple-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-purple-900 dark:text-purple-200">
              Optimize your GitHub projects
            </h4>
            <ul className="text-xs text-purple-700 dark:text-purple-300 mt-1 space-y-1">
              <li>• Select 2-3 of your best projects</li>
              <li>• Make sure your READMEs are complete with screenshots</li>
              <li>• Favor recent projects that represent your skills</li>
              <li>• Add live demos when possible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubIntegrationStep