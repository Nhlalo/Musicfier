//Establish the keys for the list
const listItemKeys = {
  concerts: crypto.randomUUID(),
  charts: crypto.randomUUID(),
  mymusic: crypto.randomUUID(),
  contacts: crypto.randomUUID(),
};
//Array containing the content within the links and keys assigned to the list items
const navLinksContent = [
  { content: "Concerts", key: listItemKeys.concerts, ref: concertsLinkRef },
  { content: "Charts", key: listItemKeys.charts, ref: chartsLinkRef },
  { content: "My Music", key: listItemKeys.mymusic, ref: myMusicLinkRef },
  { content: "Contacts", key: listItemKeys.contacts, ref: contactsLinkRef },
];
export { navLinksContent };
