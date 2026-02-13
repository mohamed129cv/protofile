export interface Iproject {
  id: number,
  project_title: string,
  project_dis: string,
  project_rate: number,
  project_type: string,
  project_details: string,
  project_image: string
  project_media: Iproject_media[],
}
// export interface Iproject2 {
//   id: number,
//   project_title: string,
//   project_dis: string,
//   project_rate: number,
//   project_type: string,
//   project_details: string,
//   project_image: string,
//   project_media: Iproject_media[],

// }
export interface Iproject_media {
  isVideo: boolean,
  url: string,
  dis: string,
}
