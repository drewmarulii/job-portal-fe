export interface UserUpdateReqDto {
  userEmail: string
  role: string
  personType: string
  fullName: string
  address: string
  phoneNumber: string | null
  photoName: string
  extensionName: string
}
