import {Link} from 'react-router-dom'
import Snippet from './Snippet'
export default function SnippetListItem({title, id}:any):JSX.Element{
    
 return <><li>
            
            <Link to={`/${id}`}>{title}</Link>
            
            
        </li> 
        </>
}