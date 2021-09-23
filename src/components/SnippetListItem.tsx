import {Link} from 'react-router-dom'
import { SnippetListItemProps } from '../utils/Interfaces'
export default function SnippetListItem({title, id}:SnippetListItemProps):JSX.Element{
    
 return <><li>
            
            <Link to={`/${id}`}>{title}</Link>
            
            
        </li> 
        </>
}