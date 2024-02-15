import { fetchAPIActorKnownFor, fetchAPIActors, fetchAPIPerson } from '@/utils/fetchFromAPI';
import React from 'react';
import ActorDetails from '@/components/actorDetails/actorDetails';

export async function getServerSideProps(context)
{
    const id = context.params.actorId;
    const actorDetails = await fetchAPIActors(id);
    const person = await fetchAPIPerson(id);
    const actorKnownFor = await fetchAPIActorKnownFor(id);

    return {
        props: 
        {
            actorDetails,
            person,
            actorKnownFor
        }
    }
}
const Actor = ({ actorDetails, person, actorKnownFor }) =>
{
  return (
    <ActorDetails 
      actorDetails = {actorDetails}
      person = {person}
      actorKnownFor = {actorKnownFor}
    />
  )
}

export default Actor;
