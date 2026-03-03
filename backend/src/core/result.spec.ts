import { failure, success } from './result'

test('success result', () => {
  const sut = success('success')

  expect(sut.value).toBe('success')
})
test('error result', () => {
  const sut = failure('error')

  expect(sut.value).toBe('error')
})
