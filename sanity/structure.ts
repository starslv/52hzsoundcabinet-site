import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ====== Singletons ======
      S.listItem()
        .title("Homepage")
        .id("homePageSingleton")
        .child(S.editor().schemaType("homePage").documentId("homePage").title("Homepage")),

      S.listItem()
        .title("About")
        .id("aboutPageSingleton")
        .child(S.editor().schemaType("aboutPage").documentId("aboutPage").title("About")),

      S.listItem()
        .title("Media Kit")
        .id("mediaKitPageSingleton")
        .child(S.editor().schemaType("mediaKitPage").documentId("mediaKitPage").title("Media Kit")),

      S.listItem()
        .title("Contact")
        .id("contactPageSingleton")
        .child(S.editor().schemaType("contactPage").documentId("contactPage").title("Contact")),

      S.divider(),

      // ====== Collections ======
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("researchPost").title("Research"),
      S.documentTypeListItem("performance").title("Immersive Performances"),
      S.documentTypeListItem("exhibition").title("Exhibitions"),
      S.documentTypeListItem("pressItem").title("Press"),
      S.documentTypeListItem("publication").title("Publications"),
      S.documentTypeListItem("lecture").title("Lectures"),
    ]);