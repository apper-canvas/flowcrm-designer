import mockActivities from '../mockData/activities.json'

class ActivityService {
  constructor() {
    this.activities = [...mockActivities]
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.activities]
  }

  async getById(id) {
    await this.delay()
    const activity = this.activities.find(a => a.id === id)
    return activity ? { ...activity } : null
  }

  async create(activityData) {
    await this.delay()
    const newActivity = {
      id: Date.now().toString(),
      ...activityData,
      timestamp: new Date().toISOString()
    }
    this.activities.push(newActivity)
    return { ...newActivity }
  }

  async update(id, data) {
    await this.delay()
    const index = this.activities.findIndex(a => a.id === id)
    if (index !== -1) {
      this.activities[index] = { ...this.activities[index], ...data }
      return { ...this.activities[index] }
    }
    throw new Error('Activity not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.activities.findIndex(a => a.id === id)
    if (index !== -1) {
      const deleted = this.activities.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Activity not found')
  }
}

export default new ActivityService()