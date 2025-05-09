import { Major } from "../types/MajorEnum";
import { ChevronRightIcon } from '@radix-ui/react-icons'

interface Props {
    major: Major
    handleClick: () => void
}

function Card(props: Props) {
    return (
        <div 
            className="w-80 lg:w-96 rounded-2xl bg-[#190200] lg:opacity-50 p-3 hover:opacity-100 transition-all duration-300"
        >
            <div className="rounded-2xl">
              <img 
                className="w-full object-cover unselectable" 
                src={
                    props.major == Major.Design ? "/images/design.png" : 
                    props.major == Major.Programming ? "/images/programming.png" :
                    props.major == Major.Content ? "/images/content.png" :
                    props.major == Major.Marketing ? "/images/marketing-1.png" : ""
                } 
              />
            </div>
            <div className='mt-3 font-prompt flex justify-center items-center w-full'>
                <button onClick={props.handleClick} className='cursor-pointer flex items-center p-2 border-[0.1rem] border-white rounded-md'>เลือก <ChevronRightIcon /></button>
            </div>
        </div>
    )
}

export default Card