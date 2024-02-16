import { fetchAPIActorKnownFor, fetchAPIActors, fetchAPIPerson, fetchAPIPopularPersonExternalids } from '@/utils/fetchFromAPI';
import React from 'react';
import ActorDetails from '@/components/actorDetails/actorDetails';

export async function getServerSideProps(context)
{
    const id = context.params.actorId;
    const actorDetails = await fetchAPIActors(id);
    const person = await fetchAPIPerson(id);
    const actorKnownFor = await fetchAPIActorKnownFor(id);
    const actorExternalIds = await fetchAPIPopularPersonExternalids(id);

    return {
        props: 
        {
            actorDetails,
            person,
            actorKnownFor,
            actorExternalIds
        }
    }
}
const Actor = ({ actorDetails, person, actorKnownFor, actorExternalIds }) =>
{
  return (
    <ActorDetails 
      actorDetails = {actorDetails}
      person = {person}
      actorKnownFor = {actorKnownFor}
      externalIds = {actorExternalIds}
    />
  )
}

export default Actor;
