window.SITE_DATA = {
  contactEmail: "tornmarkubberud@gmail.com",

  // --- Bestyrelsen hentes automatisk fra dette Google Doc ---
  // Ret bare i dokumentet (én person pr. linje), og siden opdateres af sig selv.
  // Dokumentet SKAL være delt som "Alle med linket kan se" (eller redigere).
  bestyrelsenDocId: "1dw1do7M6v8s9nfygdK-plOuusPNKGcSyKA1hXpsa9EM",

  // --- Opslagstavlen hentes automatisk fra dette Google Doc ---
  // Skriv frit i dokumentet. Tomme linjer bliver til nye afsnit på siden.
  opslagstavleDocId: "1FxToXMra3QdMYOL_AeG4K4_PodducY5yeXKMXWDoUT8",

  // --- Arrangementer hentes automatisk fra dette Google Doc ---
  // Skriv frit i dokumentet (fx "18. september: Vejdag"). Tomme linjer bliver til nye afsnit.
  arrangementerDocId: "1TLfiqu7Xo2WTwFywy6Fc069zKc7lu_WsDhTN9YMrOXs",

  // Bruges kun hvis Google Docs ikke kan hentes (fx ingen internetadgang for besøgende).
  boardFallback: [
    { name: "Rasmus", role: "Formand, nr. 85" },
    { name: "Jan", role: "Kasserer, nr. 101" },
    { name: "Lars", role: "Sekretær, nr. 30" },
    { name: "Vibeke", role: "Nr. 74" },
    { name: "Tue", role: "Nr. 71" }
  ],
  opslagstavleFallback: "Årshjul for arrangementer\n\nHusk at det er muligt at leje telt.",
  arrangementerFallback: "18. september: Vejdag\n\n4. oktober: Græskardag\n\n6. november: Vejdag",

  // Dokumenterne linker direkte til jeres tre Google Drive-mapper.
  // Læg blot nye filer i den rigtige mappe i Drive - siden skal ikke ændres.
  documentFolders: [
    {
      title: "Referater",
      text: "Referater fra generalforsamlinger og bestyrelsesmøder.",
      icon: "REF",
      url: "https://drive.google.com/drive/folders/1tCUZ01MOgS5g2OhxZYxsFbLyE2-D7cLt?usp=sharing"
    },
    {
      title: "Regnskaber",
      text: "Foreningens årsregnskaber.",
      icon: "KR",
      url: "https://drive.google.com/drive/folders/13aaq1T5ZNRLN7SgzMr2yuqZjiKwQQXR4?usp=sharing"
    },
    {
      title: "Vedtægter",
      text: "Gældende vedtægter for beboerforeningen.",
      icon: "VED",
      url: "https://drive.google.com/drive/folders/1OfuCaHQyJyEJdizBwFzR2EqzbOKFnuqc?usp=sharing"
    }
  ]
};
