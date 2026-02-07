import {
  getMockArtistData,
  searchMockEvents,
} from "../../data/mock/ticketmaster-mock";

function Artists({ imagesrc, name, dataID }) {
  const { concertLocation } = useContext(concertsLocationContext);
  const { dateDuration } = useContext(concertsDurationContext);
  const { setConcertsDetails } = useContext(concertsInformationContext);

  const [attractionId, setAttractionID] = useState(null);

  useEffect(() => {
    if (attractionId) {
      const inforConcerts = async () => {
        return getMockArtistData(
          attractionId,
          name,
          dateDuration.startDate,
          dateDuration.endDate,
          concertLocation.country_code,
          concertLocation.city,
        );
      };
      setConcertsDetails(inforConcerts);
    }
  }, [attractionId]);

  function handleClick(event) {
    const button = event.currentTarget;
    const id = button.dataset.id;
    setAttractionID(id);
  }
  return (
    <button
      type="button"
      aria-label={`Select to view ${name} concert details`}
      data-id={dataID}
      className={Styles.artistInfor}
      onClick={handleClick}
    >
      <img
        src={artistImg}
        alt={`${name}`}
        className={Styles.artistImg}
        aria-hidden="true"
      />
      <span className={Styles.artistName} aria-hidden="true">
        {name}
      </span>
    </button>
  );
}
