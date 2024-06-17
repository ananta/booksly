import { mockNextFunction, mockRequest, mockResponse } from '../../__mocks__'
import { books } from '../../constants/books'
jest.mock('node:crypto', () => ({
  randomUUID: jest.fn(() => 'random-uuid')
}))
describe('Books Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
})
