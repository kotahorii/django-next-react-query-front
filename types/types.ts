export type ReadTask = {
  id: string
  title: string
  username: string
  user_id: string
  created_at: string
}
export type PostTask = {
  id: string
  title: string
}
export type ReadNews = {
  id: string
  content: string
  created_at: string
}
export type PostNews = {
  id: string
  content: string
}
export type AuthUser = {
  username: string
  password: string
}
export type Token = {
  refresh: string
  access: string
}
