import mockContacts from '../mockData/contacts.json'

class ContactService {
  constructor() {
    this.contacts = [...mockContacts]
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.contacts]
  }

  async getById(id) {
    await this.delay()
    const contact = this.contacts.find(c => c.id === id)
    return contact ? { ...contact } : null
  }

  async create(contactData) {
    await this.delay()
    const newContact = {
      id: Date.now().toString(),
      ...contactData,
      createdAt: new Date().toISOString()
    }
    this.contacts.push(newContact)
    return { ...newContact }
  }

  async update(id, data) {
    await this.delay()
    const index = this.contacts.findIndex(c => c.id === id)
    if (index !== -1) {
      this.contacts[index] = { ...this.contacts[index], ...data }
      return { ...this.contacts[index] }
    }
    throw new Error('Contact not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.contacts.findIndex(c => c.id === id)
    if (index !== -1) {
      const deleted = this.contacts.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Contact not found')
  }
}

export default new ContactService()