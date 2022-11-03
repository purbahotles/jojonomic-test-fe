import ProfileModel from '@/models/partials/ProfileModel'

export default class DetailAreaModel {
  id!: number
  area!: {
    id: number
    name: string
  }
  activeCompetitions!: [
    {
      id: number
      name: string
      code: string
      plan: string
      lastUpdated: string
      area: {
        id: number
        name: string
      }
    }
  ]
  clubColors!: string
  crestUrl!: string
  email!: string
  founded!: string
  lastUpdated!: string
  name!: string
  phone!: string
  website!: string
  venue!: string
  squad!: ProfileModel[]
}