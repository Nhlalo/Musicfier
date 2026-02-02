//Establish the keys for the list
const listItemKeys = {
  concerts: crypto.randomUUID(),
  charts: crypto.randomUUID(),
  mymusic: crypto.randomUUID(),
  contacts: crypto.randomUUID(),
};
//Array containing the content within the links and keys assigned to the list items
const navLinksContent = [
  { content: "Concerts", key: listItemKeys.concerts },
  { content: "Charts", key: listItemKeys.charts },
  { content: "My Music", key: listItemKeys.mymusic },
  { content: "Contacts", key: listItemKeys.contacts },
];

export default function NavLinksContentRef(
  concertsLinkRef,
  chartsLinkRef,
  myMusicLinkRef,
  contactsLinkRef,
) {
  const refs = [
    concertsLinkRef,
    chartsLinkRef,
    myMusicLinkRef,
    contactsLinkRef,
  ];
  return navLinksContent.map((content, index) => {
    return { ...content, ref: refs[index] };
  });
}

export { navLinksContent };
