import { fetchAPIActors, fetchAPIPerson } from '@/utils/fetchFromAPI';
import React from 'react';
import ActorDetails from '@/components/actorDetails/actorDetails';

export async function getServerSideProps(context)
{
    const id = context.params.actorId;
    const actorDetails = await fetchAPIActors(id);
    const person = await fetchAPIPerson(id);

    return {
        props: 
        {
            actorDetails,
            person
        }
    }
}
const Actor = ({ actorDetails, person }) =>
{
  return (
    <ActorDetails actorDetails = {actorDetails} person = {person}/>
  )
}

export default Actor;
