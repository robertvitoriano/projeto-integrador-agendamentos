/**
 *
 *
 * @example
 * ```typescript
 *  type Post {
 *    id: strig
 *    name: string
 *    email: string
 * }
 *
 * Optional<Post, 'id' |'email'>
 * ```
 *
 *
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
