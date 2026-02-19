export interface Iproject {
  id: number,
  project_title: string,
  project_dis: string,
  project_rate: number,
  project_type: string,
  project_poster: string ,
  tools : Itools [] ,
  strategics : Istrategics[] ,
  roles : Iroles [] ,
  challenges : Ichallenges [] ,
  results :Iproject_reselt[] ,
  project_media: Iproject_media[],
  date_start : Date ,
  date_end : Date ,
  recommendations  : Irecommendtion[] ,
  client_name : string
}
export interface Itools {
  tool : string
}
export interface Istrategics {
  strategic : string
}
export interface Iroles {
  role : string
}
export interface Ichallenges {
  challenge : string
}
export interface Irecommendtion {
  recommendation  : string
}
export interface Iproject_media {
  isVideo: boolean,
  url: string,
  dis: string,
}
export interface Iproject_reselt {
   view : number,
    interaction : number ,
    Click : number ,
    visit_page : number ,
    New_follower : number ,
}
