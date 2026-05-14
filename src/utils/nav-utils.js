import {
  List_Item_Keys,
  Nav_Links_Content,
} from "../data/constants/nav-constants";

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
  return Nav_Links_Content.map((content, index) => {
    return { ...content, ref: refs[index] };
  });
}
