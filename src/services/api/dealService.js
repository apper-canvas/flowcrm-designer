import mockDeals from '../mockData/deals.json'

class DealService {
  constructor() {
    this.deals = [...mockDeals]
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.deals]
  }

  async getById(id) {
    await this.delay()
    const deal = this.deals.find(d => d.id === id)
    return deal ? { ...deal } : null
  }

  async create(dealData) {
    await this.delay()
    const newDeal = {
      id: Date.now().toString(),
      ...dealData,
      createdAt: new Date().toISOString()
    }
    this.deals.push(newDeal)
    return { ...newDeal }
  }

  async update(id, data) {
    await this.delay()
    const index = this.deals.findIndex(d => d.id === id)
    if (index !== -1) {
      this.deals[index] = { ...this.deals[index], ...data }
      return { ...this.deals[index] }
    }
    throw new Error('Deal not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.deals.findIndex(d => d.id === id)
    if (index !== -1) {
      const deleted = this.deals.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Deal not found')
  }
}

export default new DealService()