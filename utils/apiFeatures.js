const DEFAULT_LIMIT = 100
const DEFAULT_PAGE = 1
const DEFAULT_SORT = '-joinDate'
const DEFAULT_LIMIT_FIELDS = '-__v'

class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    const queryObject = { ...this.queryString }
    const excludeFileds = ['page', 'sort', 'limit', 'fields']

    excludeFileds.forEach((field) => delete queryObject[field])
    const normalizedQuery = JSON.stringify(queryObject).replace(
      /(gt|gte|lt|gt)/g,
      (match) => `$${match}`
    )

    this.query = this.query.find(JSON.parse(normalizedQuery))

    return this
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')

      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort(DEFAULT_SORT)
    }
    return this
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ')

      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select(DEFAULT_LIMIT_FIELDS)
    }
    return this
  }

  paginate() {
    const page = +this.queryString.page || DEFAULT_PAGE
    const limit = +this.queryString.limit || DEFAULT_LIMIT
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}

module.exports = APIFeatures
