export default interface Translation {
  id: number
  session: number
  user: number
  translated_text: string
  source_text: string
  analysis: any
  source_language: number
  target_language: number
  audio_file_path: string

}
