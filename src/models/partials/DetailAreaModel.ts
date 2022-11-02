export default class DetailAreaModel {
  // if type data not consitence we can use type any
  id!: number | any
  area!: {
    id: number
    name: string
  }
  activeCompetitions!: [
    {
      id: number | any
      name: string | any
      code: string | any
      plan: string | any
      lastUpdated: string | any
      area: {
        id: number | any
        name: string | any
      }
    }
  ]
  clubColors!: string | any
  crestUrl!: string | any
  email!: string | any
  founded!: string | any
  lastUpdated!: string | any
  name!: string | any
  phone!: string | any
  website!: string | any
  venue!: string | any
  squad!: [] | any
}