import Card from './Card'
import Mcq from './Mcq'

function Comprehension() {
  return (
    <div>
      <textarea name="passage" id="passage" className="w-full border-2" placeholder='Type passage here'></textarea>
      <Card>
        <Mcq/>
      </Card>
    </div>
  )
}

export default Comprehension