import { getListById } from '@/lib/data'

type Props = {
    params: { listId: string }
}

export async function generateMetadata({ params }: Props){
    const list = getListById(params.listId);
    
    if(!list)  {
        return{
            title: 'MegaTask | ToDo-List'
        };   
    }

    const titleFormated = list.name.charAt(0).toUpperCase() + list.name.slice(1).toLowerCase()

    return {
        title: `${titleFormated} | MegaTask`
    };
}

export default function ListPage(){
    return(
        <h2>Lista page</h2>
    );
}