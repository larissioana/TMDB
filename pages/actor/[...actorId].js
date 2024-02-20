import { fetchAPIData, fetchAPIMedia, fetchAPIDetails } from '@/utils/fetchFromAPI';
import ActorDetails from '@/components/actorDetails/actorDetails';

export async function getServerSideProps(context) {
  const id = context.params.actorId;
  const actorDetails = await fetchAPIDetails("person", id);
  const person = await fetchAPIMedia("person", id, "images");
  const actorKnownFor = await fetchAPIData("person", id, "combined_credits");
  const actorExternalIds = await fetchAPIMedia("person", id, "external_ids");

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
const Actor = ({ actorDetails, person, actorKnownFor, actorExternalIds }) => {
  return (
    <ActorDetails
      actorDetails={actorDetails}
      person={person}
      actorKnownFor={actorKnownFor}
      externalIds={actorExternalIds}
    />
  )
}

export default Actor;
