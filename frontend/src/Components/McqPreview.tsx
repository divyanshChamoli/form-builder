
interface McqPreviewProps {
    options: string[],
    question: string
}

function McqPreview({options, question}: McqPreviewProps) {
  return (
    <div className="w-4/5 border-2 rounded-md flex flex-col gap-2 p-5">
        <p>{question}</p>
        {options.map((option)=>{
            return(
                <div>
                    <input type="radio" name="option" id="option" />
                    <label htmlFor="option">{option}</label>
                </div>
            )
        })}
    </div>
  )
}

export default McqPreview