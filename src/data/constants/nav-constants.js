//Establish the keys for the list
const List_Item_Keys = {
  concerts: crypto.randomUUID(),
  charts: crypto.randomUUID(),
  mymusic: crypto.randomUUID(),
  contacts: crypto.randomUUID(),
};
//Array containing the content within the links and keys assigned to the list items
const Nav_Links_Content = [
  { content: "Concerts", key: List_Item_Keys.concerts },
  { content: "Charts", key: List_Item_Keys.charts },
  { content: "My Music", key: List_Item_Keys.mymusic },
  { content: "Contacts", key: List_Item_Keys.contacts },
];

export { List_Item_Keys, Nav_Links_Content };
