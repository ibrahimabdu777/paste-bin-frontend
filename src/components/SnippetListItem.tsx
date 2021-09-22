import {Link} from 'react-router-dom'
import Snippet from './Snippet'
export default function SnippetListItem({title}:any):JSX.Element{
    
 return <><li>
            
            <Link to={`/${title}`}>{title}</Link>
            
            
        </li> 
        </>
}