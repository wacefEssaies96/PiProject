import SportTypeForm from "@/components/sport_types/SportTypeForm";

export default function Create() {

  return (
    <div className='container'>
      <SportTypeForm sportType={{_id:"",title: '', advantages:[], sportSubType: []}}/>
    </div>
  )
}