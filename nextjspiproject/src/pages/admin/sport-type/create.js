import SportTypeForm from "@/components/SportsSharedComponents/SportTypeForm";

export default function Create() {

  return (
    <div className='container'>
      <SportTypeForm sportType={{_id:"",title: '', sportSubType: []}}/>
    </div>
  )
}